import React, { useState } from "react";

import { Tabs, Tab } from "@material-ui/core";
import { TabbingStyle } from "./style";
import AWB from "./table-listing-awb";
import Consignment from "./table-listing-consignment";

function Upload() {
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
          <Tab label="AWB" />
          <Tab label="Consignment" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <AWB />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Consignment />
        </TabPanel>
      </div>
    </div>
  );
}

export default React.memo(Upload);
