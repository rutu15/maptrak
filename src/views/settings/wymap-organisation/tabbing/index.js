import React, { useState } from "react";

import { Tabs, Tab } from "@material-ui/core";
import { TabbingStyle } from "./style";
import ChildOrganisation from "./child-organisation";
import ParentOrganisaton from "./parent-organisation";

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
          <Tab label="Child Organisation" />
          <Tab label="Parent Organisation" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ChildOrganisation />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ParentOrganisaton />
        </TabPanel>
      </div>
    </div>
  );
}

export default React.memo(Tabbing);
