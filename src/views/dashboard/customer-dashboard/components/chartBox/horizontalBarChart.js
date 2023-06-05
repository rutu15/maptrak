import React from "react";
import { HorizontalBar } from "react-chartjs-2";

function HorizontalBarChart(props) {
  var colors = [];
  for (var i = 0; i < props?.data?.type?.length; i++) {
    var color;
    switch (props?.data?.type[i]) {
      case "Qantas":
        color = "#1e3669";
        break;
      case "Qantas T1":
        color = "#0c2485";
        break;
      case "Qantas T1 Canyard":
        color = "#192d91";
        break;
      case "Qantas T3":
        color = "#1844b5";
        break;
      case "Qantas T3 Canyard":
        color = "#364ec2";
        break;
      case "Qantas Domestic":
        color = "#4f67db";
        break;
      case "Qantas EHU":
        color = "#6e82e0";
        break;
      case "Menzies":
        color = "#146b23";
        break;
      case "Menzies T0":
        color = "#248235";
        break;
      case "Menzies T1":
        color = "#38a14b";
        break;
      case "Menzies T2":
        color = "#45b559";
        break;
      case "Menzies Canyard":
        color = "#63d677";
        break;
      case "Dnata":
        color = "#ed0707";
        break;
      case "Dnata T1":
        color = "#f03232";
        break;
      case "Dnata T2":
        color = "#e04646";
        break;
      case "Dnata T3":
        color = "#e05e5e";
        break;
      case "Dnata Canyard":
        color = "#eb7a7a";
        break;
      case "Air NZ":
        color = "#96a195";
        break;
      case "Swissport":
        color = "#393d39";
        break;

      default:
        color = "#736363";
        break;
    }
    colors[i] = color;
  }

  const jobDurationData = {
    labels: props?.data?.label,
    datasets: [
      {
        labels: "Dnata",
        backgroundColor: colors,
        data: props?.data?.data,
        barPercentage: props?.data?.data?.length === 1 ? 0.3 : 0.7,
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
              labelString: "Hours",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              display: false,
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

  return (
    <HorizontalBar data={jobDurationData} options={jobDurationData.options} />
  );
}
export default HorizontalBarChart;
