import React from "react";
import { Button } from "@material-ui/core";

import { useStore } from "@store/store";

import { convertMinutesToHours, utcToTimezone } from "@utils/commonFunctions";
import { routes } from "@utils/constant";
import TableListing from "../table-listing";


function TableDetail() {
  const [state] = useStore();

  return (
    <>
      {state.customer.customerManualInvoices?.rows?.map((item, index) => {
        return (
          <div className="custom-card" key={index}>
            <div className="card-header">
              <div className="left-card-header">
                <div className="job-status-wrapper">
                  <label className="label-text">{item.id}</label>
                  <span
                    className={
                      item.jobStatus === "Not Reviewed"
                        ? "review-not-completed"
                        : "review-completed"
                    }
                  >
                    {item.jobStatuses ? item.jobStatuses.name : "-"}
                  </span>
                  {item.invoiceGenerated === true && (
                    <span className="invoice-generated">Invoice Generated</span>
                  )}
                </div>
                <ul className="info-content-list">
                  <li>{item.jobTypes ? item.jobTypes?.name : "-"}</li>
                  <li>{item.weight ? item.weight + "kg" : "-"}</li>
                  <li>{item.quantity ? item.quantity + "qty" : "-"}</li>
                  <li>
                    {item.completedAt
                      ? utcToTimezone(
                          item.completedAt,
                          item.cities?.timezone,
                          "DD/MM/YY"
                        )
                      : "-"}
                  </li>
                  <li>
                    {item.totalDuration
                      ? convertMinutesToHours(item.totalDuration)
                      : "-"}
                  </li>
                </ul>
              </div>
              <div className="right-card-header">
                <Button
                  className="blue-btn primary-btn"
                  color="inherit"
                  disableElevation
                  underlinenone="true"
                  // Worked on maptrak-907 (Current activites view job in new tab)
                  onClick={() => window.open(`${routes.jobDetail}/${item.id}`)}
                >
                  VIEW JOB
                </Button>
              </div>
            </div>
            <div className="card-body">
              <ul className="nett-tax-gross-list ">
                {/* To Li values update format https://wymap.atlassian.net/browse/MAPTRAK-872 */}
                <li>
                  Net:{" "}
                  <span>
                    {item.net
                      ? `$${parseFloat(item.net).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}`
                      : "-"}
                  </span>
                </li>
                <li>
                  Tax:{" "}
                  <span>
                    {item.tax
                      ? `$${parseFloat(item.tax).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}`
                      : "-"}
                  </span>
                </li>
                <li>
                  Gross:{" "}
                  <span>
                    {item.gross
                      ? `$${parseFloat(item.gross).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}`
                      : "-"}
                  </span>
                </li>
              </ul>
              <TableListing data={item} index={index} />
            </div>
          </div>
        );
      })}
    </>
  );
}
export default TableDetail;
