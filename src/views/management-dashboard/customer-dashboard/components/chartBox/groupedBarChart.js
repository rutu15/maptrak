import React from "react";
import { Bar } from "react-chartjs-2";
import { colors } from "@utils/constant";

function BarChart(props) {
  const data = {
    labels: props?.data?.labels,
    datasets: [
      {
        type: "bar",
        label: "Average of Revenue",
        data: [1, 1, 2, 2],
        yAxisID: "A",
        backgroundColor: colors.lightBlue,
        barPercentage: 1,
      },
      {
        type: "bar",
        label: "Average of Cost",
        data: [1, 1, 2, 2],
        yAxisID: "B",
        backgroundColor: colors.lightRed1,
        barPercentage: 1,
      },
      {
        type: "bar",
        label: "Average of Margin",
        data: [1, 1, 2, 3],
        yAxisID: "C",
        backgroundColor: colors.lightGreen,
        barPercentage: 1,
      },
    ],
    options: {
      plugins: {
        datalabels: {
          display: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            id: "A",
            display: true,
            position: "left",
            scaleLabel: {
              display: true,
              labelString: "Dollar $",
            },
            gridLines: {
              display: false,
            },
            ticks: {
              min: 0,
              stepSize: 1,
              max: 5,
            },
          },
          {
            id: "B",
            display: false,
            gridLines: {
              display: false,
            },
            ticks: {
              min: 0,
              stepSize: 1,
              max: 5,
            },
          },
          {
            id: "C",
            display: false,
            gridLines: {
              display: false,
            },
            ticks: {
              min: 0,
              stepSize: 1,
              max: 5,
            },
          },
        ],
      },
    },
  };

  return <Bar id="cargoVolumeBar" data={data} options={data.options} />;
}

export default BarChart;
