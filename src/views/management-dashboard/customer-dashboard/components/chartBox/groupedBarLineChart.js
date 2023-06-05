import React from "react";
import { Bar } from "react-chartjs-2";
import { colors } from "@utils/constant";

function BarLineChart(props) {
	const data = {
		labels: props?.labels,
		datasets: [
			{
				type: "bar",
				label: "Average of Revenue",
				data: props?.revenue,
				yAxisID: "A",
				backgroundColor: colors.lightBlue,
				barPercentage: 1,
				datalabels: {
					labels: {
						title: null,
					},
				},
				order: 1,
			},
			{
				type: "bar",
				label: "Average of Cost",
				data: props?.cost,
				yAxisID: "B",
				backgroundColor: colors.lightRed1,
				barPercentage: 1,
				datalabels: {
					labels: {
						title: null,
					},
				},
				order: 1,
			},
			{
				type: "bar",
				label: "Average of Margin",
				data: props?.margin,
				yAxisID: "C",
				backgroundColor: colors.lightGreen,
				barPercentage: 1,
				datalabels: {
					labels: {
						title: null,
					},
				},
				order: 1,
			},
			{
				type: "line",
				label: "Average of Margin",
				data: props?.marginPercentage,
				fill: false,
				borderColor: colors.darkBlue,
				backgroundColor: colors.darkBlue,
				pointBorderColor: colors.darkBlue,
				pointBackgroundColor: colors.darkBlue,
				pointHoverBackgroundColor: colors.darkBlue,
				pointHoverBorderColor: colors.darkBlue,
				yAxisID: "D",
				order: 0,
			},
		],
		options: {
			plugins: {
				datalabels: {
					display: true,
					labels: {
						title: {
							backgroundColor: "yellow",

							font: {
								lineHeight: 1.2,
								weight: "bold",
							},
						},
					},
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
							min: Math.floor(props?.min / 10) * 10,
							max: Math.ceil(props?.max / 10) * 10,
						},
					},
					{
						id: "B",
						display: false,
						gridLines: {
							display: false,
						},
						ticks: {
							min: Math.floor(props?.min / 10) * 10,
							max: Math.ceil(props?.max / 10) * 10,
						},
					},
					{
						id: "C",
						display: false,
						gridLines: {
							display: false,
						},
						ticks: {
							min: Math.floor(props?.min / 10) * 10,
							max: Math.ceil(props?.max / 10) * 10,
						},
					},
					{
						id: "D",
						display: true,
						position: "right",
						gridLines: {
							display: false,
						},
						scaleLabel: {
							display: true,
							labelString: "Percentage %",
						},
						// ticks: {
						// 	min: Math.ceil(props?.minPer / 10) * 10,
						// 	// stepSize: 10,
						// 	max: Math.ceil(props?.maxPer / 10) * 10,
						// },
					},
				],
			},
		},
	};

	return <Bar id="cargoVolumeBar" data={data} options={data.options} />;
}

export default BarLineChart;
