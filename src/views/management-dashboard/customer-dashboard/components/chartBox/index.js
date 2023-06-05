import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";

import { useStore } from "@store/store";
import { colors } from "@utils/constant";
import GroupedBarLineChart from "./groupedBarLineChart";
// import GroupedBarChart from "./groupedBarChart";
import PieChart from "./pieChart";

import { ChartBoxStyle } from "./style";

function ChartBox() {
	const classes = ChartBoxStyle();
	const [state] = useStore();
	const [jobTypeRevenue, setJobTypeRevenue] = useState([]);
	const [topCustomerRevenue, setTopCustomerRevenue] = useState([]);
	const [employCostRevenue, setEmployCostRevenue] = useState([]);
	const backgroundColor = [
		colors.darkRed,
		colors.yellow,
		colors.darkBlue,
		colors.lightGreen,
		colors.primary,
		colors.green,
		colors.lightBlue,
		"#141414",
		colors.lightRed1,
		colors.light_black,
	];

	useEffect(() => {
		// For set JobTypeRevenue
		let jobTypeRevenueArr = [
			{
				labels: [],
				data: [],
				percentage: [],
				jobCount: [],
				cost: [],
				margin: [],
			},
		];
		let obj = state?.dashboard?.revenueCostMarginData?.calculationByJobType;
		for (const property in obj) {
			obj[property]?.totalRevenue &&
				jobTypeRevenueArr[0].labels?.push(property);
			obj[property]?.totalRevenue &&
				jobTypeRevenueArr[0].data?.push(obj[property]?.totalRevenue);
			obj[property]?.jobCount &&
				jobTypeRevenueArr[0].jobCount?.push(obj[property]?.jobCount);
			obj[property]?.totalMarginPercentage &&
				jobTypeRevenueArr[0].percentage?.push(
					obj[property]?.totalMarginPercentage
				);
			obj[property]?.totalCost &&
				jobTypeRevenueArr[0].cost?.push(obj[property]?.totalCost);
			obj[property]?.totalMargin &&
				jobTypeRevenueArr[0].margin?.push(obj[property]?.totalMargin);
		}
		setJobTypeRevenue(jobTypeRevenueArr);

		// For set Top 10 Customers by Revenue
		let topCustomerRevenueArr = [
			{
				labels: [],
				data: [],
				percentage: [],
				jobCount: [],
				backgroundColor: backgroundColor.slice(0),
				cost: [],
				margin: [],
			},
		];
		state?.dashboard?.revenueCostMarginData?.customerByRevenue
			?.slice(0, 10)
			?.map((item) => {
				item?.revenue > 0 &&
					topCustomerRevenueArr[0].labels?.push(item?.customer);
				item?.revenue > 0 && topCustomerRevenueArr[0].data?.push(item?.revenue);
				topCustomerRevenueArr[0].jobCount?.push(item?.jobCount);
				topCustomerRevenueArr[0].percentage?.push(item?.marginPercentage);
				topCustomerRevenueArr[0].cost?.push(item?.cost);
				topCustomerRevenueArr[0].margin?.push(item?.margin);
				return true;
			});
		setTopCustomerRevenue(topCustomerRevenueArr);

		// For employ Cost over sales Revenue
		let employCostRevenueArr = [
			{
				labels: [],
				revenue: [],
				cost: [],
				margin: [],
				marginPercentage: [],
				max: 0,
				min: 0,
			},
		];
		state?.dashboard?.revenueCostMarginData?.avgRevenueByBranch?.map((item) => {
			(item?.revenue || item?.cost || item?.margin || item?.marginPercentage) &&
				employCostRevenueArr[0].labels?.push(item?.cities?.name);
			employCostRevenueArr[0].revenue?.push(item?.revenue);
			employCostRevenueArr[0].cost?.push(item?.cost);
			employCostRevenueArr[0].margin?.push(item?.margin);
			employCostRevenueArr[0].marginPercentage?.push(item?.marginPercentage);
			return true;
		});

		const length = employCostRevenueArr[0]?.labels.length;
		employCostRevenueArr[0].revenue = employCostRevenueArr[0].revenue.slice(
			0,
			length
		);
		employCostRevenueArr[0].cost = employCostRevenueArr[0].cost.slice(
			0,
			length
		);
		employCostRevenueArr[0].margin = employCostRevenueArr[0].margin.slice(
			0,
			length
		);
		employCostRevenueArr[0].marginPercentage =
			employCostRevenueArr[0].marginPercentage.slice(0, length);

		let arr = [];
		arr = arr.concat(
			employCostRevenueArr[0]?.revenue,
			employCostRevenueArr[0]?.cost,
			employCostRevenueArr[0]?.margin
		);
		employCostRevenueArr[0].max = Math.max(...arr) > 0 ? Math.max(...arr) : 0;
		employCostRevenueArr[0].min = Math.min(...arr) < 0 ? Math.min(...arr) : 0;
		setEmployCostRevenue(employCostRevenueArr);
		// eslint-disable-next-line
	}, [state?.dashboard]);

	return (
		<div className={classes.ChartBoxWrapper}>
			<div className="dashboard-details-wrapper">
				<div className="two-coloumn-block main-dashboard-content">
					<div className="dashboard-details-inner awb-not-taken-fully">
						<div className="inner-white-box">
							<div className="chart-title">
								<div className="title-text">
									<Typography variant="h2">Job type wise Revenue</Typography>
								</div>
							</div>

							{jobTypeRevenue && jobTypeRevenue[0]?.data?.length > 0 ? (
								<>
									<div className="chart-wrapper">
										<PieChart
											labels={jobTypeRevenue[0]?.labels}
											data={jobTypeRevenue[0]?.data}
											jobCount={jobTypeRevenue[0]?.jobCount}
											percentage={jobTypeRevenue[0]?.percentage}
											cost={jobTypeRevenue[0]?.cost}
											margin={jobTypeRevenue[0]?.margin}
											backgroundColor={backgroundColor.slice(
												0,
												jobTypeRevenue[0]?.labels?.length
											)}
										/>
									</div>

									<div className="chart-footer-content">
										<div className="chart-info">
											<div className="chart-info-inner">
												{jobTypeRevenue[0]?.labels.length > 0 &&
													jobTypeRevenue[0]?.labels.map((item, index) => (
														<span
															key={index}
															className={`color${index + 1}-text`}
														>
															{item}
														</span>
													))}
											</div>
										</div>
									</div>
								</>
							) : (
								<div className="data-text-2">
									<Typography variant="h2"> No Data Available</Typography>
								</div>
							)}
						</div>
					</div>
					<div className="dashboard-details-inner awb-not-taken-fully">
						<div className="inner-white-box">
							<div className="chart-title">
								<div className="title-text">
									<Typography variant="h2">
										Top 10 Customers by Revenue
									</Typography>
								</div>
							</div>
							{topCustomerRevenue && topCustomerRevenue[0]?.data?.length > 0 ? (
								<>
									<div className="chart-wrapper">
										<PieChart
											labels={topCustomerRevenue[0]?.labels}
											data={topCustomerRevenue[0]?.data}
											jobCount={topCustomerRevenue[0]?.jobCount}
											percentage={topCustomerRevenue[0]?.percentage}
											cost={topCustomerRevenue[0]?.cost}
											margin={topCustomerRevenue[0]?.margin}
											backgroundColor={backgroundColor.slice(
												0,
												topCustomerRevenue[0]?.labels?.length
											)}
										/>
									</div>
									<div className="chart-footer-content">
										<div className="chart-info">
											<div className="chart-info-inner">
												{topCustomerRevenue[0]?.labels.length > 0 &&
													topCustomerRevenue[0]?.labels.map((item, index) => (
														<span
															key={index}
															className={`color${index + 1}-text`}
														>
															{item}
														</span>
													))}
											</div>
										</div>
									</div>
								</>
							) : (
								<div className="data-text-2">
									<Typography variant="h2"> No Data Available</Typography>
								</div>
							)}
						</div>
					</div>
					<div className="dashboard-details-inner dashboard-details-inner-50 awb-not-taken-fully">
						<div className="inner-white-box">
							<div className="chart-title">
								<div className="title-text">
									<Typography variant="h2">Branch wise Revenue</Typography>
								</div>
							</div>
							{employCostRevenue && employCostRevenue[0]?.labels?.length > 0 ? (
								<>
									<GroupedBarLineChart
										labels={employCostRevenue[0]?.labels}
										revenue={employCostRevenue[0]?.revenue}
										cost={employCostRevenue[0]?.cost}
										margin={employCostRevenue[0]?.margin}
										marginPercentage={employCostRevenue[0]?.marginPercentage}
										max={employCostRevenue[0]?.max}
										min={employCostRevenue[0]?.min}
									/>
									<div className="chart-footer-content">
										<div className="chart-info">
											<div className="chart-info-inner">
												<span className="lightblue-text">
													Average of Revenue
												</span>
												<span className="light-red-text">Average of Cost</span>
												<span className="light-green-text">
													Average of Margin
												</span>
												<span className="darkblue-text">
													Average of Margin %
												</span>
											</div>
										</div>
									</div>
								</>
							) : (
								<div className="data-text-2">
									<Typography variant="h2"> No Data Available</Typography>
								</div>
							)}
						</div>
					</div>
				</div>
				{/* <div className="two-coloumn-block">
					<div className="dashboard-details-inner awb-not-taken-fully">
						<div className="inner-white-box">
							<div className="chart-title">
								<div className="title-text">
									<Typography variant="h2">
										Employee Cost over Sales Revenue
									</Typography>
								</div>
							</div>
							{employCostRevenue && employCostRevenue[0]?.labels?.length > 0 ? (
								<>
									<GroupedBarLineChart
										labels={employCostRevenue[0]?.labels}
										revenue={employCostRevenue[0]?.revenue}
										cost={employCostRevenue[0]?.cost}
										margin={employCostRevenue[0]?.margin}
										marginPercentage={employCostRevenue[0]?.marginPercentage}
										max={employCostRevenue[0]?.max}
										min={employCostRevenue[0]?.min}
									/>
									<div className="chart-footer-content">
										<div className="chart-info">
											<div className="chart-info-inner">
												<span className="lightblue-text">
													Average of Revenue
												</span>
												<span className="light-red-text">Average of Cost</span>
												<span className="light-green-text">
													Average of Margin
												</span>
												<span className="darkblue-text">
													Average of Margin %
												</span>
											</div>
										</div>
									</div>
								</>
							) : (
								<div className="data-text-2">
									<Typography variant="h2"> No Data Available</Typography>
								</div>
							)}
						</div>
					</div>
					<div className="dashboard-details-inner awb-not-taken-fully">
						<div className="inner-white-box">
							<div className="chart-title">
								<div className="title-text">
									<Typography variant="h2">Revenue Cost and Margin</Typography>
								</div>
							</div>
							<GroupedBarLineChart
								data={{
									labels: ["BNE", "NZ", "SYD", "VIC"],
									weight: [1, 2, 4, 5],
								}}
							/>
							<div className="chart-footer-content">
								<div className="chart-info">
									<div className="chart-info-inner">
										<span className="lightblue-text">Revenue</span>
										<span className="light-red-text">Cost</span>
										<span className="light-green-text">Margin</span>
										<span className="darkblue-text">Percentage</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> */}
				{/* <div className="two-coloumn-block">
					<div className="dashboard-details-inner awb-not-taken-fully">
						<div className="inner-white-box">
							<div className="chart-title">
								<div className="title-text">
									<Typography variant="h2">Driver's Average Revenue</Typography>
								</div>
							</div>
							<GroupedBarChart
								data={{
									labels: ["BNE", "NZ", "SYD", "VIC"],
									weight: [1, 2, 4, 5],
								}}
							/>
							<div className="chart-footer-content">
								<div className="chart-info">
									<div className="chart-info-inner">
										<span className="lightblue-text">Average of Revenue</span>
										<span className="light-red-text">Average of Cost</span>
										<span className="light-green-text">Average of Margin</span>
										<span className="darkblue-text">Sun of Margin %</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
}
export default ChartBox;
