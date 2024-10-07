import React, { useEffect, useState } from 'react'
import Updatecard from '../component/Updatecard'
import LineCharts from '../component/LineCharts'
import BarChart from '../component/BarChart'
import worldmap from '../assets/world_map.png'
import HollowPie from '../component/HollowPie'
import moment from 'moment/moment'
import axios from 'axios'
import PeakHour from '../component/PeakHour'
import { DatePicker } from 'antd';


function Home() {
  const [start, setStart] = useState(moment().format('YYYY-MM-DD'))
  const [end, setEnd] = useState(moment().format('YYYY-MM-DD'))
  const [dailyVisit,setDailyVisit]=useState([])
  const [yesterdayVisit,setYesterdayVisit]=useState([])
  const [week,setWeek]=useState([])
  const [month,setMonth]=useState([])
  const [peakHourData, setpeakHourData] = useState([])
  const [lineData, setLineData] = useState(new Array(30).fill(0));
  const [males, setMales] = useState('')
  const [females, setFemales] = useState('')
  const [kidandold, setKidandold] = useState('')
  const [kidandold1, setKidandold1] = useState('')
  const [childs, setchilds] = useState('')
  const [mans, setMans] = useState('')
  const [olds, setolds] = useState('')
  const [elders, setelders] = useState('')
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [submittedStartDate, setSubmittedStartDate] = useState('');
    const [submittedEndDate, setSubmittedEndDate] = useState('');
  useEffect(()=>{
    DailyVisit()
    YesterdayVisit()
    weekVisit()
    monthVisit()
  },[])

useEffect(()=>{

allGenderVisitor()
peakHour()
getmaleandwomendata()
oldandkid()
allGender()
},[start,end])

  const DailyVisit = async () => {
    const params = {
        api_name: 'unique_head_count',
        branch_id: 3,
        start_date: start,
        end_date: start,
    };

    try {
        const response = await axios.get('https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard', { params });
        const totalSum = response.data.reduce((accumulator, visit) => accumulator + visit.uniqueCount, 0);
        setDailyVisit(totalSum.toString());
    } catch (error) {
        console.error('Error:', error);
    }
};
const YesterdayVisit = async () => {
  const yester=(moment().subtract(1, 'day').format('YYYY-MM-DD'))
  const params = {
      api_name: 'unique_head_count',
      branch_id: 3,
      start_date: yester,
      end_date: start,
  };

  try {
      const response = await axios.get('https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard', { params });
      const totalSum = response.data.reduce((accumulator, visit) => accumulator + visit.uniqueCount, 0);
      setYesterdayVisit(totalSum.toString());
  } catch (error) {
      console.error('Error:', error);
  }
};
const weekVisit = async () => {
  const currentDate = new Date();
  const endDate = currentDate.toISOString().split('T')[0];
  const startDate = new Date(currentDate);
  const dayOfWeek = currentDate.getDay();
  const daysSinceMonday = (dayOfWeek + 6) % 7;
  startDate.setDate(currentDate.getDate() - daysSinceMonday);
  startDate.setDate(startDate.getDate() + 1);
  const formattedStartDate = startDate.toISOString().split('T')[0];
console.log('weeeek',endDate,formattedStartDate);
  const params = {
      api_name: 'unique_head_count',
      branch_id: 3,
      start_date: formattedStartDate,
      end_date: endDate,
  };

  try {
      const response = await axios.get('https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard', { params });
      const totalSum = response.data.reduce((accumulator, visit) => accumulator + visit.uniqueCount, 0);
      setWeek(totalSum.toString());
  } catch (error) {
      console.error('Error:', error);
  }
};
const monthVisit = async () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  startDate.setDate(startDate.getDate() + 1); 
  const endDate = currentDate;

  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];
  console.log('sdsd',formattedStartDate,formattedEndDate);
  const params = {
      api_name: 'unique_head_count',
      branch_id: 3,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
  };

  try {
      const response = await axios.get('https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard', { params });
      const totalSum = response.data.reduce((accumulator, visit) => accumulator + visit.uniqueCount, 0);
      setMonth(totalSum)
      console.log('month', response.data);
  } catch (error) {
      console.error('Error:', error);
  }
};

