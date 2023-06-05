import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart(props) {
  const cargoData = {
    labels: props?.data?.labels,
    datasets: [
      {
        label: "ULD",
        data: props.data?.quantity,
        yAxisID: "A",
        backgroundColor: "#00aaea",
        barPercentage: props?.data?.labels?.length <= 2 ? 0.3 : 0.5,
      },
      {
        label: "Loose",
        data: props.data?.weight,
        yAxisID: "B",
        backgroundColor: "#ff6118",
        barPercentage: props?.data?.labels?.length <= 2 ? 0.3 : 0.5,
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
              labelString: "Quantity",
            },
            gridLines: {
              display: false,
            },
            ticks: {
              min: 0,
              stepSize: 20,
            },
          },
          {
            id: "B",
            position: "right",
            scaleLabel: {
              display: true,
              labelString: "Weight(kg)",
              position: "top",
            },

            gridLines: {
              display: false,
            },
            ticks: {
              min: 0,
              stepSize: 30,
            },
          },
        ],
      },
    },
  };

  return (
    <Bar id="cargoVolumeBar" data={cargoData} options={cargoData.options} />
  );
}

export default BarChart;
