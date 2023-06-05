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
  TableSortLabel,
} from "@material-ui/core";

import { useStore } from "@store/store";
import Pagination from "@components/pagination";
import Loader from "@components/loader";
import { driverListingHeader, routes } from "@utils/constant";
import { convertMinutesToHours } from "@utils/commonFunctions";
import { TableStyle } from "./style";

function TableListing(props) {
  const classes = TableStyle();
  const [state] = useStore();
  return (
    <>
      <div className={classes.TableWrapper}>
        <Loader
          loading={
            state.driver?.gettingDrivers || state.driver?.importingDriverCSV
          }
        />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                {driverListingHeader.map((item, index) => {
                  return (
                    <TableCell key={index} className={item.className}>
                      {item.title}
                      {item.sort && (
                        <TableSortLabel
                          direction={
                            props.orderBy === item.sortTitle
                              ? props.order
                              : item.orderByField
                          }
                          active={true}
                          onClick={(e) => props.handleSorting(e, item)}
                        ></TableSortLabel>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {state.driver?.getDriversData?.count === 0 ? (
                <TableRow className="no-data">
                  <TableCell colSpan={7}>
                    <span>No Data Found</span>
                  </TableCell>
                </TableRow>
              ) : (
                state.driver.getDriversData?.rows?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="driverName">
                        <Link to={`${routes.driverDetail}/${item.id}`}>
                          {item.name ? item.name : "-"}
                        </Link>
                      </TableCell>
                      <TableCell className="city">
                        {item.cityName ? item.cityName : "-"}
                      </TableCell>
                      <TableCell className="employeeNumber">
                        {item.employeeNumber ? item.employeeNumber : "-"}
                      </TableCell>
                      <TableCell className="contact">
                        {item.phone ? item.phone : "-"}
                      </TableCell>
                      <TableCell className="driverType">
                        {item.driverTypeName ? item.driverTypeName : "-"}
                      </TableCell>
                      <TableCell className="licenseType">
                        {item.licenseTypeName ? item.licenseTypeName : "-"}
                      </TableCell>
                      <TableCell className="asicType">
                        {item.asicTypeName ? item.asicTypeName : "-"}
                      </TableCell>
                      <TableCell className="workingTimeToday">
                        {item.totalWorkTime === null
                          ? 0
                          : convertMinutesToHours(item.totalWorkTime)}
                      </TableCell>
                      <TableCell
                        className={
                          parseInt(
                            convertMinutesToHours(
                              item.continuousWorkingTime
                            ).split(":")[0]
                          ) >= 6
                            ? "continiousWorkingTime maxTime"
                            : ""
                        }
                      >
                        <span>
                          {item.continuousWorkingTime === null
                            ? 0
                            : convertMinutesToHours(item.continuousWorkingTime)}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {state.driver?.getDriversData?.count !== 0 && (
          <div className="pagination-wrapper">
            <Pagination
              count={state.driver?.getDriversData?.count}
              page={props.page}
              handleChangePage={props.handleChangePage}
              rowsPerPage={props.rowsPerPage}
              handleChangeRowsPerPage={props.handleChangeRowsPerPage}
            />
          </div>
        )}
      </div>
    </>
  );
}
export default TableListing;