const allGenderVisitor = async () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  startDate.setDate(startDate.getDate() + 1); 
  const endDate = currentDate;

  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];
  const params = {
      api_name: 'unique_head_count',
      branch_id: 3,
      start_date:start ,
      end_date: end,
  };

  try {
      const response = await axios.get('https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard', { params });
      const newseriesData = new Array(30).fill(0);

      response.data.forEach(data => {
          const day = new Date(data.visitDate).getUTCDate();
          newseriesData[day - 1] += data.uniqueCount;
      });
      console.log('sdsdsdsds',newseriesData);
      setLineData(newseriesData);
  } catch (error) {
      console.error('Error:', error);
  }
};

const peakHour = async () => {
  const currentDate = new Date();
  const endDate = currentDate.toISOString().split('T')[0];
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 2);
  const formattedStartDate = startDate.toISOString().split('T')[0];
  console.log('peak',formattedStartDate,endDate);
  const params = {
      api_name: 'peak_hours',
      branch_id: 3,
      start_date: formattedStartDate,
      end_date: endDate,
  };

  try {
      const response = await axios.get('https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard', { params });
      const transformedData = response.data.map(item => ({
          visitHour: item.visitHour,
          totalUniqueCount: item.totalCount,
      }));
      console.log('transform',transformedData);
      setpeakHourData(transformedData);
  } catch (error) {
      console.error('Error:', error);
  }
};

const getmaleandwomendata = async () => {
  // const startdate = start.toString();
  // const endDate = end.toString();
  
  const params = {
      api_name: 'gender_count',
      branch_id: 3,
      start_date:submittedStartDate,
      end_date: submittedEndDate,
  };

  try {
      const response = await axios.get('https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard', { params });
      setFemales(response.data[0].count);
      setMales(response.data[1].count);
      // console.log('sds',response.data);
  } catch (error) {
      console.error('Error:', error);
  }
};
const oldandkid = async () => {
  const params = {
      api_name: 'adult_kids_count',
      branch_id: 3,
      start_date: submittedStartDate ,
      end_date: submittedEndDate  ,
  };

  try {
      const response = await axios.get('https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard', { params });
      setKidandold(response.data[1].count);
      setKidandold1(response.data[0].count);
      console.log('dddd',response.data);
  } catch (error) {
      console.error('Error:', error);
  }
};
const allGender = async () => {
  console.log('dddddd',start,end)
  const params = {
  
      api_name: 'age_group_count',
      branch_id: 3,
      start_date:submittedStartDate,
      end_date: submittedEndDate,
  };

  try {
      const response = await axios.get('https://br42legudi.execute-api.ap-south-1.amazonaws.com/default/lambda-batch-process-dashboard', { params });
      setchilds(response.data[3].count);
      setMans(response.data[0].count);
      setolds(response.data[1].count);
      setelders(response.data[2].count);
  } catch (error) {
      console.error('Error:', error);
  }
};

