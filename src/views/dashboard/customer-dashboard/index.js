import React, { useEffect } from "react";

import { innerPageStyle } from "@utils/commonStyles";
import ChartBox from "./components/chartBox";

function CustomerDashboardView(props) {
  const classes = innerPageStyle();
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 900000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className={classes.innerPageWrapper}>
        <div className="dashboard-page inner-page wrapper">
          <ChartBox
            handleRedirection={props.handleRedirection}
            handleRedirectionDriver={props.handleRedirectionDriver}
            handleRedirectionInvoice={props.handleRedirectionInvoice}
          />
        </div>
      </div>
    </>
  );
}

export default CustomerDashboardView;
