import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

function PieChartView(props) {
  const options = {
    maintainAspectRatio: false,
    height: 250,
    width: 250,
    responsive: true,
    legend: {
      display: false,
    },
    cutoutPercentage: 0,
    plugins: {
      datalabels: {
        color: "white",
      },
    },
  };
  const data = {
    datasets: [
      {
        borderWidth: 0,
        data: props.data,
        backgroundColor: props.backgroundColor,
      },
    ],
    labels: props.labels,
  };
  return <Doughnut data={data} options={options} height={200} width={324} />;
}

export default PieChartView;
