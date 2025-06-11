import React, { useState, useRef, useEffect } from 'react';
import * as Chart from 'chart.js';

// Register all Chart.js components
Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.PointElement,
  Chart.LineElement,
  Chart.BarElement,
  Chart.ArcElement,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend,
  Chart.Filler,
  Chart.RadialLinearScale,
  Chart.PieController
);


const ChartJs = ({ type, data, options = {}, width = 400, height = 300 }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    
    // Default options for different chart types
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`
        },
        legend: {
          display: true,
          position: 'top'
        }
      },
      ...getTypeSpecificOptions(type)
    };

    // Merge with custom options
    const finalOptions = {
      ...defaultOptions,
      ...options
    };

    // Create new chart
    chartRef.current = new Chart.Chart(ctx, {
      type: getChartType(type),
      data: data,
      options: finalOptions
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, data, options]);

  const getChartType = (type) => {
    const typeMap = {
      'line': 'line',
      'bar': 'bar',
      'horizontalBar': 'bar',
      'pie': 'pie',
      'doughnut': 'doughnut',
      'radar': 'radar',
      'polarArea': 'polarArea',
      'bubble': 'bubble',
      'scatter': 'scatter',
      'area': 'line'
    };
    return typeMap[type] || 'line';
  };

  const getTypeSpecificOptions = (type) => {
    switch (type) {
      case 'horizontalBar':
        return {
          indexAxis: 'y',
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
          }
        };
      case 'area':
        return {
          fill: true,
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
          }
        };
      case 'radar':
        return {
          scales: {
            r: {
              beginAtZero: true
            }
          }
        };
      case 'bubble':
      case 'scatter':
        return {
          scales: {
            x: { type: 'linear', position: 'bottom' },
            y: { beginAtZero: true }
          }
        };
      default:
        return {
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
          }
        };
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md p-4">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full"
      />
    </div>
  );
};

export default ChartJs