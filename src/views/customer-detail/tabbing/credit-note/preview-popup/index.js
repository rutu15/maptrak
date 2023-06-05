// import React, { useState } from "react";
// import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";

// import closeIcon from "@assets/images/close.svg";
// import image from "@assets/images/bg-image.jpg";
// import { invoiceDetailStyle } from "./style";

// function Popup(props) {
//   const classes = invoiceDetailStyle();
//   const [scroll] = useState("body");

//   return (
//     <>
//       <Dialog open={props.open} className={classes.customModal} scroll={scroll}>
//         <div className="close-modal">
//           <img src={closeIcon} alt="Close" onClick={props.handleClose} />
//         </div>
//         <DialogTitle>Review Credit Note</DialogTitle>
//         <div className={classes.invoiceDetailWrapper}>
//           <div className="invoice-detail-page wrapper">
//             <div className="inner-page">
//               <div className="invoice-detail-wrapper">
//                 <div className="content-wrapper">
//                   <div className="header">
//                     <div className="top-header clearfix">
//                       <div className="logo">
//                         <img src={image} alt="logo" />
//                       </div>
//                       <div className="middle-title">
//                         <h1>Credit Note</h1>
//                         <p>8000000003</p>
//                       </div>
//                       <div className="right-block">
//                         <p>
//                           <span>Date:</span>
//                           <span>12/12/2020</span>
//                         </p>
//                       </div>
//                     </div>
//                     <div className="bottom-header clearfix">
//                       <div className="left-block">
//                         <p>Wymap Auckland</p>
//                         <p>
//                           Ogilvie Cresent, 02 9317 2476, Auckalnd Airport,
//                           Auckland Region, 2022
//                         </p>
//                       </div>
//                       <div className="middle-block">
//                         <p>
//                           ABN :<span>9429047216228</span>
//                         </p>
//                         <p>
//                           Phone :<a href="tel:0293175722">021 1972 2900</a>
//                         </p>
//                       </div>
//                       <div className="right-block">
//                         <p>
//                           Email :
//                           <a href="mailto:accounts@wymap.com">
//                             accounts@wymap.com
//                           </a>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="content-block">
//                     <div className="detail-block clearfix">
//                       <div className="left-block">
//                         <h2>Bill To</h2>
//                         <p>DHL GF Exports</p>
//                         <p>
//                           18 Verissimo Drive, Māngere, Auckland, New Zealand
//                         </p>
//                       </div>
//                       <div className="right-block">
//                         <div className="shipping-adress-block clearfix">
//                           <div className="inner-col first">
//                             <h2>Wymap Group EFT Details</h2>
//                             <p>BSB: 082140</p>
//                             <p>Account Number : 138 581 098</p>
//                             <p>Account Name : Wymap Pty Ltd</p>
//                             <p>Bank : National Australia Bank</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="table-responsive">
//                       <table>
//                         <p>
//                           CN Number : <span>8000000003</span>{" "}
//                         </p>
//                         <p>Date : 2021-12-17</p>
//                         <p>Amount : $1400.17</p>
//                         <p>Tax : $140.02</p>
//                         <p>Total Amount : $1540.19</p>
//                         <p>
//                           Description : Hiee demo description check
//                           sample...Hiee demo description check sample...Hiee
//                           demo description check sample...
//                         </p>
//                       </table>
//                     </div>
//                   </div>
//                   <div className="footer">
//                     <p className="querie-link">
//                       Please contact
//                       <a href="mailto:accounts@wymap.com.au">
//                         accounts@wymap.com.au
//                       </a>
//                       should you have any invoice queries.
//                     </p>
//                     <p>
//                       “All transactions with Wymap Group are subject to our
//                       standard terms and conditions unless varied by written
//                       agreement. Terms are available on request or on the
//                       relevant business website.”
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <DialogActions className="bottom-button-block">
//           <Button
//             className="primary-btn gray-border-btn"
//             color="inherit"
//             disableElevation
//             underlinenone="true"
//             onClick={props.handleClose}
//           >
//             Cancel
//           </Button>
//           <Button
//             className="orange-btn primary-btn"
//             color="inherit"
//             disableElevation
//             underlinenone="true"
//             type="submit"
//           >
//             SEND
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }
// export default Popup;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  FormControl,
  CircularProgress,
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
        <DialogTitle>Review Credit Note</DialogTitle>
        <div className={classes.TableWrapper}>
          <TableContainer component={Paper} className={classes.customTable}>
            <Table stickyHeader aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell className="role-name">Customer</TableCell>
                  <TableCell className="status">
                    {props.getPreviewData?.childCustomers?.name || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="role-name">Date</TableCell>
                  <TableCell className="status">
                    {props.getPreviewData?.date || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="role-name">Description</TableCell>
                  <TableCell className="status">
                    {props.getPreviewData?.description || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="role-name">Amount</TableCell>
                  <TableCell className="status">
                    {props.getPreviewData?.amount || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="role-name">GST</TableCell>
                  <TableCell className="status">
                    {props.getPreviewData?.tax || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="role-name">Total Amount</TableCell>
                  <TableCell className="status">
                    {props.getPreviewData?.totalAmount || "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <FormControl variant="outlined" className={classes.formControl}>
              <Button
                className="primary-btn orange-btn"
                color="inherit"
                disableElevation
                underlinenone="true"
                onClick={props.handleSubmit}
                disabled={state.customer.sendingCreditNote}
              >
                {state.customer.sendingCreditNote ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Send to customer"
                )}
              </Button>
            </FormControl>
          </TableContainer>
        </div>
      </Dialog>
    </>
  );
}
export default Popup;
