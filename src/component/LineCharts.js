import React from "react";
import Chart from "react-apexcharts";

const LineCharts = ({ data }) => {
  const color = "#00ff7b";
  const check = localStorage.getItem('theme')
  // console.log('line',typeof(check));
  
  const options = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: "Visitors Count",
      align: "left",
      style:{
        color:check==='dark'?'#000':'#fff'
      }
    },
    xaxis: {
      categories: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
      ],
      title: {
        text: "Days",
        style: {
          fontSize: "14px",
          color:check==='dark'?'#000':'#fff'
        },
      },
      // labels: {
      //   style: {
      //     // Change label color based on theme
         
      //   },
      // },
    },
    yaxis: {
      labels: {
        offsetX: -10,
      },
      title: {
        text: "Visitors",
        style: {
          fontSize: "14px",
          color:check==='dark'?'#000':'#fff'
        },
      },
      min: 20,
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: [color],
    },
    markers: {
      size: 4,
      colors: [color],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    dataLabels: {
      enabled: false,
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
          show: false,
        },
      },
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    colors: [color],
  };

  const series = [
    {
      name: "Total Visits",
      data: data,
      color: color,
    },
  ];

  return (
    <div className="p-4 m-0 h-[280px]">
      <Chart options={options} series={series} type="line" height={250} />
    </div>
  );
};

export default LineCharts;
