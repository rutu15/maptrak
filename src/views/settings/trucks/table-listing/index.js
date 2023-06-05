import React from "react";
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
import Loader from "@components/loader";
import { truckHeading } from "@utils/constant";
import { TableStyle } from "./style";

function TruckTable(props) {
  const [state] = useStore();
  const classes = TableStyle();
  return (
    <>
      <div className={classes.TableWrapper}>
        <Loader
          loading={
            state?.trucks.loadingTrucks || state?.trucks?.importingTruckCsv
          }
        />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table
            className="account-data-table"
            aria-label="simple table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                {/* https://wymap.atlassian.net/browse/MAPTRAK-929  added sorting*/}
                {truckHeading?.map((item, index) => {
                  return (
                    <TableCell className={item.className} key={index}>
                      {item.title}
                      {item.sort && (
                        <TableSortLabel
                          direction={
                            props.orderBy
                              ? props.orderBy === item.sortTitle
                                ? props.order
                                : "desc"
                              : item.sortTitle === "city"
                              ? "asc"
                              : "desc"
                          }
                          active={true}
                          onClick={(e) => props.handleSorting(e, item)}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.trucks?.trucksData?.count === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.trucks?.trucksData?.rows?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="edit-link">
                      <span onClick={() => props.handleEdit(item)}>Edit</span>
                    </TableCell>
                    <TableCell className="truck">
                      {item.truckName ? item.truckName : "-"}
                    </TableCell>
                    <TableCell className="vehical-number">
                      {item.vehicleNumber ? item.vehicleNumber : "-"}
                    </TableCell>
                    <TableCell className="rego-number">
                      {item.rego ? item.rego : "-"}
                    </TableCell>
                    <TableCell className="fleet">
                      {item.fleet ? item.fleet : "-"}
                    </TableCell>
                    <TableCell className="truck-type">
                      {item.truckType ? item.truckType?.name : "-"}
                    </TableCell>
                    <TableCell className="city">
                      {item.truckCities ? item.truckCities.name : "-"}
                    </TableCell>
                    <TableCell className="rego-date">
                      {item.registrationDueDate
                        ? item.registrationDueDate
                        : "-"}
                    </TableCell>
                    <TableCell className="service-date">
                      {item.serviceDueDate ? item.serviceDueDate : "-"}
                    </TableCell>
                    <TableCell className="delete-link">
                      <span onClick={() => props.handleOpen(item)}>Delete</span>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default TruckTable;