const handleStartDateChange = (date) => {
  console.log('checking',date);
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
       console.log('checking',date);
        setEndDate(date);
    };

    const handleSubmit = () => {
           const formattedStartDate = startDate ? moment(startDate.$d).format('YYYY-MM-DD') : '';
        const formattedEndDate = endDate ? moment(endDate.$d).format('YYYY-MM-DD') : '';

        setSubmittedStartDate(formattedStartDate);
        setSubmittedEndDate(formattedEndDate);

        console.log('Submitted Start Date:', formattedStartDate);
        console.log('Submitted End Date:', formattedEndDate);
       
       
    };




  return (
    <div className='p-4 md:w-full lg:pl-36 bg-backgrd'>
   <div className="md:mx-5 lg:mx-7 relative h-12 justify-evenly bg-white rounded-sm flex items-center">
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
                className="m-2 text-center justify-center flex items-center bg-blue-500 h-8 text-white w-16 p-2 rounded"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    <div className='relative flex flex-col md:flex-row w-full justify-evenly md:mt-6 gap-y-4'>
      <Updatecard className='w-full mb-4 md:mb-0 md:w-auto' txt='Daily Visits' data={dailyVisit} />
      <Updatecard className='w-full mb-4 md:mb-0 md:w-auto' txt='Yesterday Visits' data={yesterdayVisit} />
      <Updatecard className='w-full mb-4 md:mb-0 md:w-auto' txt='Weekly Visits' data={week}/>
      <Updatecard className='w-full mb-4 md:mb-0 md:w-auto' txt='Monthly Visits' data={month}/>
    </div>
    <div className='relative bg-white rounded-sm mt-6 md:mx-5 lg:mx-7'>
  <LineCharts data={lineData} />
</div>
<div className='relative rounded-sm mt-6 md:mx-5 lg:mx-7 flex flex-col md:flex-row'>
  <div className='w-full md:w-1/3 bg-white rounded-sm shadow mb-4 md:mb-0'>
    <LineCharts data={lineData} />
  </div>
  <div className='w-full md:w-1/3 bg-white rounded-sm shadow mb-4 md:mb-0 md:mx-2'>
  <BarChart weekData={peakHourData} />
  </div>
  <div className='w-full md:w-1/3 bg-white rounded-sm shadow mb-4 md:mb-0 '>
    <LineCharts data={lineData}/>
  </div>
</div>
<div className='relative flex bg-white rounded-sm mt-6 md:mx-5 lg:mx-7'>
  <div className='flex w-full p-5 gap-x-3'>
  <div className="flex-1 "> 
    <h1 className="text-lg">Global Sales by Top Locations</h1>
    <p className="text-sm text-gray-400 mb-4">All Products That Were Shipped</p>
    <hr className="border-t-1 border-gray-300 mb-4"/>

    <div className="flex items-center mb-2 justify-evenly">
      <img src="flag1.png" alt="Country Flag" className="w-5 h-5 mr-2"/>
      <span className=''>India</span>
      <span className=''>566</span>
      <span className=''>53.33%</span>
    </div>
    <hr className="border-t-1 border-gray-300 mb-2"/>
    <div className="flex items-center mb-2 justify-evenly">
      <img src="flag1.png" alt="Country Flag" className="w-5 h-5 mr-2"/>
      <span className=''>China</span>
      <span className=''>100</span>
      <span className=''>10.33%</span>
    </div>
    <hr className="border-t-1 border-gray-300 mb-2"/>
    <div className="flex items-center mb-2 justify-evenly">
      <img src="flag1.png" alt="Country Flag" className="w-5 h-5 mr-2"/>
      <span className=''>USA</span>
      <span className=''>240</span>
      <span className=''>13.99%</span>
    </div>
    <hr className="border-t-1 border-gray-300 mb-2"/>
    <div className="flex items-center mb-2 justify-evenly">
      <img src="flag1.png" alt="Country Flag" className="w-5 h-5 mr-2"/>
      <span className=''>Australia</span>
      <span className=''>666</span>
      <span className=''>83.03%</span>
    </div>
    <hr className="border-t-1 border-gray-300 mb-2"/>
    <div className="flex items-center mb-2 justify-evenly">
      <img src="flag1.png" alt="Country Flag" className="w-5 h-5 mr-2"/>
      <span className=''>Europe</span>
      <span className=''>100</span>
      <span className=''>9.0%</span>
    </div>
  </div>
  
  <div className=' flex-1 p-4'> 
    <img src={worldmap} />
  </div>
  </div>
</div>
<div className='md:flex lg:flex flex-row md:gap-x-6 lg:gap-x-6 justify-center items-center  rounded-sm mt-6 md:mx-5 lg:mx-7'>
  <div className='flex-1 flex justify-center p-4 bg-white md:mb-0 lg:mb-0 mb-4'>
    <HollowPie male={males} female={females} title='Male and Female Visitors' showMalesAndFemales='true'/>
  </div>
  <div className='flex-1 flex justify-center p-4 bg-white'>
    <HollowPie male={kidandold} female={kidandold1} title='Kid and Adult Vistors' />
  </div>
</div>




  </div>
  )
}

export default Home
