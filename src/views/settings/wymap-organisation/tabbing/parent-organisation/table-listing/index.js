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
                <TableCell className="name">Name</TableCell>
                <TableCell className="edit-link"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.organisation?.parentOrganisationData?.count === 0 ? (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.organisation?.parentOrganisationData?.rows?.map(
                  (item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="name">
                          {item.name ? item.name : "-"}
                        </TableCell>

                        <TableCell className="edit-link">
                          <span onClick={() => props.handleEdit(item)}>
                            Edit
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default OrganisationTable;
