'use client'; // Add this line at the top

import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';

Chart.register(...registerables, TreemapController, TreemapElement);

const TreemapChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const main = ['Main Courses', 'Soups', 'Drinks'];

  const sub = [
    ['Pizza', 'Pasta', 'Steak'],
    ['Chicken Soup', 'Tomato Soup', 'Minestrone'],
    ['Water', 'Soda', 'Juice']
  ];

  const values = [
    [20, 20, 20],  // Values for Main Courses
    [10, 10, 10],  // Values for Soups
    [3, 3, 4]      // Values for Drinks
  ];

  const baseColor = '#27374d';

  const generateShades = (color, numberOfShades) => {
    const shades = [];
    for (let i = 0; i < numberOfShades; i++) {
      const shade = shadeColor(color, i * (100 / numberOfShades));
      shades.push(shade);
    }
    return shades;
  };

  const shadeColor = (color, percent) => {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1).toUpperCase()}`;
  };

  const colors = [
    generateShades(baseColor, 3),
    generateShades(baseColor, 3),
    generateShades(baseColor, 3)
  ];

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const data = [];

    // Convert the array structure to the required format for the treemap
    main.forEach((category, i) => {
      // Add the main category with the total value of its subcategories
      data.push({ category, label: category, value: values[i].reduce((a, b) => a + b, 0), color: colors[i][0] });

      // Add each subcategory
      sub[i].forEach((label, j) => {
        data.push({ category, label, value: values[i][j], color: colors[i][j] });
      });
    });

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
              size: 10, // Smaller text size
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
            enabled: false
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
    <canvas ref={chartRef} style={{ height: '200px' }}></canvas>
  );
};

export default TreemapChart;
