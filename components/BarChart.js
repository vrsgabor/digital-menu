import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = () => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 200,
      toolbar: {
        show: false, // Hide the menu
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%', // Make bars wider
      },
    },
    xaxis: {
      categories: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június'],
      min: 1,
      max: 5,
      tickAmount: 4, // Number of ticks on x-axis
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
    },
    yaxis: {
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
    },
    grid: {
      show: false, // Hide gridlines
    },
    colors: ['#27374d'], // Bar color
    title: {
      text: 'Havi Vásárlói Értékelések',
      align: 'left',
      style: {
        fontSize: '14px',
        color: '#526d82',
        fontFamily: 'Sf Pro Display, sans-serif',
        fontWeight: 'bold'  // Smaller title font size
      },
      margin: 0,
      padding: 0,
    },
    dataLabels: {
      enabled: false // Disable data labels in the middle of bars
    },
  };

  const chartSeries = [
    {
      name: 'Értékelés',
      data: [4, 3.2, 4.3, 3.8, 4.4, 4.6], // Example ratings
    },
  ];

  return (
    <Chart options={chartOptions} series={chartSeries} type="bar" height='180' />
  );
};

export default BarChart;
