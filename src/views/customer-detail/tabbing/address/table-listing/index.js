import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import { TableStyle } from "./style";
import { useStore } from "@store/store";
import Loader from "@components/loader";

function TableListing(props) {
  const [state] = useStore();
  const classes = TableStyle();
  return (
    <>
      <div className={classes.TableWrapper}>
        <Loader loading={state?.customer.loadingCustomerAddress} />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="address">Address</TableCell>
                <TableCell className="latitude">Latitude</TableCell>
                <TableCell className="longitude">Longitude</TableCell>
                <TableCell className="edit-link"></TableCell>
                <TableCell className="delete-link"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.customer?.customerAddressData?.count === 0 ? (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.customer?.customerAddressData?.rows?.map(
                  (item, index) => (
                    <TableRow key={index}>
                      <TableCell className="address">{item.address} </TableCell>
                      <TableCell className="latitude">
                        {item.latitude}
                      </TableCell>
                      <TableCell className="longitude">
                        {item.longitude}
                      </TableCell>
                      <TableCell className="edit-link">
                        <span onClick={() => props.handleEdit(item)}>Edit</span>
                      </TableCell>
                      <TableCell className="delete-link">
                        <span onClick={() => props.handleOpen(item)}>
                          Delete
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default TableListing;
