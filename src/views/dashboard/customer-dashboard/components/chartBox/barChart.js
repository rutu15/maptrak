import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart(props) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        backgroundColor: props.backgroundColor,
        borderColor: "rgba(0,0,0,1)",
        data: props.data,
        barPercentage: props.data?.length >= 1 ? 0.2 : 0.4,
      },
    ],
    options: {
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          display: false,
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: props.beginAtZero,
              stepSize: props.stepSize,
              max: props.max,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: props.labelString,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  };

  return <Bar id="cargoVolumeBar" data={data} options={data.options} />;
}

export default BarChart;
