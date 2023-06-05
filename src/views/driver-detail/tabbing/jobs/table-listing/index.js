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
import {
  dashboardRequestStatusColors,
  utcToTimezone,
} from "@utils/commonFunctions";
import { routes } from "@utils/constant";
import { TableStyle } from "./style";

function TableListing() {
  const classes = TableStyle();
  const [state] = useStore();
  return (
    <>
      <div className={classes.TableWrapper}>
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="jobId">Job ID</TableCell>
                <TableCell className="date">Date</TableCell>
                <TableCell className="completion-date">
                  Completion Date
                </TableCell>
                <TableCell className="truck-rego">Truck Rego</TableCell>
                <TableCell className="jobType">Job Type</TableCell>
                <TableCell className="status">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.driver.driverJobsData?.count === 0 ? (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              ) : (
                state.driver.driverJobsData?.rows?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="jobId">
                      <Link to={`${routes.jobDetail}/${item.id}`}>
                        {item.id ? item.id : "-"}
                      </Link>
                    </TableCell>
                    <TableCell className="date">
                      {item.createdAt
                        ? utcToTimezone(
                            item.createdAt,
                            item.cities?.timezone,
                            "DD/MM/YYYY"
                          )
                        : "-"}
                    </TableCell>
                    <TableCell className="completion-date">
                      {" "}
                      {item.completedAt
                        ? utcToTimezone(
                            item.completedAt,
                            item.cities?.timezone,
                            "DD/MM/YYYY"
                          )
                        : "-"}
                    </TableCell>
                    <TableCell className="truck-rego">
                      {item.trucks ? item.trucks.rego : "-"}
                    </TableCell>
                    <TableCell className="jobType">
                      {item.jobTypes ? item.jobTypes.name : "-"}
                    </TableCell>
                    <TableCell
                      className={`status ${dashboardRequestStatusColors(
                        item.jobStatuses ? item.jobStatuses?.name : ""
                      )}`}
                    >
                      <span>
                        {item.jobStatuses ? item.jobStatuses.name : "-"}
                      </span>
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
