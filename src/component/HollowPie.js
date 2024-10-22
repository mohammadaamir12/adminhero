import React from 'react';
import Chart from 'react-apexcharts';

const HollowPie = ({male,female,title,showMalesAndFemales}) => {
  const labels = showMalesAndFemales ? ['Males', 'Females'] : ['Kids', 'Adults'];
  const colors = showMalesAndFemales 
    ? ['#FF4560', '#00E396'] 
    : ['#1E90FF', '#32CD32'];
  const chartOptions = {
    chart: {
      type: 'donut',
    },
    colors: colors,
    labels: labels,
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
      <h2 className='text-center font-lg text-gray-400'>{title}</h2>
      <Chart options={chartOptions} series={chartSeries} type="donut" width="400" />
    </div>
  );
};

export default HollowPie;
