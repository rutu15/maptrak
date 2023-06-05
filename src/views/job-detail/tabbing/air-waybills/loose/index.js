import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  SwipeableDrawer,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import DeletePopup from "@components/deletePopup";
import closeIcon from "@assets/images/close.svg";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import {
  FETCH_AWB_LOOSE,
  FETCH_AWB_LOOSE_SUCCESS,
  FETCH_AWB_LOOSE_FAILURE,
  ADD_AWB_LOOSE,
  ADD_AWB_LOOSE_SUCCESS,
  ADD_AWB_LOOSE_FAILURE,
  EDIT_AWB_LOOSE,
  EDIT_AWB_LOOSE_SUCCESS,
  EDIT_AWB_LOOSE_FAILURE,
  DELETE_AWB_LOOSE,
  DELETE_AWB_LOOSE_SUCCESS,
  DELETE_AWB_LOOSE_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import AddLoose from "./add-loose";
import { LooseStyle } from "./style";

function Loose(props) {
  const classes = LooseStyle();
  const [open, setOpen] = useState(false);
  const [openDelete, setDeletePopup] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [getState, setState] = useState({ right: false });
  const [getIndex, setIndex] = useState("");
  const [initialValue, setInitialValue] = useState(schema.addLooseSchema);
  const [state, dispatch] = useStore();
  const { id } = useParams();

  let data = (value) => {
    let obj = {
      quantity: value.quantity,
    };
    return obj;
  };

  // API calling to get loose of AWB
  let getAwbLoose = () => {
    dispatch({ type: FETCH_AWB_LOOSE });
    API.get(`jobs/${id}/airWaybills/${props.getIndex}/looses`)
      .then((response) => {
        dispatch({
          type: FETCH_AWB_LOOSE_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_AWB_LOOSE_FAILURE, payload: error });
      });
  };

  // API calling to add loose
  let addAwbLoose = (value) => {
    dispatch({ type: ADD_AWB_LOOSE });
    API.post(`jobs/${id}/airWaybills/${props.getIndex}/looses`, data(value))
      .then((response) => {
        dispatch({
          type: ADD_AWB_LOOSE_SUCCESS,
          payload: response.data.data,
        });
        handleClose();
        getAwbLoose();
        props.getAirWayBills();
        props.getJobs();
        toast.success("Loose Added Successfully");
      })
      .catch((error) => {
        dispatch({ type: ADD_AWB_LOOSE_FAILURE, payload: error });
        setError(error.response.data.message);
      });
  };

  // API calling to edit loose
  let editAwbLoose = (value) => {
    dispatch({ type: EDIT_AWB_LOOSE });
    API.put(
      `jobs/${id}/airWaybills/${props.getIndex}/looses/${value.id}`,
      data(value)
    )
      .then((response) => {
        dispatch({
          type: EDIT_AWB_LOOSE_SUCCESS,
          payload: response.data.data,
        });
        handleClose();
        getAwbLoose();
        props.getAirWayBills();
        props.getJobs();
        toast.success("Loose Updated Successfully");
      })
      .catch((error) => {
        dispatch({ type: EDIT_AWB_LOOSE_FAILURE, payload: error });
        setError(error.response.data.message);
      });
  };

  // API calling to delete loose
  let deleteAwbLoose = (value) => {
    dispatch({ type: DELETE_AWB_LOOSE });
    API.delete(`jobs/${id}/airWaybills/${props.getIndex}/looses/${value}`)
      .then((response) => {
        dispatch({
          type: DELETE_AWB_LOOSE_SUCCESS,
          payload: response.data.data,
        });
        closeDeletePopup();
        getAwbLoose();
        props.getAirWayBills();
        props.getJobs();
        toast.success("Loose Deleted Successfully");
      })
      .catch((error) => {
        dispatch({ type: DELETE_AWB_LOOSE_FAILURE, payload: error });
        setError(error.response.data.message);
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: validationSchema.addLooseValidationSchema,
    onSubmit: (value) => {
      isEdit ? editAwbLoose(value) : addAwbLoose(value);
    },
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...getState, [anchor]: open });
    if (open) getAwbLoose();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event, index) => {
    setIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSidebar = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEdit(false);
    setOpen(false);
    setError("");
    setInitialValue(schema.addLooseSchema);
    formik.handleReset();
  };

  const openDeletePopup = (item) => {
    setDeletePopup(true);
    setAnchorEl(null);
    setInitialValue({
      ...initialValue,
      id: item.id,
      number: item.number,
    });
  };

  const closeDeletePopup = () => {
    setDeletePopup(false);
    setError("");
    setInitialValue({});
  };

  const handleEditOpen = (item) => {
    setAnchorEl(null);
    setOpen(true);
    setEdit(true);
    setInitialValue({
      number: item.number,
      quantity: item.quantity,
      id: item.id,
    });
  };

  return (
    <div className={classes.ULDsWrapper}>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className="primary-btn blue-btn lg"
            variant="contained"
            color="primary"
            disableElevation
            onClick={toggleDrawer(anchor, true)}
          >
            Loose
          </Button>
          <SwipeableDrawer
            className={classes.drawerWrapper}
            anchor={anchor}
            open={getState[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className="drawer-wrapper">
              <div className="filter-title-block form-group">
                <Typography variant="h2">Loose</Typography>
                <img
                  src={closeIcon}
                  alt="Close"
                  onClick={toggleDrawer(anchor, false)}
                />
              </div>
              <AddLoose
                formik={formik}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                isEdit={isEdit}
                error={error}
                jobsData={props.jobsData}
              />
              <div className="uld-list-wrapper">
                {state.job.loadingAwbLoose ? (
                  <div className="circular-progress">
                    <CircularProgress color="inherit" size={60} />
                  </div>
                ) : state.job.awbLooseData?.count === 0 ? (
                  <div className="uld-list-item">
                    <span className="uld-id">No Items Found</span>
                  </div>
                ) : (
                  state.job.awbLooseData?.rows?.map((item, index) => {
                    return (
                      <div className="uld-list-item" key={index}>
                        <span className="uld-id">{item.quantity}</span>
                        <div className={classes.moreLinkWrapper}>
                          <div className="more-link-block">
                            <span
                              className="more-link"
                              aria-controls="menu"
                              aria-haspopup="true"
                              onClick={(e) => handleClick(e, index)}
                            >
                              <MoreVertIcon />
                            </span>
                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={getIndex === index && Boolean(anchorEl)}
                              onClose={handleCloseSidebar}
                              className={classes.customMenu}
                              menuprops={{
                                classes: { paper: classes.customMenu },
                              }}
                            >
                              <MenuItem onClick={() => handleEditOpen(item)}>
                                {props.jobsData?.invoiceGenerated === false
                                  ? "Edit"
                                  : "View"}
                              </MenuItem>
                              {props.jobsData?.invoiceGenerated === false && (
                                <MenuItem onClick={() => openDeletePopup(item)}>
                                  Delete
                                </MenuItem>
                              )}
                            </Menu>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <DeletePopup
              open={openDelete}
              handleClose={closeDeletePopup}
              handleDelete={() => deleteAwbLoose(initialValue.id)}
              deleteUser={initialValue.number}
              loading={state.job?.deletingAwbLoose}
              error={error}
            />
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Loose;
