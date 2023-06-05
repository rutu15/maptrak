import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useStore } from "@store/store";
import UploadImage from "@assets/images/upload.svg";
import closeIcon from "@assets/images/close.svg";
import { allowOnlyNumbers } from "@utils/commonFunctions";
import { AddNewItemStyle } from "./style";

function AddNewItem(props) {
  const classes = AddNewItemStyle();
  const [scroll] = useState("body");
  const [state] = useStore();

  return (
    <div className={classes.AddNewItemWrapper}>
      {props.jobsData?.invoiceGenerated === false && (
        <Button
          className="orange-btn primary-btn"
          color="inherit"
          disableElevation
          underlinenone="true"
          onClick={props.handleClickOpen}
        >
          + Add Item
        </Button>
      )}

      <Dialog open={props.open} className={classes.customModal} scroll={scroll}>
        <div className="close-modal">
          <img src={closeIcon} alt="Close" onClick={props.handleClose} />
        </div>
        <form
          noValidate
          autoComplete="off"
          className={classes.customForm}
          onSubmit={props.formik.handleSubmit}
        >
          {props.error && <Alert severity="error">{props.error}</Alert>}
          <DialogTitle>
            {props.isEdit
              ? props.jobsData?.invoiceGenerated === false
                ? "Edit"
                : "View"
              : "Add"}{" "}
            item
          </DialogTitle>
          <DialogContent>
            <div className="form-row">
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="additional-info">
                    Additional info
                  </label>
                  <TextField
                    id="additionalInfo"
                    placeholder="Width, length"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    value={
                      props.formik.values.additionalInfo &&
                      props.formik.values.additionalInfo.trimStart()
                    }
                  />
                  <FormHelperText className="error-text">
                    {props.formik.touched.additionalInfo &&
                      props.formik.errors.additionalInfo}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="form-group">
                <FormControl variant="outlined" className={classes.formControl}>
                  <label className="label-text" htmlFor="quantity">
                    Quantity
                  </label>
                  <TextField
                    name="quantity"
                    placeholder="Quantity"
                    variant="outlined"
                    type="text"
                    onChange={props.formik.handleChange}
                    onKeyPress={allowOnlyNumbers}
                    value={props.formik.values.quantity}
                    error={
                      props.formik.touched.quantity &&
                      Boolean(props.formik.errors.quantity)
                    }
                    helperText={
                      props.formik.touched.quantity &&
                      props.formik.errors.quantity
                    }
                  />
                </FormControl>
              </div>
            </div>

            <div className="form-row">
              {props.jobsData?.invoiceGenerated === false && (
                <div className="form-group">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <label className="label-text" htmlFor="photo">
                      Photo
                    </label>
                    <div className={classes.fileInput}>
                      <TextField
                        id="photo"
                        variant="outlined"
                        type="file"
                        multiple
                        onChange={(e) =>
                          props.handleImage(e, "file-name", "Upload Photo")
                        }
                        InputProps={{
                          inputProps: { accept: "image/x-png,image/jpeg" },
                        }}
                      />
                      <div className="label-block">
                        <img src={UploadImage} alt="  Upload" />
                        <span className="file-name" id="file-name">
                          {props.formik.values.photo
                            ? props.formik.values.photo?.name
                            : "Upload Photo"}
                        </span>
                      </div>
                    </div>
                    <FormHelperText className="error-text">
                      {props.formik.touched.photo && props.formik.errors.photo}
                    </FormHelperText>
                  </FormControl>
                </div>
              )}
            </div>
            {props?.formik?.values?.viewPhoto !== "" && (
              <div className="form-row">
                <div className="form-group">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <label className="label-text" htmlFor="bill-number">
                      View Uploaded Photo
                    </label>
                    <Button
                      className="primary-btn gray-border-btn"
                      color="inherit"
                      disableElevation
                      underlinenone="true"
                      onClick={() => window.open(props.formik.values.viewPhoto)}
                    >
                      View
                    </Button>
                  </FormControl>
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions className="bottom-button-block">
            <Button
              className="primary-btn gray-border-btn"
              color="inherit"
              disableElevation
              underlinenone="true"
              onClick={props.handleClose}
            >
              CANCEL
            </Button>
            {props.jobsData?.invoiceGenerated === false && (
              <Button
                className="orange-btn primary-btn"
                color="inherit"
                disableElevation
                underlinenone="true"
                type="submit"
                disabled={
                  state?.job?.addingConsignmentItem ||
                  state?.job?.uploadingItemImage ||
                  state?.job?.editingConsignmentItem
                }
              >
                {state?.job?.addingConsignmentItem ||
                state?.job?.uploadingItemImage ||
                state?.job?.editingConsignmentItem ? (
                  <CircularProgress color="inherit" />
                ) : props.isEdit ? (
                  "Edit Item"
                ) : (
                  "Add Item"
                )}{" "}
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
export default AddNewItem;
