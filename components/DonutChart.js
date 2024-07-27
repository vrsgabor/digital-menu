// components/DonutChart.js
'use client';  // Add this line at the top

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Főételek', 'Levesek', 'Italok'],
    datasets: [
        {
            data: [60, 30, 10],
            backgroundColor: ['#27374d', '#3b4c65', '#526d82'],
            hoverBackgroundColor: ['#27374d', '#3b4c65', '#526d82'],
            borderColor: 'transparent',
        }
    ]
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right',
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                }
            }
        }
    }
};

const DonutChart = () => {
    return (
        <div style={{ width: '220px', height: '110px' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DonutChart;
