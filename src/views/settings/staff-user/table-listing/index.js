import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from "@material-ui/core";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import Pagination from "@components/pagination";
import { TableStyle } from "./style";

function TableListing(props) {
  const [state] = useStore();
  const classes = TableStyle();

  return (
    <>
      <div className={classes.TableWrapper}>
        <Loader loading={state?.staffUser?.loading} />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="name">
                  Name{" "}
                  <TableSortLabel
                    direction={props.orderBy === "name" ? props.order : "desc"}
                    active={true}
                    onClick={(e) => props.handleSorting(e, "name")}
                  />
                </TableCell>
                <TableCell className="email">Email</TableCell>
                <TableCell className="status">Status</TableCell>
                <TableCell className="role">Role</TableCell>
                <TableCell className="edit-link"></TableCell>
                <TableCell className="delete-link"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.staffUser?.staffUsers?.count === 0 ? (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.staffUser?.staffUsers?.rows?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="name">{item.name}</TableCell>
                    <TableCell className="email">{item.email}</TableCell>
                    <TableCell className="status">
                      {item.status === true ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell className="role">{item.roles?.name}</TableCell>
                    <TableCell className="edit-link">
                      <span onClick={() => props.handleEdit(item)}>Edit</span>
                    </TableCell>
                    <TableCell className="delete-link">
                      <span onClick={() => props.handleOpen(item)}>Delete</span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {state?.staffUser?.staffUsers?.count !== 0 && (
          <div className="pagination-wrapper">
            <Pagination
              count={state?.staffUser?.staffUsers?.count}
              page={props.page}
              handleChangePage={props.handleChangePage}
              rowsPerPage={props.rowsPerPage}
              handleChangeRowsPerPage={props.handleChangeRowsPerPage}
            />
          </div>
        )}
      </div>
    </>
  );
}
export default TableListing;
