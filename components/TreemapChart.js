// components/TreemapChart.js
'use client'; // Add this line at the top

import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';

Chart.register(...registerables, TreemapController, TreemapElement);

const TreemapChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const data = [
      { category: 'Main Courses', label: 'Main Courses', value: 60, color: '#FF6384' },
      { category: 'Main Courses', label: 'Pizza', value: 20, color: '#FF6384' },
      { category: 'Main Courses', label: 'Pasta', value: 20, color: '#FF6384' },
      { category: 'Main Courses', label: 'Steak', value: 20, color: '#FF6384' },
      { category: 'Soups', label: 'Soups', value: 30, color: '#FF9F40' },
      { category: 'Soups', label: 'Chicken Soup', value: 10, color: '#FF9F40' },
      { category: 'Soups', label: 'Tomato Soup', value: 10, color: '#FF9F40' },
      { category: 'Soups', label: 'Minestrone', value: 10, color: '#FF9F40' },
      { category: 'Drinks', label: 'Drinks', value: 10, color: '#36A2EB' },
      { category: 'Drinks', label: 'Water', value: 3, color: '#36A2EB' },
      { category: 'Drinks', label: 'Soda', value: 3, color: '#36A2EB' },
      { category: 'Drinks', label: 'Juice', value: 4, color: '#36A2EB' }
    ];

    chartInstanceRef.current = new Chart(ctx, {
      type: 'treemap',
      data: {
        datasets: [{
          tree: data,
          key: 'value',
          groups: ['category', 'label'],
          spacing: 0.1,
          borderWidth: 1,
          borderColor: 'white',
          backgroundColor: function (context) {
            const dataIndex = context.dataIndex;
            const dataset = context.dataset;
            const dataItem = dataset.tree[dataIndex];
            return dataItem ? dataItem.color : '#ffffff'; // Default color if undefined
          },
          labels: {
            display: true,
            align: 'center',
            color: 'white',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.raw.label}: ${tooltipItem.raw.value}%`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <canvas ref={chartRef} style={{ width: '100%', height: '400px' }}></canvas>
  );
};

export default TreemapChart;
