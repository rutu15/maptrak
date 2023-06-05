import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@material-ui/core";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import { AddPopupStyle } from "./style";

function Popup(props) {
  const classes = AddPopupStyle();
  const [scroll] = useState("body");
  const [state] = useStore();

  return (
    <>
      <Dialog open={props.open} className={classes.customModal} scroll={scroll}>
        <div className="close-modal">
          <img src={closeIcon} alt="Close" onClick={props.handleClose} />
        </div>
        <DialogTitle>Not Approved Timesheet(s)</DialogTitle>
        <div className={classes.TableWrapper}>
          <TableContainer component={Paper} className={classes.customTable}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="date">Date</TableCell>
                  <TableCell className="action">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state?.driver?.notApprovedTimesheetData?.count === 0 ? (
                  <TableRow colspan={2}>
                    <TableCell className="date">No Data Found</TableCell>
                  </TableRow>
                ) : (
                  state?.driver?.notApprovedTimesheetData?.map(
                    (item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="date">{item}</TableCell>
                          <TableCell className="action">
                            <Button
                              className="primary-btn orange-btn"
                              color="inherit"
                              disableElevation
                              onClick={() => props.handleViewDate(item)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Dialog>
    </>
  );
}
export default Popup;
