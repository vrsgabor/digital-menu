'use client';  // Add this line at the top

import React from 'react';
import Chart from 'react-apexcharts';

const DonutChart = () => {
    const options = {
        chart: {
            type: 'donut'
        },
        labels: ['Főételek', 'Levesek', 'Italok'],
        colors: ['#27374d', '#3b4c65', '#526d82'],
        legend: {
            show: true,  // Show the legends
            position: 'left',  // Position the legends on the left
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
                fontWeight: 'bold'  // Set the font weight to bold
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '40%'  // Adjust the size to make the doughnut wider
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val, opts) {
                        return `${opts.w.config.series[opts.seriesIndex]}%`;
                    },
                    dropShadow: {
                        enabled: true
                    },
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Sf Pro Display, sans-serif',
                        colors: ['#ffffff']  // Set labels to white
                    },
                    offsetX: 0,
                    offsetY: 0,
                    background: {
                        enabled: true,
                        foreColor: '#27374d',  // Background color of the label
                        borderRadius: 2,
                        borderWidth: 1,
                        borderColor: '#526d82',
                        opacity: 0.9
                    }
                },
                stroke: {
                    width: 0
                }
            }
        },
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: false
            },
            style: {
                fontSize: '12px',
                fontFamily: 'Sf Pro Display, sans-serif',
                colors: ['#ffffff']  // Set labels to white
            },
            formatter: function (val, opts) {
                return `${opts.w.config.series[opts.seriesIndex]}%`;
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

    const series = [60, 30, 10];

    return (
            <Chart options={options} series={series} type="donut" height="170"  />
    );
};

export default DonutChart;
