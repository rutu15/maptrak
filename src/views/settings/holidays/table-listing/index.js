import React from "react";
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
import { TableStyle } from "./style";

function TableListing(props) {
  const [state] = useStore();
  const classes = TableStyle();

  return (
    <>
      <div className={classes.TableWrapper}>
        <Loader loading={state?.holidays.loadingHolidays} />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table
            className="account-data-table"
            aria-label="simple table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell className="date">Date</TableCell>
                <TableCell className="name">Name</TableCell>
                <TableCell className="city">City</TableCell>
                <TableCell className="type">Type</TableCell>
                <TableCell className="edit-link"></TableCell>
                <TableCell className="delete-link"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.holidays?.holidaysData?.count === 0 ? (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.holidays?.holidaysData?.rows?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="details">{item.date}</TableCell>
                    <TableCell className="latitude">{item.name}</TableCell>
                    <TableCell className="longitude">
                      {item.cities.name}
                    </TableCell>
                    <TableCell className="longitude">
                      {item.type === "1" ? "Holiday 1" : "Holiday 2"}
                    </TableCell>
                    <TableCell className="edit-link">
                      <span onClick={() => props.handleEdit(item)}>Edit</span>
                    </TableCell>
                    <TableCell className="delete-link">
                      <span onClick={() => props.handleOpen(item)}>Delete</span>
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
