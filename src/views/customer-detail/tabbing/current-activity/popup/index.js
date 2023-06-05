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
  TableFooter,
  CircularProgress,
} from "@material-ui/core";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import { routes } from "@utils/constant";
import { AddPopupStyle } from "./style";

function Popup(props) {
  const classes = AddPopupStyle();
  const [scroll] = useState("body");
  const [state] = useStore();

  const handleClick = (item) => {
    window.open(`${routes.invoiceDetail}/${item.id}`, "_blank");
  };

  return (
    <>
      <Dialog open={props.open} className={classes.customModal} scroll={scroll}>
        <div className="close-modal">
          <img src={closeIcon} alt="Close" onClick={props.handleClose} />
        </div>
        <DialogTitle>Review Invoice</DialogTitle>
        <div className={classes.TableWrapper}>
          <TableContainer component={Paper} className={classes.customTable}>
            {state?.customer?.previewData?.map((item, index) => {
              return (
                <Table stickyHeader aria-label="simple table" key={index}>
                  <TableHead>
                    <TableRow>
                      <TableCell className="role-name">
                        {`Start date: ${item.startDate}`}
                      </TableCell>
                      <TableCell className="status">
                        {" "}
                        {`End date: ${item.endDate}`}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item.childInvoice?.map((itm, key) => {
                      return (
                        <TableRow key={key}>
                          <TableCell className="role-name">
                            {itm?.customers?.name}
                          </TableCell>
                          <TableCell className="status">
                            <span onClick={() => handleClick(itm)}
                              className={itm.isManual ? "textRedBg" : "textblueBg"}>
                              {" "}
                              {itm.invoiceNumber ? itm.invoiceNumber : "TBA"}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}

                    {/* Update label of button https://wymap.atlassian.net/browse/MAPTRAK-867 */}
                    {item?.invoiceStatuses?.name === "Init" && (
                      <TableFooter>
                        <div style={{display: "flex", justifyContent:"space-between", width: "100%"}}>
                        <Button
                          className="orange-btn primary-btn"
                          color="inherit"
                          disableElevation
                          underlinenone="true"
                          onClick={() => props.handleSendApproval(item.id)}
                          disabled={
                            props.sentSingleId === item.id ||
                            props.rejectedId.includes(item.id) ||
                            props.sentId.includes(item.id)
                          }
                        >
                          {state.customer.sendingInvoiceForApproval &&
                          props.sentSingleId === item.id ? (
                            <CircularProgress color="inherit" />
                          ) : (props.sentId.includes(item.id) && !props.rejectedId.includes(item.id)) ? (
                            "Invoice Sent"
                          ) : (
                            "Send Draft Invoice For Approval"
                          )}
                        </Button>
                        <Button
                          className="orange-btn primary-btn"
                          style={{marginLeft: "10px"}}
                          color="inherit"
                          disableElevation
                          underlinenone="true"
                          onClick={() => props.handleReject([item.id], item.id)}
                          disabled={
                            props.sentSingleId === item.id ||
                            props.sentId.includes(item.id) ||
                            props.rejectedId.includes(item.id)
                          }
                        >
                          {state.invoice.rejectingInvoice &&
                          props.sentSingleId === item.id ? (
                            <CircularProgress color="inherit" />
                          ) : (!props.sentId.includes(item.id) && props.rejectedId.includes(item.id)) ? (
                            "Reject"
                          ) : (
                            "Reject"
                          )}
                        </Button>
                        </div>
                      </TableFooter>
                    )}
                  </TableBody>
                </Table>
              );
            })}
          </TableContainer>
        </div>
      </Dialog>
    </>
  );
}
export default Popup;
