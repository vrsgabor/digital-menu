import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = () => {
  const chartOptions = {
    chart: {
      type: 'line',
      height: 200,
      toolbar: {
        show: false, // Hide the menu
      },
    },
    xaxis: {
      categories: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június'],
      labels: {
        style: {
          colors: '#526d82', // x-axis text color
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      grid: {
        show: false, // Hide x-axis gridlines
      },
    },
    yaxis: {
      min: 0, // Ensure the y-axis begins at zero
      labels: {
        style: {
          colors: '#526d82', // y-axis text color
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      grid: {
        borderColor: '#526d82', // Horizontal gridline color
      },
    },
    stroke: {
      curve: 'straight', // Make the line straight
    },
    colors: ['#27374d'], // Line color
    title: {
      text: 'Havi Bevételek',
      align: 'left',
      style: {
        fontSize: '14px',
        color: '#526d82',
        fontFamily: 'Sf Pro Display, sans-serif',
        fontWeight: 'bold'  // Title font size
      },
    },
    legend: {
      show: false,
    },
  };

  const chartSeries = [
    {
      name: 'Bevétel',
      data: [678000, 590000, 800000, 810000, 560000, 550000], // Revenue data
    },
  ];

  return (
      <Chart options={chartOptions} series={chartSeries} type="line" height='160' />
  );
};

export default LineChart;
