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
import { convertMinutesToHours } from "@utils/commonFunctions";
import { routes } from "@utils/constant";
import { TableStyle } from "./style";

function TableListing() {
  const classes = TableStyle();
  const [state] = useStore();
  return (
    <>
      <div className={classes.TableWrapper}>
        <Loader loading={state?.driver?.loadingDriverRunsheet} />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="date">Date</TableCell>
                <TableCell className="jobs">Jobs</TableCell>
                <TableCell className="total-time-worked">
                  Total Time Worked
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.driver?.driverRunsheetData?.count === 0 ? (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.driver?.driverRunsheetData?.rows?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="date">{item.workDate}</TableCell>
                      <TableCell className="jobs">
                        {item.jobs
                          ? item.jobs?.split(",").map((item) => {
                              return (
                                <Link to={`${routes.jobDetail}/${item}`}>
                                  {" "}
                                  {item}
                                </Link>
                              );
                            })
                          : "-"}
                      </TableCell>
                      <TableCell className="total-time-worked">
                        {item.workTime
                          ? convertMinutesToHours(item.workTime)
                          : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default TableListing;
