import { useState } from "react";
import {
  TableCell,
  TableRow,
  Collapse,
  Table,
  TableBody,
} from "@material-ui/core";

import {
  requestStatusColors,
  convertMinutesToHours,
} from "@utils/commonFunctions";
import { routes } from "@utils/constant";

function Row(props) {
  const [open, setOpen] = useState(false);
  const { row, unique, getTab } = props;
  return (
    <>
      <TableRow onClick={() => setOpen(!open)} key={unique}>
        <TableCell
          className="jobId-cell"
          onClick={() => window.open(`${routes.jobDetail}/${row.id}`)}
        >
          {row.id ? row.id : "-"}
        </TableCell>
        <TableCell className="jobType">
          {row.jobTypes ? row.jobTypes?.name : "-"}
        </TableCell>
        {getTab === 0 && (
          <TableCell className="reportType">
            {row.cargoTypes ? row.cargoTypes?.name : "-"}
          </TableCell>
        )}
        <TableCell className="airBill">-</TableCell>
        <TableCell className="customer">
          {row.customers ? row.customers?.name : "-"}
        </TableCell>
        <TableCell className="customer">
          {row.childCustomers ? row.childCustomers?.name : "-"}
        </TableCell>
        <TableCell className="pieces">
          {row.quantity ? row.quantity : "-"}
        </TableCell>
        <TableCell className="weight">
          {row.weight ? row.weight : "-"}
        </TableCell>
        <TableCell className="cto">{row.ctos ? row.ctos?.name : "-"}</TableCell>
        <TableCell
          className={
            row.onlineRequestStatuses &&
            row.onlineRequestStatuses?.name &&
            `request-status ${requestStatusColors(
              row.onlineRequestStatuses && row.onlineRequestStatuses?.name
            )}`
          }
        >
          <span>
            {row.onlineRequestStatuses ? row.onlineRequestStatuses?.name : "-"}
          </span>
        </TableCell>
        <TableCell className="jobStatus">
          {row.jobStatuses ? row.jobStatuses?.name : "-"}
        </TableCell>
        <TableCell className="refNo">
          {row.referenceNo ? row.referenceNo : "-"}
        </TableCell>
        <TableCell className="jobDuration">
          {row.totalDuration ? convertMinutesToHours(row.totalDuration) : "-"}
        </TableCell>
        <TableCell className="truckRego">
          {row.trucks ? row.trucks?.rego : "-"}
        </TableCell>
        <TableCell className="city">
          {row.cities ? row.cities?.name : "-"}
        </TableCell>
      </TableRow>
      <TableRow className="sub-row">
        <TableCell
          className="MuiTableSubRoW"
          colSpan={props.getTab === 0 ? 15 : 14}
        >
          <Collapse in={open}>
            <Table stickyHeader aria-label="simple table">
              {row?.airWaybills?.map((item, index) => {
                return (
                  <TableBody key={index}>
                    <TableRow>
                      <TableCell className="jobId-cell"></TableCell>
                      <TableCell className="jobType"></TableCell>
                      {props.getTab === 0 && (
                        <TableCell className="reportType"></TableCell>
                      )}
                      <TableCell className="airBill">
                        {" "}
                        {item.number ? item.number : "-"}
                      </TableCell>
                      <TableCell className="customer"></TableCell>
                      <TableCell className="customer"></TableCell>
                      <TableCell className="pieces">
                        {item.quantity ? item.quantity : "-"}
                      </TableCell>
                      <TableCell className="weight">
                        {item.weight ? item.weight : "-"}
                      </TableCell>
                      <TableCell className="cto"></TableCell>
                      <TableCell className="request-status"></TableCell>
                      <TableCell className="jobStatus"></TableCell>
                      <TableCell className="refNo"></TableCell>
                      <TableCell className="jobDuration"></TableCell>
                      <TableCell className="truckRego"></TableCell>
                      <TableCell className="city"></TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;
