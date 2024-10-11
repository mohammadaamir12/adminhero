import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ weekData }) => {
  const hours = Array.from({ length: 24 }, (_, hour) => `${hour + 1}:00`);

  // Filter hours that have data
  const filteredHours = hours.filter((hour) =>
    weekData.some(
      (dayData) => dayData.visitHour === hour.split(":")[0].padStart(2, "0")
    )
  );

  // Update series data based on filtered hours
  const series = [
    {
      name: "Unique Visits",
      data: filteredHours.map((hour) => {
        const hourKey = hour.split(":")[0]; // Get the hour part (e.g., '1' from '1:00')
        const foundData = weekData.find(
          (dayData) => dayData.visitHour === hourKey.padStart(2, "0")
        ); // Pad single digits
        return foundData ? foundData.totalUniqueCount : 0; // Return count or 0 if not found
      }),
    },
  ];

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
    },
    xaxis: {
      categories: filteredHours,
      title: {
        text: "Hours",
        style: {
          fontSize: "14px",
        },
      },
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      min: 0,
      labels: {
        offsetY: 0,
        formatter: (value) => Math.floor(value),
      },
      title: {
        text: "Visitors",
        style: {
          fontSize: "14px",
        },
      },
      tickAmount: 5,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        endingShape: "rounded",
        dataLabels: {
          enabled: false, // Ensure data labels are disabled
        },
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#de0d61"],
    },
    fill: {
      opacity: 0, // Make the bars hollow
    },
    tooltip: {
      shared: true,
      intersect: false,
      enabled: false, // Disable tooltip if needed
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
