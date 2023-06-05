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
  Checkbox,
  FormControlLabel,
  Button,
} from "@material-ui/core";

import Pagination from "@components/pagination";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIconOrange from "@assets/images/cheked-icon-orange.svg";

import { draftCreditNoteHeader } from "@utils/constant";
import { TableStyle } from "./style";

function TableListing(props) {
  const classes = TableStyle();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("customerName");
  const [data] = useState(props?.data);

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
                {draftCreditNoteHeader.map((item, index) => {
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
                  <TableCell className="check">
                    <FormControlLabel
                      className="custom-checkbox"
                      control={
                        <Checkbox
                          icon={<img src={uncheckedIcon} alt="CheckBox" />}
                          checkedIcon={
                            <img src={checkedIconOrange} alt="CheckBox" />
                          }
                          id={row.jobId}
                          onChange={(e) => props.handleChange(row, e)}
                          checked={data[index]["_rowChecked"] === true}
                          name="check"
                        />
                      }
                    />
                  </TableCell>

                  <TableCell className="childAccount">
                    {row.childCustomer}
                  </TableCell>
                  <TableCell className="parenAccount">
                    {row.parentAccount}
                  </TableCell>
                  <TableCell className="date">{row.date}</TableCell>
                  <TableCell className="amount">{row.amt}</TableCell>
                  <TableCell className="description">{row.desc}</TableCell>
                  <TableCell className="action">
                    <Button
                      className="blue-btn primary-btn"
                      color="inherit"
                      disableElevation
                      style={{ marginRight: "10px" }}
                      onClick={() => props.handleAddPopup(row)}
                    >
                      Edit
                    </Button>
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
