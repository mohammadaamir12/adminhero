import React, { useEffect, useState } from "react";
import Updatecard from "../component/Updatecard";
import LineCharts from "../component/LineCharts";
import BarChart from "../component/BarChart";
import worldmap from "../assets/world_map.png";
import HollowPie from "../component/HollowPie";
import moment from "moment/moment";
import axios from "axios";
import PeakHour from "../component/PeakHour";
import { DatePicker } from "antd";
import ShimmerEffect from "../component/ShimmerEffect";

function Home() {
  const [start, setStart] = useState(moment().format("YYYY-MM-DD"));
  const [end, setEnd] = useState(moment().format("YYYY-MM-DD"));
  const [dailyVisit, setDailyVisit] = useState([]);
  const [yesterdayVisit, setYesterdayVisit] = useState([]);
  const [week, setWeek] = useState([]);
  const [month, setMonth] = useState([]);
  const [peakHourData, setpeakHourData] = useState([]);
  const [lineData, setLineData] = useState(new Array(30).fill(0));
  const [males, setMales] = useState("");
  const [females, setFemales] = useState("");
  const [kidandold, setKidandold] = useState("");
  const [kidandold1, setKidandold1] = useState("");
  const [childs, setchilds] = useState("");
  const [mans, setMans] = useState("");
  const [olds, setolds] = useState("");
  const [elders, setelders] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [submittedStartDate, setSubmittedStartDate] = useState("");
  const [submittedEndDate, setSubmittedEndDate] = useState("");
  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (submittedStartDate && submittedEndDate) {
      fetchDataOnDateChange();
    }
  }, [submittedStartDate, submittedEndDate]);

  const fetchInitialData = async () => {
    await DailyVisit();
    await YesterdayVisit();
    await weekVisit();
    await monthVisit();
    await peakHour();
    await getmaleandwomendata();
    await oldandkid();
    await allGenderVisitor();
  };

  const fetchDataOnDateChange = async () => {
    await peakHour();
    await getmaleandwomendata();
    await oldandkid();
    // await allGender();
    await allGenderVisitor();
  };

  const DailyVisit = async () => {
    setLoading1(true);
    const params = {
      api_name: "unique_head_count",
      branch_id: 3,
      start_date: start,
      end_date: start,
    };

    try {
      const response = await axios.get(
        "https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard",
        { params }
      );
      const totalSum = response.data.reduce(
        (accumulator, visit) => accumulator + visit.uniqueCount,
        0
      );
      setDailyVisit(totalSum.toString());
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const YesterdayVisit = async () => {
    const yester = moment().subtract(1, "day").format("YYYY-MM-DD");
    const params = {
      api_name: "unique_head_count",
      branch_id: 3,
      start_date: yester,
      end_date: start,
    };

    try {
      const response = await axios.get(
        "https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard",
        { params }
      );
      const totalSum = response.data.reduce(
        (accumulator, visit) => accumulator + visit.uniqueCount,
        0
      );
      setYesterdayVisit(totalSum.toString());
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const weekVisit = async () => {
    const currentDate = new Date();
    const endDate = currentDate.toISOString().split("T")[0];
    const startDate = new Date(currentDate);
    const dayOfWeek = currentDate.getDay();
    const daysSinceMonday = (dayOfWeek + 6) % 7;
    startDate.setDate(currentDate.getDate() - daysSinceMonday);
    startDate.setDate(startDate.getDate() + 1);
    const formattedStartDate = startDate.toISOString().split("T")[0];
    console.log("weeeek", endDate, formattedStartDate);
    const params = {
      api_name: "unique_head_count",
      branch_id: 3,
      start_date: formattedStartDate,
      end_date: endDate,
    };

    try {
      const response = await axios.get(
        "https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard",
        { params }
      );
      const totalSum = response.data.reduce(
        (accumulator, visit) => accumulator + visit.uniqueCount,
        0
      );
      setWeek(totalSum.toString());
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const monthVisit = async () => {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    startDate.setDate(startDate.getDate() + 1);
    const endDate = currentDate;

    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];
    // console.log("sdsd", formattedStartDate, formattedEndDate);
    const params = {
      api_name: "unique_head_count",
      branch_id: 3,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    };

    try {
      const response = await axios.get(
        "https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard",
        { params }
      );
      const totalSum = response.data.reduce(
        (accumulator, visit) => accumulator + visit.uniqueCount,
        0
      );
      setMonth(totalSum);
      // console.log("month", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const allGenderVisitor = async () => {
    const params = {
      api_name: "unique_head_count",
      branch_id: 3,
      start_date: submittedStartDate === "" ? start : submittedStartDate,
      end_date: submittedEndDate === "" ? start : submittedEndDate,
    };

    try {
      const response = await axios.get(
        "https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard",
        { params }
      );
      const newseriesData = new Array(30).fill(0);

      response.data.forEach((data) => {
        const day = new Date(data.visitDate).getUTCDate();
        newseriesData[day - 1] += data.uniqueCount;
      });
      // console.log("sdsdsdsds", newseriesData);
      setLineData(newseriesData);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    setLoading1(false);
  };

  const peakHour = async () => {
    const params = {
      api_name: "peak_hours",
      branch_id: 3,
      start_date: submittedStartDate === "" ? start : submittedStartDate,
      end_date: submittedEndDate === "" ? start : submittedEndDate,
    };

    try {
      const response = await axios.get(
        "https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard",
        { params }
      );
      const transformedData = response.data.map((item) => ({
        visitHour: item.visitHour,
        totalUniqueCount: item.totalCount,
      }));
      // console.log("transform", transformedData, response.data);
      setpeakHourData(transformedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getmaleandwomendata = async () => {
    // const startdate = start.toString();
    // const endDate = end.toString();

    const params = {
      api_name: "gender_count",
      branch_id: 3,
      start_date: submittedStartDate === "" ? start : submittedStartDate,
      end_date: submittedEndDate === "" ? start : submittedEndDate,
    };
    try {
      const response = await axios.get(
        "https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard",
        { params }
      );
      const { femaleCount, maleCount } = response.data.reduce(
        (acc, item) => {
          if (item.gender === "Female") {
            acc.femaleCount += item.count;
          } else if (item.gender === "Male") {
            acc.maleCount += item.count;
          }
          return acc;
        },
        { femaleCount: 0, maleCount: 0 }
      );

      if (response.data.length === 0) {
        // Set to null if response is empty
        setFemales("");
        setMales("");
      } else {
        setFemales(femaleCount ?? null);
        setMales(maleCount ?? null);
      }

      // console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const oldandkid = async () => {
    const params = {
      api_name: "adult_kids_count",
      branch_id: 3,
      start_date: submittedStartDate === "" ? start : submittedStartDate,
      end_date: submittedEndDate === "" ? start : submittedEndDate,
    };

    try {
      const response = await axios.get(
        "https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard",
        { params }
      );
      const { adultCount, kidCount } = response.data.reduce(
        (acc, item) => {
          if (item.age_group === "Adults") {
            acc.adultCount += item.count;
          } else if (item.age_group === "Kids") {
            acc.kidCount += item.count;
          }
          return acc;
        },
        { adultCount: 0, kidCount: 0 }
      );

      if (response.data.length === 0) {
        setKidandold("");
        setKidandold1("");
      } else {
        setKidandold(kidCount ?? null);
        setKidandold1(adultCount ?? null);
      }

      // console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const allGender = async () => {
  //   console.log("dddddd", start, end);
  //   const params = {
  //     api_name: "age_group_count",
  //     branch_id: 3,
  //     start_date: submittedStartDate,
  //     end_date: submittedEndDate,
  //   };

  //   try {
  //     const response = await axios.get(
  //       "https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard",
  //       { params }
  //     );
  //     setchilds(response.data[3].count);
  //     setMans(response.data[0].count);
  //     setolds(response.data[1].count);
  //     setelders(response.data[2].count);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  //   setLoading(false);
  // };

  const handleStartDateChange = (date) => {
    console.log("checking", date);
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    console.log("checking", date);
    setEndDate(date);
  };

  const handleSubmit = () => {
    const formattedStartDate = startDate
      ? moment(startDate.$d).format("YYYY-MM-DD")
      : "";
    const formattedEndDate = endDate
      ? moment(endDate.$d).format("YYYY-MM-DD")
      : "";

    setSubmittedStartDate(formattedStartDate);
    setSubmittedEndDate(formattedEndDate);
    setLoading(true);
  };

  // console.log("chumma", start, end);

  return (
    <div className="p-4 md:w-full lg:pl-36 bg-backgrd">
      <div className="md:mx-5 lg:mx-7 mb-2 md:mb-0 lg:mb-0 relative h-12 justify-evenly bg-white rounded-sm flex items-center">
        <div className="flex-1 mx-2">
          <DatePicker
            className="w-full"
            selected={startDate}
            onChange={handleStartDateChange}
            placeholderText="Select Start Date"
          />
        </div>
        <div className="flex-1 mx-2">
          <DatePicker
            className="w-full"
            selected={endDate}
            onChange={handleEndDateChange}
            placeholderText="Select End Date"
          />
        </div>
        <button
          className={`m-2 flex items-center justify-center h-8 md:w-32 lg:w-32 w-16  p-2 rounded transition duration-300 
        ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }
      `}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
              />
            </svg>
          ) : (
            "Submit"
          )}
        </button>
      </div>
      <div className="relative flex flex-col md:flex-row w-full justify-evenly md:mt-6 gap-y-4">
        <Updatecard
          className="w-full mb-4 md:mb-0 md:w-auto"
          txt="Daily Visits"
          data={dailyVisit}
        />

        <Updatecard
          className="w-full mb-4 md:mb-0 md:w-auto"
          txt="Yesterday Visits"
          data={yesterdayVisit}
        />
        <Updatecard
          className="w-full mb-4 md:mb-0 md:w-auto"
          txt="Weekly Visits"
          data={week}
        />
        <Updatecard
          className="w-full mb-4 md:mb-0 md:w-auto"
          txt="Monthly Visits"
          data={month}
        />
      </div>
      <div className="relative bg-white rounded-sm mt-6 md:mx-5 lg:mx-7">
        {loading1 ? <ShimmerEffect /> : <LineCharts data={lineData} />}
      </div>
      <div className="relative rounded-sm mt-6 md:mx-5 lg:mx-7 flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-white rounded-sm shadow mb-4 md:mb-0">
          {loading1 ? <ShimmerEffect /> : <LineCharts data={lineData} />}
        </div>
        <div className="w-full md:w-1/3 bg-white rounded-sm shadow mb-4 md:mb-0 md:mx-2">
          {loading1 ? <ShimmerEffect /> : <BarChart weekData={peakHourData} />}
        </div>
        <div className="w-full md:w-1/3 bg-white rounded-sm shadow mb-4 md:mb-0 ">
          {loading1 ? <ShimmerEffect /> : <LineCharts data={lineData} />}
        </div>
      </div>
      <div className="relative flex flex-col md:flex-row bg-white rounded-sm mt-6 md:mx-5 lg:mx-7">
        <div className="flex-1 p-5 gap-x-3">
          <h1 className="text-lg">Global Sales by Top Locations</h1>
          <p className="text-sm text-gray-400 mb-4">
            All Products That Were Shipped
          </p>
          <hr className="border-t-1 border-gray-300 mb-4" />

          <div className="flex items-center mb-2 justify-between">
            <img src="flag1.png" alt="Country Flag" className="w-5 h-5 mr-2" />
            <span>India</span>
            <span>566</span>
            <span>53.33%</span>
          </div>
          <hr className="border-t-1 border-gray-300 mb-2" />
          <div className="flex items-center mb-2 justify-between">
            <img src="flag1.png" alt="Country Flag" className="w-5 h-5 mr-2" />
            <span>China</span>
            <span>100</span>
            <span>10.33%</span>
          </div>
          <hr className="border-t-1 border-gray-300 mb-2" />
          <div className="flex items-center mb-2 justify-between">
            <img src="flag1.png" alt="Country Flag" className="w-5 h-5 mr-2" />
            <span>USA</span>
            <span>240</span>
            <span>13.99%</span>
          </div>
          <hr className="border-t-1 border-gray-300 mb-2" />
          <div className="flex items-center mb-2 justify-between">
            <img src="flag1.png" alt="Country Flag" className="w-5 h-5 mr-2" />
            <span>Australia</span>
            <span>666</span>
            <span>83.03%</span>
          </div>
          <hr className="border-t-1 border-gray-300 mb-2" />
          <div className="flex items-center mb-2 justify-between">
            <img src="flag1.png" alt="Country Flag" className="w-5 h-5 mr-2" />
            <span>Europe</span>
            <span>100</span>
            <span>9.0%</span>
          </div>
        </div>

        <div className="flex-1 p-4">
          <img src={worldmap} alt="World Map" />
        </div>
      </div>

      <div className="md:flex lg:flex flex-row md:gap-x-6 lg:gap-x-6 justify-center items-center  rounded-sm mt-6 md:mx-5 lg:mx-7">
        <div className="flex-1 flex justify-center p-4 bg-white md:mb-0 lg:mb-0 mb-4">
          {loading1 ? (
            <ShimmerEffect />
          ) : (
            <HollowPie
              male={males}
              female={females}
              title="Male and Female Visitors"
              showMalesAndFemales="true"
            />
          )}
        </div>
        <div className="flex-1 flex justify-center p-4 bg-white">
          {loading1 ? (
            <ShimmerEffect />
          ) : (
            <HollowPie
              male={kidandold}
              female={kidandold1}
              title="Kid and Adult Vistors"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
