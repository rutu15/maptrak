import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";

import RunSheet from "./time-report";
import TimeSheet from "./timesheet";
import Jobs from "./jobs";
import { TabbingStyle } from "./style";

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
          <Tab label="Jobs" />
          <Tab label="Run Sheets" />
          <Tab label="Timesheet" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Jobs />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RunSheet />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TimeSheet />
        </TabPanel>
      </div>
    </div>
  );
}
export default React.memo(Tabbing);
