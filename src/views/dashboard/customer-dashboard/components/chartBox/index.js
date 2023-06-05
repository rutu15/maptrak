import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

import { useStore } from "@store/store";
import { colors } from "@utils/constant";
import {
  convertMinutesToHours,
  averageMinutesToHours,
} from "@utils/commonFunctions";
import HorizontalBarChart from "./horizontalBarChart";
import HorizontalBarChartStatus from "./horizontalBarChartStatus";
import GroupedBarChart from "./groupedBarChart";
import SpeedoMeterChart from "./speedometerChart";
import BarChart from "./barChart";
import PieChart from "./pieChart";
import MultiColorBarChart from "./multiColorBarChart";
import { ChartBoxStyle } from "./style";

function ChartBox(props) {
  const classes = ChartBoxStyle();
  const [driverTimeSheet, setDriverTimeSheet] = useState([]);
  const [jobWithoutChild, setJobWithoutChild] = useState([]);
  const [fatigue, setFatigue] = useState([]);
  const [cargo, setCargo] = useState([]);
  const [jobCharge, setJobCharge] = useState([]);
  const [awb, setAwb] = useState([]);
  const [durationHours, setDurationHours] = useState([]);
  const [waitingHours, setWaitingHours] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [jobStatus, setJobStatus] = useState([]);
  const [state] = useStore();

  useEffect(() => {
    // For driver whose timesheet not approved
    let arr = [
      {
        label: [],
        data: [],
        type: [],
      },
    ];
    state?.dashboard?.jobDriverData?.driverTimesheetNotApproved?.map((item) => {
      arr[0].label?.push(item?.drivers?.name);
      arr[0].data?.push(item?.timeSheetNotApprovedCount);
      arr[0].type?.push(item?.drivers?.cities?.name);
      return true;
    });
    setDriverTimeSheet(arr);

    // For jobs with child account not being mapped
    let withoutChild = [
      {
        labels: [],
        data: [],
      },
    ];
    state?.dashboard?.jobDriverData?.jobWithoutChild?.map((item) => {
      withoutChild[0].labels?.push(item?.customers?.name);
      withoutChild[0].data?.push(item?.jobCount);
      return true;
    });
    setJobWithoutChild(withoutChild);

    // For Fatigue Management
    let fatigueArr = [
      {
        label: [],
        data: [],
        type: [],
      },
    ];
    state?.dashboard?.jobDriverData?.fatigueManagement?.map((item) => {
      fatigueArr[0].label?.push(item?.driverName);
      fatigueArr[0].data?.push(
        parseInt(convertMinutesToHours(item?.timeDiffInMin).replace(":", "."))
      );
      fatigueArr[0].type?.push(item?.city);
      return true;
    });
    setFatigue(fatigueArr);

    // For cargo volume
    let cargoArr = [
      {
        labels: [],
        weight: [],
        quantity: [],
      },
    ];
    state?.dashboard?.jobDriverData?.cargoVolumeByCTO?.map((item) => {
      cargoArr[0].labels?.push(item?.ctoName);
      cargoArr[0].weight?.push(item?.weight);
      cargoArr[0].quantity?.push(item?.quantity);
      return true;
    });
    setCargo(cargoArr);

    // For piechart of job details

    if (state?.dashboard?.dashboardTimeover?.jobWithoutChargeAndStatus) {
      setJobCharge(
        Object.values(
          state?.dashboard?.dashboardTimeover?.jobWithoutChargeAndStatus
        )
      );
    }

    // For piechart of invoice
    if (state?.dashboard?.dashboardTimeover?.invoiceStatus) {
      setInvoice(
        Object.values(state?.dashboard?.dashboardTimeover?.invoiceStatus)
      );
    }

    // For job status

    const jobStatusArr = [
      {
        label: [],
        data: [],
        backgroundColor: [
          "#28cd84",
          "#fbbe3e",
          "#f12121",
          "#58bd45",
          "#c165e8",
          "#3a3939",
          "#0e99ff",
          "#939393",
          "#192d91",
          "#63d677",
        ],
      },
    ];

    for (var i in state?.dashboard?.jobDriverData?.jobStatus?.rows) {
      if (i === "notAssigned") jobStatusArr[0].label.push("Not Assigned");
      if (i === "assigned") jobStatusArr[0].label.push("Assigned");
      if (i === "changeDriver") jobStatusArr[0].label.push("Change Driver");
      if (i === "completed") jobStatusArr[0].label.push("Completed");
      if (i === "inTransit") jobStatusArr[0].label.push("In Transit");
      if (i === "loading") jobStatusArr[0].label.push("Loading");
      if (i === "lodgement") jobStatusArr[0].label.push("Lodgement");
      if (i === "rejected") jobStatusArr[0].label.push("Rejected");
      if (i === "reviewCompleted")
        jobStatusArr[0].label.push("Review Completed");
      if (i === "unloading") jobStatusArr[0].label.push("Unloading");
      jobStatusArr[0].data.push(
        state?.dashboard?.jobDriverData?.jobStatus?.rows[i]
      );
    }
    setJobStatus(jobStatusArr);
    // For Jobs whose AWB is not taken fully
    let awbArr = [
      {
        label: [],
        data: [],
      },
    ];
    state?.dashboard?.dashboardTimeover?.jobsAWBNotTakenFully?.map((item) => {
      awbArr[0].label?.push(item?.jobId);
      awbArr[0].data?.push(item?.awbRemainderQty);
      return true;
    });
    setAwb(awbArr);

    // For Job duration over 3 hours
    let hoursDurationArr = [
      {
        label: [],
        data: [],
        type: [],
      },
    ];
    state?.dashboard?.dashboardTimeover?.jobDurationOver3Hours?.rows?.map(
      (item) => {
        hoursDurationArr[0].label?.push(`${item.id}-${item.jobTypes?.name}`);
        hoursDurationArr[0].data?.push(
          parseInt(convertMinutesToHours(item.totalDuration))
        );
        hoursDurationArr[0].type?.push(
          item.ctos ? item?.ctos?.name : "consignment"
        );
        return true;
      }
    );
    setDurationHours(hoursDurationArr);

    // For Job Waiting Time over 2 hours
    let waitingHours = [
      {
        label: [],
        data: [],
        type: [],
      },
    ];
    state?.dashboard?.dashboardTimeover?.jobWaitingTimeOver2Hours?.rows?.map(
      (item) => {
        waitingHours[0].label?.push(`${item.id}-${item.jobTypes?.name}`);
        waitingHours[0].data?.push(
          parseInt(convertMinutesToHours(item.waitingTimeOver))
        );
        waitingHours[0].type?.push(
          item.ctos ? item?.ctos?.name : "consignment"
        );
        return true;
      }
    );
    setWaitingHours(waitingHours);
  }, [state?.dashboard]);

  return (
    <div className={classes.ChartBoxWrapper}>
      <div className="dashboard-details-wrapper">
        <div className="two-coloumn-block main-dashboard-content">
          <div className="dashboard-details-inner side-content">
            <div className="inner-white-box">
              <div className="chart-title">
                <div className="title-text">
                  <Typography variant="h2">Cargo Volume by CTO</Typography>
                </div>
                {cargo && cargo[0]?.labels?.length > 0 && (
                  <div className="chart-info">
                    <div className="chart-info-inner">
                      {state?.common?.cargoTypeData?.map((item, index) => {
                        return (
                          <span
                            key={index}
                            className={`${
                              item.name === "ULD"
                                ? "lightblue-text"
                                : "light-red-text"
                            }`}
                            onClick={() =>
                              props.handleRedirection("CARGO_VOLUME", item.id)
                            }
                          >
                            {item.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {cargo && cargo[0]?.labels?.length > 0 ? (
                <div className="chart-wrapper">
                  <GroupedBarChart data={cargo && cargo[0]} />
                </div>
              ) : (
                <div className="data-text">
                  <Typography variant="h2"> No Data Available</Typography>
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-details-inner">
            <div className="hours-wrapper">
              <div className="hours-inner-wrapper">
                <div className="white-card">
                  <span className="hours">
                    {parseFloat(
                      averageMinutesToHours(
                        state?.dashboard?.dashboardAverageData
                          ?.averageJobDuration
                      ).replace(" : ", ".")
                    )}{" "}
                    hr
                  </span>
                  <div className="hours-title">Average job duration</div>
                </div>
              </div>
              <div className="hours-inner-wrapper">
                <div className="white-card">
                  <span className="hours">
                    {parseFloat(
                      averageMinutesToHours(
                        state?.dashboard?.dashboardAverageData
                          ?.averageWaitingTime
                      ).replace(" : ", ".")
                    )}{" "}
                    hr
                  </span>
                  <div className="hours-title">Average waiting time</div>
                </div>
              </div>
              <div className="hours-inner-wrapper">
                <div className="white-card">
                  <span className="hours">
                    {parseFloat(
                      averageMinutesToHours(
                        state?.dashboard?.dashboardAverageData
                          ?.averageDrivingTime
                      ).replace(" : ", ".")
                    )}{" "}
                    hr
                  </span>
                  <div className="hours-title">Average driving time</div>
                </div>
              </div>
              <div className="hours-inner-wrapper">
                <div className="white-card">
                  <span className="hours">
                    {parseFloat(
                      averageMinutesToHours(
                        state?.dashboard?.dashboardAverageData
                          ?.averageDailyWorkingTime
                      ).replace(" : ", ".")
                    )}{" "}
                    hr
                  </span>
                  <div className="hours-title">Average daily working time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="two-coloumn-block">
          <div
            className="dashboard-details-inner"
            onClick={() => props.handleRedirection("JOBS_GRAPH_FILTER", 1)}
          >
            <div className="inner-white-box">
              <div className="chart-title">
                <div className="title-text">
                  <Typography variant="h2">
                    Job duration over 3 hours{" "}
                    <span>
                      (
                      {
                        state?.dashboard?.dashboardTimeover
                          ?.jobDurationOver3Hours?.count
                      }{" "}
                      Jobs)
                    </span>
                  </Typography>
                </div>
              </div>
              {durationHours && durationHours[0]?.data?.length > 0 ? (
                <div className="chart-wrapper">
                  <HorizontalBarChart
                    data={durationHours && durationHours[0]}
                  />
                </div>
              ) : (
                <div className="data-text-2">
                  <Typography variant="h2"> No Data Available</Typography>
                </div>
              )}
            </div>
          </div>
          <div
            className="dashboard-details-inner"
            onClick={() => props.handleRedirection("JOBS_GRAPH_FILTER", 2)}
          >
            <div className="inner-white-box">
              <div className="chart-title">
                <div className="title-text">
                  <Typography variant="h2">
                    Job Waiting Time over 2 hours{" "}
                    <span>
                      (
                      {
                        state?.dashboard?.dashboardTimeover
                          ?.jobWaitingTimeOver2Hours?.count
                      }{" "}
                      Jobs)
                    </span>
                  </Typography>
                </div>
              </div>
              {waitingHours && waitingHours[0]?.data?.length > 0 ? (
                <div className="chart-wrapper">
                  <HorizontalBarChart data={waitingHours && waitingHours[0]} />
                </div>
              ) : (
                <div className="data-text-2">
                  <Typography variant="h2"> No Data Available</Typography>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="three-coloumn-block">
          <div
            className="dashboard-details-inner awb-not-taken-fully"
            onClick={() => props.handleRedirection("JOBS_GRAPH_FILTER", 6)}
          >
            <div className="inner-white-box">
              <label className="label-text">
                Jobs whose AWB is not taken fully
              </label>
              {awb && awb[0]?.data?.length > 0 ? (
                <BarChart
                  labels={awb && awb[0]?.label}
                  data={awb && awb[0]?.data}
                  backgroundColor="#F5C32E"
                  labelString="JOB ID"
                  beginAtZero={true}
                />
              ) : (
                <div className="data-text">
                  <Typography variant="h2"> No Data Available</Typography>
                </div>
              )}
            </div>
          </div>
          <div className="dashboard-details-inner">
            <div className="inner-white-box">
              <div className="chart-title">
                <div className="title-text">
                  <Typography variant="h2">
                    Average Loading/Unloading Duration
                  </Typography>
                </div>
              </div>
              <div className="chart-wrapper">
                <div className="chart-element">
                  <SpeedoMeterChart
                    className="loading-time"
                    needleValue={
                      state?.dashboard?.dashboardAverageData?.averageLoadingTime
                        ? state?.dashboard?.dashboardAverageData
                            ?.averageLoadingTime > 120
                          ? 120
                          : parseInt(
                              state?.dashboard?.dashboardAverageData
                                ?.averageLoadingTime
                            )
                        : 0
                    }
                  />
                  <div className="duration-text">
                    <span className="minutes">
                      {state?.dashboard?.dashboardAverageData
                        ?.averageLoadingTime
                        ? parseInt(
                            state?.dashboard?.dashboardAverageData
                              ?.averageLoadingTime
                          )
                        : 0}{" "}
                      Mins
                    </span>
                    <span className="time-text">Loading Time</span>
                  </div>
                </div>
                <div className="chart-element">
                  <SpeedoMeterChart
                    className="unloading-time"
                    needleValue={
                      state?.dashboard?.dashboardAverageData
                        ?.averageUnloadingTime !== null
                        ? state?.dashboard?.dashboardAverageData
                            ?.averageUnloadingTime > 120
                          ? 120
                          : parseInt(
                              state?.dashboard?.dashboardAverageData
                                ?.averageUnloadingTime
                            )
                        : 0
                    }
                  />
                  <div className="duration-text">
                    <span className="minutes">
                      {state?.dashboard?.dashboardAverageData
                        ?.averageUnloadingTime
                        ? parseInt(
                            state?.dashboard?.dashboardAverageData
                              ?.averageUnloadingTime
                          )
                        : 0}{" "}
                      Mins
                    </span>
                    <span className="time-text">Unloading Time</span>
                  </div>
                </div>
              </div>
              <div className="chart-footer-content">
                <div className="chart-info">
                  <div className="chart-info-inner">
                    <span className="dark-green-text">&lt;30</span>
                    <span className="green-text">30-45</span>
                    <span className="light-green-text">45-60</span>
                    <span className="yellow-text">60-90</span>
                    <span className="light-red-text">90-120</span>
                    <span className="dark-red-text">&gt;120</span>
                  </div>
                </div>
                <p>(In Minutes)</p>
              </div>
            </div>
          </div>
          <div className="dashboard-details-inner jobStatusBar">
            <div className="inner-white-box">
              <div className="chart-title">
                <div className="title-text">
                  <Typography variant="h2">
                    Job Status{" "}
                    <span>
                      ({state?.dashboard?.jobDriverData?.jobStatus?.count} Jobs)
                    </span>
                  </Typography>
                </div>
              </div>
              {jobStatus &&
              jobStatus[0]?.data?.every((item) => item === 0) === true ? (
                <div className="data-text">
                  <Typography variant="h2"> No Data Available</Typography>
                </div>
              ) : (
                <div className="chart-wrapper">
                  <HorizontalBarChartStatus
                    data={jobStatus && jobStatus[0]}
                    handleRedirection={(val) =>
                      props.handleRedirection("JOBS_STATUS_REDIRECTION", val)
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="two-coloumn-block">
          <div
            className="dashboard-details-inner"
            onClick={() => props.handleRedirectionDriver("FATIGUE_FILTER", 2)}
          >
            <div className="inner-white-box">
              <div className="chart-title">
                <div className="title-text">
                  <Typography variant="h2">
                    Drivers whose timesheets are not approved
                  </Typography>
                </div>
              </div>
              {driverTimeSheet && driverTimeSheet[0]?.data?.length > 0 ? (
                <>
                  <div className="chart-wrapper">
                    <MultiColorBarChart
                      data={driverTimeSheet && driverTimeSheet[0]}
                      max={10}
                    />
                  </div>

                  <div className="chart-footer-content">
                    <div className="chart-info">
                      <div className="chart-info-inner">
                        <span className="sydney-text">Sydney</span>
                        <span className="melbourn-text">Melbourne</span>
                        <span className="brisbane-text">Brisbane</span>
                        <span className="auckland-text">Auckland</span>
                      </div>
                    </div>
                    <p>(Cities)</p>
                  </div>
                </>
              ) : (
                <div className="data-text">
                  <Typography variant="h2"> No Data Available</Typography>
                </div>
              )}
            </div>
          </div>
          <div
            className="dashboard-details-inner"
            onClick={() => props.handleRedirectionDriver("FATIGUE_FILTER", 1)}
          >
            <div className="inner-white-box">
              <div className="chart-title">
                <div className="title-text">
                  <Typography variant="h2"> Fatigue Management</Typography>
                </div>
              </div>
              {fatigue && fatigue[0]?.data?.length > 0 ? (
                <>
                  <div className="chart-wrapper">
                    <MultiColorBarChart data={fatigue && fatigue[0]} max={10} />
                  </div>
                  <div className="chart-footer-content">
                    <div className="chart-info">
                      <div className="chart-info-inner">
                        <span className="sydney-text">Sydney</span>
                        <span className="melbourn-text">Melbourne</span>
                        <span className="brisbane-text">Brisbane</span>
                        <span className="auckland-text">Auckland</span>
                      </div>
                    </div>
                    <p>(Cities)</p>
                  </div>
                </>
              ) : (
                <div className="data-text">
                  <Typography variant="h2"> No Data Available</Typography>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="three-coloumn-block">
          <div className="dashboard-details-inner nospace-wrapper">
            <div className="inner-white-box">
              {jobCharge?.every((item) => item === 0) === true ? (
                <div className="data-text-2">
                  <Typography variant="h2"> No Data Available</Typography>
                </div>
              ) : (
                <div className="chart-wrapper">
                  <PieChart
                    labels={[
                      "Jobs without any job charge",
                      "Jobs with review not completed",
                      "Jobs not accepted by driver",
                    ]}
                    data={jobCharge}
                    backgroundColor={[
                      colors.darkRed,
                      colors.yellow,
                      colors.darkBlue,
                    ]}
                  />
                </div>
              )}

              <div className="chart-content-wrapper">
                <ul className="chart-info">
                  <li>
                    <span
                      className="red-text chart-info-dot"
                      onClick={() =>
                        props.handleRedirection("JOBS_GRAPH_FILTER", 3)
                      }
                    >
                      Jobs without any job charge
                    </span>
                    <span className="text">
                      {
                        state?.dashboard?.dashboardTimeover
                          ?.jobWithoutChargeAndStatus?.jobWithoutCharges
                      }
                    </span>
                  </li>
                  <li>
                    <span
                      className="yellow-text chart-info-dot"
                      onClick={() =>
                        props.handleRedirection("JOBS_GRAPH_FILTER", 4)
                      }
                    >
                      Jobs with review not completed
                    </span>
                    <span className="text">
                      {
                        state?.dashboard?.dashboardTimeover
                          ?.jobWithoutChargeAndStatus?.jobReviewNotCompleted
                      }
                    </span>
                  </li>
                  <li>
                    <span
                      className="primary-color-text chart-info-dot"
                      onClick={() =>
                        props.handleRedirection("JOBS_GRAPH_FILTER", 5)
                      }
                    >
                      Jobs not accepted by driver
                    </span>
                    <span className="text">
                      {
                        state?.dashboard?.dashboardTimeover
                          ?.jobWithoutChargeAndStatus?.jobNotAcceptedByDriver
                      }
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="dashboard-details-inner nospace-wrapper">
            <div className="inner-white-box">
              {invoice?.every((item) => item === 0) === true ? (
                <div className="data-text-2">
                  <Typography variant="h2"> No Data Available</Typography>
                </div>
              ) : (
                <div className="chart-wrapper">
                  <PieChart
                    labels={[
                      "Draft Invoices Rejected",
                      "Draft Invoices Pending",
                    ]}
                    data={invoice}
                    backgroundColor={[colors.darkRed, colors.darkBlue]}
                  />
                </div>
              )}

              <div className="chart-content-wrapper ">
                <ul className="chart-info">
                  <li>
                    <span
                      className="red-text chart-info-dot"
                      onClick={() => props.handleRedirectionInvoice("Rejected")}
                    >
                      Draft Invoices Rejected
                    </span>
                    <span className="text">
                      {
                        state?.dashboard?.dashboardTimeover?.invoiceStatus
                          ?.rejected
                      }
                    </span>
                  </li>
                  <li>
                    <span
                      className="primary-color-text chart-info-dot"
                      onClick={() => props.handleRedirectionInvoice("Draft")}
                    >
                      Draft Invoices Pending
                    </span>
                    <span className="text">
                      {
                        state?.dashboard?.dashboardTimeover?.invoiceStatus
                          ?.pending
                      }
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="dashboard-details-inner"
            onClick={() => props.handleRedirection("JOBS_GRAPH_FILTER", 7)}
          >
            <div className="inner-white-box">
              <div className="chart-title">
                <div className="title-text">
                  <Typography variant="h2">
                    {" "}
                    Parent Accounts with Missing Child Account for Existing Jobs
                  </Typography>
                </div>
              </div>
              {jobWithoutChild && jobWithoutChild[0]?.data?.length > 0 ? (
                <div className="chart-wrapper">
                  <BarChart
                    labels={jobWithoutChild && jobWithoutChild[0]?.labels}
                    data={jobWithoutChild && jobWithoutChild[0]?.data}
                    backgroundColor="#27AE60"
                    labelString="Customers"
                    stepSize={5}
                    beginAtZero={true}
                  />
                </div>
              ) : (
                <div className="data-text-2">
                  <Typography variant="h2"> No Data Available</Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChartBox;
