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
import Loader from "@components/loader";
import Pagination from "@components/pagination";
import { ctoHeading } from "@utils/constant";
import { TableStyle } from "./style";

function TableListing(props) {
  const [state] = useStore();
  const classes = TableStyle();

  return (
    <>
      <div className={classes.TableWrapper}>
        <Loader loading={state?.cto.loadingCto || state?.cto?.deletingCto} />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table
            className="account-data-table"
            aria-label="simple table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                {ctoHeading.map((item, index) => {
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
              {state?.cto?.ctoData?.count === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.cto.ctoData?.rows?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="name">{item.name}</TableCell>
                    <TableCell className="city">{item.cities?.name}</TableCell>
                    <TableCell className="address">{item.location}</TableCell>
                    <TableCell className="latitude">{item.latitude}</TableCell>
                    <TableCell className="longitude">
                      {item.longitude}
                    </TableCell>
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
        {state?.cto?.ctoData?.count !== 0 && (
          <div className="pagination-wrapper">
            <Pagination
              count={state?.cto?.ctoData?.count}
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
