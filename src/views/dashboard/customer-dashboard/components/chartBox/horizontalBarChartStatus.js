import React from "react";
import { HorizontalBar } from "react-chartjs-2";

function HorizontalBarChartStatus(props) {
  const jobDurationData = {
    labels: props?.data?.label,
    datasets: [
      {
        labels: "Dnata",
        backgroundColor: props?.data?.backgroundColor,
        data: props?.data?.data,
        barPercentage: props?.data?.data?.length === 1 ? 0.3 : 0.7,
      },
    ],
    options: {
      onClick: (e, items) =>
        props.handleRedirection(items && items[0]?._model?.label),
      maintainAspectRatio: false,
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
              labelString: "Qty",
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
    },
  };

  return (
    <HorizontalBar
      id={"jobStatusBar"}
      data={jobDurationData}
      options={jobDurationData.options}
    />
  );
}
export default HorizontalBarChartStatus;
