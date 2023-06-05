import React, { useState } from "react";

import { Tabs, Tab } from "@material-ui/core";
import { TabbingStyle } from "./style";
import CurrentActivity from "./current-activity";
import Invoices from "./invoices";
import Jobs from "./jobs";
import PriceMatrix from "./price-matrix";
import Users from "./users";
import Address from "./address";
import CreditNote from "./credit-note";
import Upload from "./upload";
import ManualInvoice from "./manual-invoice";
import Note from './note';
import Document from './documents'
// import AWB from "./table-listing-awb";
// import Consignment from "./table-listing-consignment";
// import SFTPSetting from "./sftp-settings";

function Tabbing() {
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
          <Tab label="Current activities" />
          <Tab label="Invoices" />
          <Tab label="Manual Invoices" />
          <Tab label="Jobs" />
          <Tab label="Price Matrix" />
          <Tab label="Users" />
          <Tab label="Addresses" />
          <Tab label="Credit Note" />
          <Tab label="Upload" />
          <Tab label="Note" />
          <Tab label="Documents" />
          {/* <Tab label="SFTP Setting" /> */}
        </Tabs>
        <TabPanel value={value} index={0}>
          <CurrentActivity />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Invoices />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ManualInvoice />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Jobs />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <PriceMatrix />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Users />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Address />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <CreditNote />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <Upload />
        </TabPanel>
        <TabPanel value={value} index={9}>
          <Note />
        </TabPanel>
        <TabPanel value={value} index={10}>
          <Document />
        </TabPanel>
        {/* <TabPanel value={value} index={9}>
          <SFTPSetting />
        </TabPanel> */}
      </div>
    </div>
  );
}

export default React.memo(Tabbing);
