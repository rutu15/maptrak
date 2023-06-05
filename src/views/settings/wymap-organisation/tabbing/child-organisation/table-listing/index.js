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

import { useStore } from "@store/store";
import { TableStyle } from "./style";

function OrganisationTable(props) {
  const classes = TableStyle();
  const [state] = useStore();

  return (
    <>
      <div className={classes.TableWrapper}>
        <TableContainer component={Paper} className={classes.customTable}>
          <Table
            className="account-data-table"
            aria-label="simple table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell className="edit-link"></TableCell>
                <TableCell className="name">Name</TableCell>
                <TableCell className="parent">Parent</TableCell>
                <TableCell className="address">Address 1</TableCell>
                <TableCell className="address">Address 2</TableCell>
                <TableCell className="suburb">Suburb</TableCell>
                <TableCell className="postalCode">Postal Code</TableCell>
                <TableCell className="country">Country</TableCell>
                <TableCell className="state">State</TableCell>
                <TableCell className="city">City</TableCell>
                <TableCell className="abn">ABN/NZBN</TableCell>
                <TableCell className="phone">Phone</TableCell>
                <TableCell className="fax">FAX</TableCell>
                <TableCell className="email">Email</TableCell>
                <TableCell className="bsb">BSB</TableCell>
                <TableCell className="ac-no">Ac-No</TableCell>
                <TableCell className="ac-name">Ac-Name</TableCell>
                <TableCell className="bank">Bank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.organisation?.childOrganisationData?.count === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.organisation?.childOrganisationData?.rows.map(
                  (item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="edit-link">
                          <span onClick={() => props.handleEdit(item)}>
                            Edit
                          </span>
                        </TableCell>
                        <TableCell className="name">
                          {item.name || "-"}
                        </TableCell>
                        <TableCell className="parent">
                          {item.parentOrganisations?.name || "-"}
                        </TableCell>
                        <TableCell className="address">
                          {item.address1 || "-"}
                        </TableCell>
                        <TableCell className="address">
                          {item.address2 || "-"}
                        </TableCell>
                        <TableCell className="suburb">
                          {item.suburb || "-"}
                        </TableCell>
                        <TableCell className="postalCode">
                          {item.postalCode || "-"}
                        </TableCell>
                        <TableCell className="country">
                          {item.countries?.name || "-"}
                        </TableCell>
                        <TableCell className="state">
                          {item.states?.name || "-"}
                        </TableCell>
                        <TableCell className="city">
                          {item.cities?.name || "-"}
                        </TableCell>
                        <TableCell className="abn">{item.ABN || "-"}</TableCell>
                        <TableCell className="phone">
                          {item.phone || "-"}
                        </TableCell>
                        <TableCell className="fax">{item.fax || "-"}</TableCell>
                        <TableCell className="email">
                          {item.email || "-"}
                        </TableCell>
                        <TableCell className="bsb">{item.BSB || "-"}</TableCell>
                        <TableCell className="ac-no">
                          {item.accountNumber || "-"}
                        </TableCell>
                        <TableCell className="ac-name">
                          {item.accountName || "-"}
                        </TableCell>
                        <TableCell className="bank">
                          {item.bank || "-"}
                        </TableCell>
                      </TableRow>
                    );
                  }
                )
              )}
              {}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default OrganisationTable;
