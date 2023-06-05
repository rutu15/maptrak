import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "@utils/commonFunctions";

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getToken() ? (
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/page-not-found" />
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
