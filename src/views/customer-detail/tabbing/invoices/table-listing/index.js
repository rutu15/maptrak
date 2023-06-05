import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@material-ui/core";
import moment from "moment";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import { customerDetailInvoiceHeader, routes } from "@utils/constant";
import { tableStyles } from "./style";

function TableListing(props) {
  const classes = tableStyles();
  const [state] = useStore();
  return (
    <>
      <div className={classes.tableWrapper}>
        <Loader loading={state.customer.loadingCustomerInvoices} />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                {customerDetailInvoiceHeader.map((item, index) => {
                  return (
                    <TableCell key={index} className={item.className}>
                      {item.title}
                      {item.sort && (
                        <TableSortLabel
                          direction={
                            props.orderBy === item.sortTitle
                              ? props.order
                              : "desc"
                          }
                          active={true}
                          onClick={(e) => props.handleSorting(e, item)}
                        ></TableSortLabel>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {state.customer.customerInvoices?.count === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No Data Found</TableCell>
                </TableRow>
              ) : (
                state.customer.customerInvoices?.rows?.map((item, index) => (
                  <TableRow key={index}>
                    {/* https://wymap.atlassian.net/browse/MAPTRAK-935 Added link */}
                    <TableCell className="invoice">
                      <Link to={`${routes.invoiceDetail}/${item.id}`}>
                        {item.invoiceNumber ? item.invoiceNumber : "-"}
                      </Link>
                    </TableCell>
                    <TableCell className="date">
                      {" "}
                      {item.invoiceDate
                        ? moment(item.invoiceDate).format("DD/MM/YYYY")
                        : "-"}
                    </TableCell>
                    <TableCell className="total-weight">
                      {item.totalWeight ? item.totalWeight + " Kg" : 0}
                    </TableCell>
                    <TableCell className="total-quantity">
                      {item.totalQty ? item.totalQty : 0}
                    </TableCell>
                    <TableCell className="nett">
                      {item.net ? "$" + item.net : "-"}
                    </TableCell>
                    <TableCell className="tax">
                      {item.tax ? "$" + item.tax : "-"}
                    </TableCell>
                    <TableCell className="gross">
                      {item.gross ? "$" + item.gross : "-"}
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
