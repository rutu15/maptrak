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
import Pagination from "@components/pagination";
import { TableStyle } from "./style";

function TableListing(props) {
  const [state] = useStore();
  const classes = TableStyle();
  return (
    <>
      <div className={classes.TableWrapper}>
        <Loader loading={state?.tollLocation.loading} />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table
            className="account-data-table"
            aria-label="simple table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell className="address">Address</TableCell>
                <TableCell className="latitude">Latitude</TableCell>
                <TableCell className="longitude">Longitude</TableCell>
                <TableCell className="cost">Cost</TableCell>
                <TableCell className="edit-link"></TableCell>
                <TableCell className="delete-link"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.tollLocation?.tollLocations?.count === 0 ? (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.tollLocation?.tollLocations?.rows?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="address">{item.address}</TableCell>
                    <TableCell className="latitude">{item.latitude}</TableCell>
                    <TableCell className="longitude">
                      {item.longitude}
                    </TableCell>
                    <TableCell className="cost">{item.price}</TableCell>
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
        {state?.tollLocation?.tollLocations?.count !== 0 && (
          <div className="pagination-wrapper">
            <Pagination
              count={state?.tollLocation?.tollLocations?.count}
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
