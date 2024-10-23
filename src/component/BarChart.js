import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ weekData }) => {
  const hours = Array.from({ length: 24 }, (_, hour) => `${hour.toString().padStart(2, "0")}:00`);

  // Create a mapping of hours to unique visit counts
  const visitCounts = {};
  weekData.forEach((dayData) => {
    const hourKey = dayData.visitHour.padStart(2, "0");
    visitCounts[hourKey] = (visitCounts[hourKey] || 0) + Math.floor(dayData.totalUniqueCount);
  });

  const series = [
    {
      name: "Unique Visits",
      data: hours.map((hour) => visitCounts[hour.split(":")[0]] || 0),
    },
  ];
  const check = localStorage.getItem('theme')

  const options = {
    chart: {
      type: "bar",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "Power Hours",
      align: "left",
      style:{
         color:check==='dark'?'#000':'#fff'
      }
    },
    xaxis: {
      categories: hours,
      title: {
        text: "Hours",
        style:{
           color:check==='dark'?'#000':'#fff'
        }
      },
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      min: 0,
      labels: {
        formatter: (value) => Math.floor(value),
      },
      title: {
        text: "Visitors",
        style: {
          fontSize: "14px",
           color:check==='dark'?'#000':'#fff'
        },
      },
      tickAmount: 5,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        endingShape: "rounded",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#de0d61"],
    },
    fill: {
      opacity: 1,
      colors: ["#de0d61"],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    grid: {
      show: true,
      borderColor: "#e0e0e0",
      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: 5,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  };

  return (
    <div className="p-2 m-0 h-[280px]">
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default BarChart;
