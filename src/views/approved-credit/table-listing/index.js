import React, { useState } from "react";
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

import Pagination from "@components/pagination";
import { creditHeader } from "@utils/constant";
import { TableStyle } from "./style";

function TableListing(props) {
  const classes = TableStyle();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("customerName");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSorting = (event, property) => {
    const isAsc = orderBy === property.title && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property.title);
  };

  return (
    <>
      <div className={classes.TableWrapper}>
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                {creditHeader.map((item, index) => {
                  return (
                    <TableCell key={index} className={item.className}>
                      {item.title}
                      {item.sort && (
                        <TableSortLabel
                          direction={orderBy === item.title ? order : "desc"}
                          active={true}
                          onClick={(e) => handleSorting(e, item)}
                        ></TableSortLabel>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="childAccount">
                    {row.childAccount}
                  </TableCell>
                  <TableCell className="parenAccount">
                    {row.parentAccount}
                  </TableCell>
                  <TableCell className="date">{row.date}</TableCell>
                  <TableCell className="amount">{row.amount}</TableCell>
                  <TableCell className="description">
                    {row.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination-wrapper">
          <Pagination
            page={page}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
}
export default TableListing;
