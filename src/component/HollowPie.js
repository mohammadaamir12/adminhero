import React from 'react';
import Chart from 'react-apexcharts';

const HollowPie = ({male,female}) => {
  console.log('adssdsds',male,female);
  const chartOptions = {
    chart: {
      type: 'donut',
    },
    colors: ['#FF4560', '#00E396',],
    labels: ['Category A', 'Category B',],
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
        },
      },
    },
    legend: {
      position: 'bottom',
    },
  };

  const chartSeries = [male,female];

  return (
    <div>
      <h2 className='text-center font-lg text-gray-400'>Pie Chart</h2>
      <Chart options={chartOptions} series={chartSeries} type="donut" width="400" />
    </div>
  );
};

export default HollowPie;
