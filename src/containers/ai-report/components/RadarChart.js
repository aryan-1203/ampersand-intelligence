import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
// import './RadarChart.css'; // Import your CSS file

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ scores, parameters }) => {

  const gradientColors = {
    stops: [
      { color: "rgba(112, 65, 218, 0.20)", stop: 0.15 },
      { color: "rgba(0, 173, 101, 0.20)", stop: 0.65 },
      { color: "rgba(216, 255, 26, 0.20)", stop: 1 },
    ],
  };

  const borderGradientColors = {
    stops: [
      { color: "#7041DA", stop: 0.15 },
      { color: "#00AD65", stop: 0.65 },
      { color: "#D8FF1A", stop: 1 },
    ],
  };

  const createRadialGradient = (ctx, chartArea) => {
    const { top, bottom, left, right } = chartArea;
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    const radius = Math.min(centerX, centerY);
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradientColors.stops.forEach(({ color, stop }) => {
      gradient.addColorStop(stop, color);
    });

    return gradient;
  };

  const createBorderGradient = (ctx, chartArea) => {
    const { top, bottom, left, right } = chartArea;
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    const radius = Math.min(centerX, centerY);
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    borderGradientColors.stops.forEach(({ color, stop }) => {
      gradient.addColorStop(stop, color);
    });

    return gradient;
  };

  const data = {
    labels: parameters,
    datasets: [
      {
        label: "Parametric Scores",
        data: scores,
        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return createRadialGradient(ctx, chartArea);
        },
        borderColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return createBorderGradient(ctx, chartArea);
        },
        borderWidth: 2,
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        pointBorderWidth: 0,
        fill: 'start',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: { display: false },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        angleLines: { color: "rgba(255, 255, 255, 0.1)" },
        pointLabels: {
          color: "#fff",
          font: {
            size: 12,
            weight: 300,
          },
          padding: 10,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="radar-chart-container">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
