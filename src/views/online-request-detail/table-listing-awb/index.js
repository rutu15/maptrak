import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import Pagination from "@components/pagination";
import Loader from "@components/loader";
import { useStore } from "@store/store";
import {
  FETCH_AIR_WAY_BILLS,
  FETCH_AIR_WAY_BILLS_SUCCESS,
  FETCH_AIR_WAY_BILLS_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import Row from "./row";
import { TableStyle } from "./style";

function TableListing() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [state, dispatch] = useStore();
  const { id } = useParams();
  const classes = TableStyle();

  // API calling to get list of airwayBills
  let getAirWayBills = () => {
    const params = {
      page: page + 1,
      size: rowsPerPage,
    };
    dispatch({ type: FETCH_AIR_WAY_BILLS });
    API.get(`jobs/${id}/airWaybills`, { params })
      .then((response) => {
        dispatch({
          type: FETCH_AIR_WAY_BILLS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_AIR_WAY_BILLS_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getAirWayBills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className={classes.TableWrapper}>
        <Loader
          loading={
            state?.job?.loadingAirWayBill ||
            state?.onlineRequest?.gettingOnlineRequestById
          }
        />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="name">AWB Number</TableCell>
                <TableCell className="airline">Airline</TableCell>
                <TableCell className="readyDate">Ready Date </TableCell>
                <TableCell className="readyTime">Ready Time</TableCell>
                <TableCell className="cutTime">Cut Off Time</TableCell>
                <TableCell className="dgClassification">
                  DG Classification
                </TableCell>
                <TableCell className="unNumber">UN Number</TableCell>
                <TableCell className="totalWeight">
                  Total weight carried
                </TableCell>
                <TableCell className="packageWeight">
                  Packaging weight carried
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.job?.airWayBillData?.count === 0 ? (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              ) : (
                state.job?.airWayBillData?.rows?.map((item, index) => {
                  return <Row key={index} row={item} />;
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {state.job?.airWayBillData?.count !== 0 && (
          <div className="pagination-wrapper">
            <Pagination
              count={state.job?.airWayBillData?.count}
              page={page}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        )}
      </div>
    </>
  );
}
export default TableListing;
