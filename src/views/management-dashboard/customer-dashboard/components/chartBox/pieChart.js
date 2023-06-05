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
		tooltips: {
			callbacks: {
				label: function (item, everything) {
					return everything.labels[item.index];
				},
				footer: function (item, everything) {
					// return `${everything.labels[item.index]}: ${
					// 	props?.jobCount[item.index]
					// }`;
					return `Job Count: ${props?.jobCount[item[0]?.index]}
Revenue: $${everything.datasets[0]?.data[item[0]?.index]}
Cost: $${everything.datasets[0]?.cost[item[0]?.index]}
Margin: $${everything.datasets[0]?.margin[item[0]?.index]}`;
				},
			},
		},
		plugins: {
			datalabels: {
				color: "white",
				formatter: function (value, context) {
					return "";
				},
				// formatter: function (value, context) {
				// 	if (props.percentage) {
				// 		return `$${value}, ${
				// 			context.chart.data.datasets[0].addData[context.dataIndex]
				// 		}%  `;
				// 	}
				// },
			},
		},
	};
	const data = {
		datasets: [
			{
				borderWidth: 0,
				data: props.data,
				backgroundColor: props.backgroundColor,
				addData: props.percentage,
				cost: props.cost,
				margin: props.margin,
			},
		],
		labels: props.labels,
	};
	return <Doughnut data={data} options={options} height={200} width={324} />;
}

export default PieChartView;
