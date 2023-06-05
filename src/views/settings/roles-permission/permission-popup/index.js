import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import { useStore } from "@store/store";
import closeIcon from "@assets/images/close.svg";
import uncheckedIcon from "@assets/images/uncheck-icon.svg";
import checkedIcon from "@assets/images/checked-icon.svg";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { PermissionPopup } from "./style";

function PopupPermission(props) {
  const classes = PermissionPopup();
  const [scroll] = useState("body");
  const [state] = useStore();
  const materilClasses = materialCommonStyles();
  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.customModal}
      scroll={scroll}
    >
      <div className="close-modal">
        <img src={closeIcon} alt="Close" onClick={props.handleClose} />
      </div>
      <form noValidate autoComplete="off" className={classes.customForm}>
        <DialogTitle id="alert-dialog-title">Permission</DialogTitle>
        <DialogContent>
          <div className="form-row">
            <div className="form-gourp full-width">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="permission">Select Permission</InputLabel>
                <Select
                  labelId="permission"
                  value={props.permissionData}
                  onChange={props.handleChange}
                  displayEmpty
                  label="Permission"
                  className={materilClasses.customSelect}
                  multiple
                  MenuProps={{
                    classes: { paper: materilClasses.customSelect },
                  }}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <>Select Permission</>;
                    }

                    return props?.menuData
                      ?.filter((m) => selected.includes(m.value))
                      .map((m) => m.label)
                      .join(",");
                  }}
                  IconComponent={() => <ExpandMore />}
                >
                  <MenuItem value="" disabled>
                    Select Division
                  </MenuItem>
                  {props.menuData?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={item.value}
                        className="custom-checkbox custom-Multicheckbox"
                      >
                        <Checkbox
                          checked={
                            props.permissionData.indexOf(item.value) > -1
                          }
                          icon={<img src={uncheckedIcon} alt="CheckBox" />}
                          checkedIcon={<img src={checkedIcon} alt="CheckBox" />}
                        />
                        <ListItemText primary={item.label} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="bottom-button-block">
          <Button
            className="primary-btn gray-border-btn"
            color="inherit"
            disableElevation
            underlinenone="true"
            onClick={props.handleClose}
            type="reset"
          >
            CANCEL
          </Button>
          <Button
            className="orange-btn primary-btn"
            color="inherit"
            disableElevation
            underlinenone="true"
            type="button"
            onClick={props.assignPermission}
            disabled={state.rolesPermission.settingRolesPermission}
          >
            {state.rolesPermission.settingRolesPermission ? (
              <CircularProgress color="inherit" />
            ) : (
              "Assign"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PopupPermission;
