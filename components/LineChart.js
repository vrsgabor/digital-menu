// components/LineChart.js
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Check if a chart instance already exists and destroy it before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június'],
        datasets: [
          {
            label: 'Bevétel',
            data: [678000, 590000, 800000, 810000, 560000, 550000],
            fill: false,
            borderColor: '#27374d', // Line color
            tension: 0, // Make the line straight
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false, // Hide x-axis gridlines
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false, // Hide y-axis gridlines
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Havi Bevételek',
            position: 'top',
            align: 'start',
          },
        },
      },
    });

    // Cleanup function to destroy the chart instance on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
