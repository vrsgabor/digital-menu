'use client';  // Add this line at the top

import React from 'react';
import Chart from 'react-apexcharts';

const TreemapChart = () => {
    const options = {
        chart: {
            type: 'treemap',
            toolbar: {
                show: false, // Hide the menu
            },
            background: '#dde6ed' // Set chart background color
        },
        colors: ['#27374d', '#3b4c65', '#526d82'],
        legend: {
            show: true, // Show the legends
            labels: {
                colors: '#526d82',
                useSeriesColors: true,
                fontFamily: 'Sf Pro Display, sans-serif'
            }
        },
        tooltip: {
            y: {
                formatter: function (value) {
                    return `${value}%`;
                }
            }
        },
        title: {
            text: 'Akt. hónap étel kategóriák',
            align: 'left',
            style: {
                fontSize: '14px',
                color: '#526d82',
                fontFamily: 'Sf Pro Display, sans-serif',
                fontWeight: 'bold' // Set the font weight to bold
            }
        },
        plotOptions: {
            treemap: {
                distributed: true,
                enableShades: true,
                shadeIntensity: 0.5,
                reverseNegativeShade: true,
                colorScale: {
                    ranges: [
                        { from: 0, to: 20, color: '#27374d' },
                        { from: 21, to: 40, color: '#3b4c65' },
                        { from: 41, to: 60, color: '#526d82' }
                    ]
                },
                stroke: {
                    width: 1,
                    color: '#dde6ed', // Match the stroke color with the background color
                    opacity: 0 // Ensure the stroke is fully transparent
                }
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
                fontFamily: 'Sf Pro Display, sans-serif',
                colors: ['#ffffff'] // Set labels to white
            },
            formatter: function (val, opts) {
                return `${opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex].y}%`;
            },
            background: {
                enabled: false
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const series = [
        {
            name: 'Főételek',
            data: [
                { x: 'Subcategory 1', y: 20 },
                { x: 'Subcategory 2', y: 25 },
                { x: 'Subcategory 3', y: 15 }
            ]
        },
        {
            name: 'Levesek',
            data: [
                { x: 'Subcategory 1', y: 10 },
                { x: 'Subcategory 2', y: 10 },
                { x: 'Subcategory 3', y: 10 }
            ]
        },
        {
            name: 'Italok',
            data: [
                { x: 'Subcategory 1', y: 5 },
                { x: 'Subcategory 2', y: 3 },
                { x: 'Subcategory 3', y: 2 }
            ]
        }
    ];

    return (
        <Chart options={options} series={series} type="treemap" height="247" />
    );
};

export default TreemapChart;
