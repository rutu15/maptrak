import React, { useState } from "react";

import { Tabs, Tab } from "@material-ui/core";
import { TabbingStyle } from "./style";
// import AWB from "./table-listing-awb";
// import Consignment from "./table-listing-consignment";
// import DraftManualInvoice from "./DraftManualInvoice";
import GenerateManualInvoice from "./GenerateManualInvoice";
import DraftManualInvoiceNew from "./DraftManualInvoiceNew";

function ManualInvoice() {
  const classes = TabbingStyle();
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index } = props;
    return (
      value === index && <div className="tab-pannel-wrapper"> {children} </div>
    );
  }

  return (
    <div className={classes.TabbingWrapper}>
      <div className="white-card tabbing-wrapper">
        <Tabs
          value={value}
          onChange={handleChangeTab}
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Generate" />
          <Tab label="Draft Manual Invoices" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <GenerateManualInvoice />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Draft Manual Invoice */}
          <DraftManualInvoiceNew />
        </TabPanel>
      </div>
    </div>
  );
}

export default React.memo(ManualInvoice);
