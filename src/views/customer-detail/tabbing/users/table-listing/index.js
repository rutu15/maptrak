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
import { tableStyles } from "./style";

function TableListing(props) {
  const [state] = useStore();
  const classes = tableStyles();
  return (
    <>
      <div className={classes.tableWrapper}>
        <Loader loading={state?.customer.loadingCustomerUser} />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="name">Name</TableCell>
                <TableCell className="email">Email</TableCell>
                <TableCell className="phone">Phone</TableCell>
                <TableCell className="edit-link"></TableCell>
                <TableCell className="delete-link"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.customer?.customeruserData?.count === 0 ? (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.customer?.customeruserData?.rows?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="name">{item.name} </TableCell>
                    <TableCell className="email">{item.email}</TableCell>
                    <TableCell className="phone">{item.phone}</TableCell>
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
