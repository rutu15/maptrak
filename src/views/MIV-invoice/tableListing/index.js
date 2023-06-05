import React from "react";
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

import { useStore } from "@store/store";
import Pagination from "@components/pagination";
import { mivInvoiceHeading } from "@utils/constant";
import Row from "./row";
import { TableStyle } from "./style";

function TableListing(props) {
  const classes = TableStyle();
  const [state] = useStore();

  return (
    <div className={classes.TableWrapper}>
      <TableContainer component={Paper} className={classes.customTable}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {mivInvoiceHeading?.map((item, index) => {
                return (
                  <TableCell className={item.className} key={index}>
                    {item.title}
                    {item.sort && (
                      <TableSortLabel
                        direction={
                          props.orderBy
                            ? props.orderBy === item.sortTitle
                              ? props.order
                              : "desc"
                            : item.sortTitle === "city"
                            ? "asc"
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
          {state?.invoice?.mivInvoiceData?.count === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell>No Data Found</TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {state?.invoice?.mivInvoiceData?.rows?.map((row, id) => {
                return (
                  <Row
                    key={id}
                    row={row}
                    data={state?.invoice?.mivInvoiceData?.rows}
                    index={id}
                    handleAssign={props.handleAssign}
                    handleDone={props.handleDone}
                    search={props.search}
                  />
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {state?.invoice?.mivInvoiceData?.count !== 0 && (
        <div className="pagination-wrapper">
          <Pagination
            count={state?.invoice?.mivInvoiceData?.count}
            page={props.page}
            handleChangePage={props.handleChangePage}
            rowsPerPage={props.rowsPerPage}
            handleChangeRowsPerPage={props.handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  );
}

export default TableListing;
