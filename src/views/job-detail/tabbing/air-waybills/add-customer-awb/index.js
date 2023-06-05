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
  Checkbox,
  FormControlLabel,
  DialogActions,
} from "@material-ui/core";

import closeIcon from "@assets/images/close.svg";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIconOrange from "@assets/images/cheked-icon-orange.svg";
import { customerDetailAWBHeader } from "@utils/constant";
import { AddPopupStyle } from "./style";

function Popup(props) {
  const classes = AddPopupStyle();
  const [scroll] = useState("body");

  return (
    <div className={classes.AddAirWayBillWrapper}>
      <Button
        className="orange-btn primary-btn"
        color="inherit"
        disableElevation
        underlinenone="true"
        onClick={props.handleClickOpen}
      >
        + Add Customer AWB
      </Button>
      <Dialog open={props.open} className={classes.customModal} scroll={scroll}>
        <div className="close-modal">
          <img src={closeIcon} alt="Close" onClick={props.handleClose} />
        </div>
        <DialogTitle>Add Customer AWB</DialogTitle>
        <div className={classes.tableWrapper}>
          <TableContainer component={Paper} className={classes.customTable}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="check">
                    <FormControlLabel
                      className="custom-checkbox"
                      control={
                        <Checkbox
                          icon={<img src={uncheckedIcon} alt="CheckBox" />}
                          checkedIcon={
                            <img src={checkedIconOrange} alt="CheckBox" />
                          }
                          onChange={(e) => props.handleMainChange(e)}
                          checked={props._maincheck}
                          name="check"
                        />
                      }
                    />
                  </TableCell>
                  {customerDetailAWBHeader.map((item, index) => {
                    return (
                      <TableCell key={index} className={item.className}>
                        {item.title}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {props?.data?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="check">
                      <FormControlLabel
                        className="custom-checkbox"
                        control={
                          <Checkbox
                            key={index}
                            icon={<img src={uncheckedIcon} alt="CheckBox" />}
                            checkedIcon={
                              <img src={checkedIconOrange} alt="CheckBox" />
                            }
                            checked={props.data[index]?._rowChecked === true}
                            name="check"
                            onChange={() => props.handleChange(item)}
                          />
                        }
                      />
                    </TableCell>
                    <TableCell className="awb">{item.awb}</TableCell>
                    <TableCell className="airline">{item.airline}</TableCell>
                    <TableCell className="weight">{item.weight}</TableCell>
                    <TableCell className="quantity">{item.qty}</TableCell>
                    <TableCell className="readyDate">
                      {item.readyDate}
                    </TableCell>
                    <TableCell className="readyTime">
                      {item.readyTime}
                    </TableCell>
                    <TableCell className="cutOffTime">
                      {item.cutoffTime}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <DialogActions className="bottom-button-block">
          <Button
            className="primary-btn gray-border-btn"
            color="inherit"
            disableElevation
            underlinenone="true"
            onClick={props.handleClose}
          >
            CANCEL
          </Button>

          <Button
            className="orange-btn primary-btn"
            color="inherit"
            disableElevation
            underlinenone="true"
            type="submit"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Popup;
