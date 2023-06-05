import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import { customerDetailJobsHeader, routes } from "@utils/constant";
import {
  dashboardRequestStatusColors,
  convertMinutesToHours,
  utcToTimezone,
} from "@utils/commonFunctions";
import { tableStyles } from "./style";

function TableListing() {
  const classes = tableStyles();
  const [state] = useStore();

  return (
    <>
      <div className={classes.tableWrapper}>
        <Loader loading={state.customer.loadingCustomerJobs} />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                {customerDetailJobsHeader.map((item, index) => {
                  return (
                    <TableCell key={index} className={item.className}>
                      {item.title}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {state.customer.customerJobs?.count === 0 ? (
                <TableRow>
                  <TableCell colSpan={9}>No Data Found</TableCell>
                </TableRow>
              ) : (
                state.customer.customerJobs?.rows?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="jobId">
                      <Link to={`${routes.jobDetail}/${item.id}`}>
                        {item.id}
                      </Link>
                    </TableCell>
                    <TableCell className="date">
                      {item.createdAt
                        ? utcToTimezone(
                            item.createdAt,
                            item.cities?.timezone,
                            "DD/MM/YYYY"
                          )
                        : ""}
                    </TableCell>
                    <TableCell className="truck-rego">
                      {item.trucks ? item.trucks.rego : "-"}
                    </TableCell>
                    <TableCell className="driver">
                      {item.drivers ? item.drivers.name : "-"}
                    </TableCell>
                    <TableCell className="jobType">
                      {item.jobTypes ? item.jobTypes.name : "-"}
                    </TableCell>
                    <TableCell className="totalWeight">
                      {item.weight ? item.weight : 0}
                    </TableCell>
                    <TableCell className="totalPieces">
                      {item.quantity ? item.quantity : 0}
                    </TableCell>
                    <TableCell className="duration">
                      {item.totalDuration
                        ? convertMinutesToHours(item.totalDuration)
                        : "-"}
                    </TableCell>
                    <TableCell
                      className={`status ${dashboardRequestStatusColors(
                        item.jobStatuses.name
                      )}`}
                    >
                      <span>{item.jobStatuses.name}</span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default TableListing;
