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
  Checkbox,
  FormControlLabel,
  Button,
} from "@material-ui/core";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import Pagination from "@components/pagination";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIconOrange from "@assets/images/cheked-icon-orange.svg";
import { customerDetailConsignmentHeader } from "@utils/constant";

import { tableStyles } from "./style";

function TableListing(props) {
  const classes = tableStyles();
  const [state] = useStore();

  return (
    <>
      <div className={classes.tableWrapper}>
        <Loader
          loading={
            state.customer.importingCustomerConsignment ||
            state.customer.loadingCustomerCosignment ||
            state.customer.deletingCustomerConsignment
          }
        />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                {props.data?.length ? (
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
                ) : (
                  <TableCell className="check"></TableCell>
                )}

                {customerDetailConsignmentHeader?.map((item, index) => {
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
              {!props?.data?.length ? (
                <TableRow>
                  <TableCell colSpan={5}>No Data Found</TableCell>
                </TableRow>
              ) : (
                props?.data?.map((item, index) => (
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
                    <TableCell className="consignment">
                      {item.number || "-"}
                    </TableCell>
                    <TableCell className="weight">
                      {item.weight || "-"}
                    </TableCell>
                    <TableCell className="quantity">
                      {item.quantity || "-"}
                    </TableCell>
                    <TableCell className="action">
                      <Button
                        className="orange-btn primary-btn"
                        color="inherit"
                        disableElevation
                        onClick={() => props.handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {props?.data?.length ? (
          <div className="pagination-wrapper">
            <Pagination
              count={props?.data?.length}
              page={props.page}
              handleChangePage={props.handleChangePage}
              rowsPerPage={props.rowsPerPage}
              handleChangeRowsPerPage={props.handleChangeRowsPerPage}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default TableListing;
