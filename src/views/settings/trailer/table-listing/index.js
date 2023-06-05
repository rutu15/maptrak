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
import { trailerHeading } from "@utils/constant";
import { TableStyle } from "./style";

function TrailerTable(props) {
  const [state] = useStore();
  const classes = TableStyle();

  return (
    <>
      <div className={classes.TableWrapper}>
        <Loader
          loading={
            state?.trailer.loadingTrailer || state?.trailer?.importingTrailerCsv
          }
        />
        <TableContainer component={Paper} className={classes.customTable}>
          <Table
            className="account-data-table"
            aria-label="simple table"
            stickyHeader
          >
            <TableHead>
              {/* https://wymap.atlassian.net/browse/MAPTRAK-929  added sorting*/}
              {trailerHeading?.map((item, index) => {
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
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableHead>
            <TableBody>
              {state?.trailer?.trailersData?.count === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No Data Found</TableCell>
                </TableRow>
              ) : (
                state?.trailer?.trailersData?.rows?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="edit-link">
                      <span onClick={() => props.handleEdit(item)}>Edit</span>
                    </TableCell>
                    <TableCell className="trailer">
                      {item.name ? item.name : "-"}
                    </TableCell>
                    <TableCell className="rego-number">
                      {item.rego ? item.rego : "-"}
                    </TableCell>
                    <TableCell className="fleet">
                      {item.fleet ? item.fleet : "-"}
                    </TableCell>
                    <TableCell className="city">
                      {item.trailerCities ? item.trailerCities.name : "-"}
                    </TableCell>
                    <TableCell className="rego-date">
                      {item.registrationDueDate
                        ? item.registrationDueDate
                        : "-"}
                    </TableCell>

                    <TableCell className="service-date">
                      {item.serviceDueDate ? item.serviceDueDate : "-"}
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
      </div>
    </>
  );
}
export default TrailerTable;
