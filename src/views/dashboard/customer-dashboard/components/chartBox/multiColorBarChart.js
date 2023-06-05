import React from "react";
import { Bar } from "react-chartjs-2";

function DriverChart(props) {
  var colors = [];
  for (var i = 0; i < props?.data?.type?.length; i++) {
    var color;
    switch (props?.data?.type[i]) {
      case "Sydney":
        color = "#61ebed";
        break;
      case "Auckland":
        color = "#141414";
        break;
      case "Brisbane":
        color = "#8f1414";
        break;
      case "Melbourne":
        color = "#2438ab";
        break;

      default:
        color = "#e40000";
        break;
    }
    colors[i] = color;
  }

  const jobDurationData = {
    labels: props?.data?.label,
    datasets: [
      {
        labels: "Dnata",
        backgroundColor: props?.data?.backgroundColor
          ? props?.data?.backgroundColor
          : colors,
        data: props?.data?.data,
        barPercentage: props?.data?.data?.length < 3 ? 0.1 : 0.4,
      },
    ],
    options: {
      maintainAspectRatio: true,
      legend: {
        display: false,
      },
      plugins: {
        datalabels: {
          display: false,
        },
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Drivers",
              stepSize: 1,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              min: 0,
              max: props.max,
              stepSize: 1,
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            const hasType =
              props?.data?.type &&
              props?.data?.type?.length &&
              props?.data?.type[tooltipItem.index]
                ? props?.data?.type[tooltipItem.index]
                : false;
            return `${hasType ? `${hasType}: ` : ""}${tooltipItem.value}`;
          },
        },
      },
    },
  };

  return <Bar data={jobDurationData} options={jobDurationData.options} />;
}
export default DriverChart;
