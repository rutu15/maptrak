import React from "react";
import { Typography } from "@material-ui/core";

import Header from "@components/header";
import FullPage from "../layout/FullPage";

function PageNotFoundView() {
  return (
    <>
      <Header />
      <FullPage>
        <Typography variant="h2" color="textPrimary">
          404 Page Not Found
        </Typography>
      </FullPage>
    </>
  );
}

export default PageNotFoundView;
