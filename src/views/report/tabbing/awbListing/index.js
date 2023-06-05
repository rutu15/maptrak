import React from "react";

import { useStore } from "@store/store";
import Pagination from "@components/pagination";
import TableDynamic from "../../table";
import { tableStyles } from "./style";

function AWbListing(props) {
  const classes = tableStyles();
  const [state] = useStore();

  return (
    <>
      <div className={classes.tableWrapper}>
        <TableDynamic
          reportsHeading={props.reportsHeading}
          getTab={props.getTab}
        />
        {state?.report?.reportData?.count !== 0 && (
          <div className="pagination-wrapper">
            <Pagination
              count={state?.report?.reportData?.count}
              page={props.page}
              handleChangePage={props.handleChangePage}
              rowsPerPage={props.rowsPerPage}
              handleChangeRowsPerPage={props.handleChangeRowsPerPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AWbListing;
