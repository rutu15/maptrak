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
import { TableStyle } from "./style";

function TollTable(props) {
  const classes = TableStyle();
  const [state] = useStore();
  return (
    <>
      <div className={classes.TableWrapper}>
        <TableContainer component={Paper} className={classes.customTable}>
          <Table
            className="account-data-table"
            aria-label="simple table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell className="tolls">Tolls</TableCell>
                <TableCell className="charge">Charge</TableCell>
                <TableCell className="edit-link"></TableCell>
                <TableCell className="delete-link"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!state?.job?.jobTollChargeData?.length ? (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.job?.jobTollChargeData?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="tolls">
                        {item.tollLocations?.address}
                      </TableCell>
                      <TableCell className="charge">{item.charge}</TableCell>
                      {/* <TableCell className="edit-link">
                      <span onClick={() => props.handleEdit(item)}>Edit</span>
                    </TableCell> */}
                      <TableCell className="delete-link">
                        <span onClick={() => props.handleOpen(item)}>
                          Delete
                        </span>
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
export default TollTable;
