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
                <TableCell className="id">Credit Note Number</TableCell>
                <TableCell className="child-customer">Child customer</TableCell>
                <TableCell className="organisation">Organisation</TableCell>
                <TableCell className="date">Date</TableCell>
                <TableCell className="descripition">Description</TableCell>
                <TableCell className="amount">Amount</TableCell>
                <TableCell className="edit-link"></TableCell>
                <TableCell className="delete-link"></TableCell>
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
                    <TableCell
                      className="id"
                      onClick={() => props.handleOpenPreview(item)}
                    >
                      {item.creditNoteNumber || "-"}
                    </TableCell>
                    <TableCell className="child-customer">
                      {item.childCustomers?.name || "-"}{" "}
                    </TableCell>
                    <TableCell className="organisation">
                      {item.childOrganisations?.name || "-"}{" "}
                    </TableCell>
                    <TableCell className="date">{item.date || "-"}</TableCell>
                    <TableCell className="descripition">
                      {item.description || "-"}
                    </TableCell>
                    <TableCell className="amount">
                      {item.amount || "-"}
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
