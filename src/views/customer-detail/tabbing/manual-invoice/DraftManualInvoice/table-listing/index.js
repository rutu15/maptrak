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

import { TableStyle } from "./style";
import { useStore } from "@store/store";

function TableListing(props) {
  const [state] = useStore();
  const classes = TableStyle();

  return (
    <>
      <div className={classes.TableWrapper}>
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="child-customer">Child customer</TableCell>
                <TableCell className="organization">Organization</TableCell>
                <TableCell className="date">Invoice date</TableCell>
                <TableCell className="amount">Gross Amount</TableCell>
                <TableCell className="approve-link"></TableCell>
                <TableCell className="reject-link"></TableCell>
                <TableCell className="view-link"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.customer?.creditNoteData?.count === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.customer?.creditNoteData?.rows?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="child-customer">
                      {item.childCustomers?.name || "-"}{" "}
                    </TableCell>
                    <TableCell className="organisation">
                      {item.childOrganisations?.name || "-"}{" "}
                    </TableCell>
                    <TableCell className="date">{item.date || "-"}</TableCell>
                    <TableCell className="amount">
                      {item.amount || "-"}
                    </TableCell>
                    <TableCell className="approve-link">
                      <span>Approve</span>
                    </TableCell>
                    <TableCell className="reject-link">
                      <span>Reject</span>
                    </TableCell>
                    <TableCell className="view-link">
                      <span>View</span>
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
