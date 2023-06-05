import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useStore } from "@store/store";
import logOutRed from "@assets/images/logout-red.svg";
import Warning from "@assets/images/warning.svg";
import { routes } from "@utils/constant";
import { LOGOUT } from "@utils/actionTypes";
import { logOutStyle } from "./style";

function Logout() {
  const history = useHistory();
  const classes = logOutStyle();

  const [scroll] = useState("body");
  const [open, setOpen] = useState(false);
  const [, dispatch] = useStore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setOpen(false);
    dispatch({ type: LOGOUT });
    history.push(routes.login);
    document.body.classList.remove("open-profile-menu");
  };

  return (
    <div className={classes.logOutWrapper}>
      <Link onClick={handleClickOpen}>
        <em>
          <img src={logOutRed} alt="Logout" />
        </em>
        Logout
      </Link>
      <Dialog
        open={open}
        scroll={scroll}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.customModal}
      >
        <DialogTitle id="alert-dialog-title">
          <img src={Warning} alt="Warning" />
          Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to logout from wymap portal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            className="primary-btn gray-border-btn"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            color="primary"
            className="orange-btn primary-btn"
          >
            YES, LOGOUT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Logout;
