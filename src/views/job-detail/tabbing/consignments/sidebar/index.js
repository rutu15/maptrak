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
  FETCH_CONSIGNMENT_ITEM,
  FETCH_CONSIGNMENT_ITEM_SUCCESS,
  FETCH_CONSIGNMENT_ITEM_FAILURE,
  ADD_CONSIGNMENT_ITEM,
  ADD_CONSIGNMENT_ITEM_SUCCESS,
  ADD_CONSIGNMENT_ITEM_FAILURE,
  IMAGE_UPLOAD_CONSIGNMENT_ITEM,
  IMAGE_UPLOAD_CONSIGNMENT_ITEM_SUCCESS,
  IMAGE_UPLOAD_CONSIGNMENT_ITEM_FAILURE,
  EDIT_CONSIGNMENT_ITEM,
  EDIT_CONSIGNMENT_ITEM_SUCCESS,
  EDIT_CONSIGNMENT_ITEM_FAILURE,
  DELETE_CONSIGNMENT_ITEM,
  DELETE_CONSIGNMENT_ITEM_SUCCESS,
  DELETE_CONSIGNMENT_ITEM_FAILURE,
} from "@utils/actionTypes";
import { uploadImage } from "@utils/commonFunctions";
import API from "@services/axios";
import AddNewItem from "../add-newItem";
import { SideBarStyle } from "./style";

function Sidebar(props) {
  const classes = SideBarStyle();
  const [open, setOpen] = useState(false);
  const [openDelete, setDeletePopup] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [getState, setState] = useState({ right: false });
  const [getIndex, setIndex] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [image, setImage] = useState(null);
  const [initialValue, setInitialValue] = useState(
    schema.addConsignMentItemSchema
  );
  const [state, dispatch] = useStore();
  const { id } = useParams();

  let data = (value) => {
    let obj = {
      quantity: value.quantity,
    };
    obj = {
      ...obj,
      ...(!!value.additionalInfo
        ? { additionalInfo: value.additionalInfo }
        : {}),
      ...(!!value.photo ? { photo: value.photo } : {}),
    };
    return obj;
  };

  let getConsignmentItems = () => {
    dispatch({ type: FETCH_CONSIGNMENT_ITEM });
    API.get(`jobs/${id}/consignments/${props.getIndex}/items`)
      .then((response) => {
        dispatch({
          type: FETCH_CONSIGNMENT_ITEM_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CONSIGNMENT_ITEM_FAILURE, payload: error });
      });
  };

  let addConsignmentItem = (value) => {
    dispatch({ type: ADD_CONSIGNMENT_ITEM });
    API.post(`jobs/${id}/consignments/${props.getIndex}/items`, data(value))
      .then((response) => {
        dispatch({
          type: ADD_CONSIGNMENT_ITEM_SUCCESS,
          payload: response.data.data,
        });
        setImage(null);
        handleClose();
        getConsignmentItems();
        props.getConsignment();
        props.getJobs();
        toast.success("Consignment item added successfully");
      })
      .catch((error) => {
        dispatch({ type: ADD_CONSIGNMENT_ITEM_FAILURE, payload: error });
        setError(error.response.data.message);
      });
  };

  let editConsignmentItem = (value) => {
    dispatch({ type: EDIT_CONSIGNMENT_ITEM });
    API.put(
      `jobs/${id}/consignments/${props.getIndex}/items/${value.id}`,
      data(value)
    )
      .then((response) => {
        dispatch({
          type: EDIT_CONSIGNMENT_ITEM_SUCCESS,
          payload: response.data.data,
        });
        setImage(null);
        handleClose();
        getConsignmentItems();
        props.getConsignment();
        props.getJobs();
        toast.success("Consignment item updated successfully");
      })
      .catch((error) => {
        dispatch({ type: EDIT_CONSIGNMENT_ITEM_FAILURE, payload: error });
        setError(error.response.data.message);
      });
  };

  let deleteConsignmentItem = (deletId) => {
    dispatch({ type: DELETE_CONSIGNMENT_ITEM });
    API.delete(`jobs/${id}/consignments/${props.getIndex}/items/${deletId}`)
      .then((response) => {
        dispatch({
          type: DELETE_CONSIGNMENT_ITEM_SUCCESS,
          payload: response.data.data,
        });
        closeDeletePopup();
        getConsignmentItems();
        props.getConsignment();
        props.getJobs();
        toast.success("Consignment item deleted successfully");
      })
      .catch((error) => {
        dispatch({ type: DELETE_CONSIGNMENT_ITEM_FAILURE, payload: error });
        setError(error.response.data.message);
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: isEdit
      ? validationSchema.editConsignmentItemValidationSchema
      : validationSchema.addConsignmentItemValidationSchema,
    onSubmit: (value) => {
      if (image) {
        dispatch({
          type: IMAGE_UPLOAD_CONSIGNMENT_ITEM,
        });
        uploadImage(image, image.target.files[0]?.type, "customer-logo")
          .then((res) => {
            value = {
              ...value,
              ...(!!res.data.fileName ? { photo: res.data.fileName } : {}),
            };
            isEdit ? editConsignmentItem(value) : addConsignmentItem(value);
            dispatch({
              type: IMAGE_UPLOAD_CONSIGNMENT_ITEM_SUCCESS,
            });
          })
          .catch((err) => {
            dispatch({
              type: IMAGE_UPLOAD_CONSIGNMENT_ITEM_FAILURE,
            });
            toast.error("Image Uploading Failed");
          });
      } else {
        value = {
          ...value,
          photo: initialValue.viewPhoto
            ? initialValue.viewPhoto?.split(".com/")[1]
            : "",
        };
        isEdit ? editConsignmentItem(value) : addConsignmentItem(value);
      }
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
    if (open) {
      getConsignmentItems();
    }
  };

  const handleClick = (event, index) => {
    setIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSidebar = () => setAnchorEl(null);
  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setEdit(false);
    setOpen(false);
    setError("");
    formik.handleReset();
    setInitialValue(schema.addConsignMentItemSchema);
  };

  const openDeletePopup = (item) => {
    setInitialValue({
      ...initialValue,
      number: item.number,
      id: item.id,
    });
    setDeletePopup(true);
    setAnchorEl(null);
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
      additionalInfo: item.additionalInfo,
      quantity: item.quantity,
      photo: "",
      id: item.id,
      viewPhoto: item.photo ? item.photo : "",
    });
  };

  // Handle image
  const handleImage = (event, fileName, defaultText) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      document.getElementById(fileName).innerHTML = file.name;
      setImage(event);
      formik.setFieldValue("photo", file);
    } else {
      document.getElementById(fileName).innerHTML = defaultText;
    }
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
            ITEM
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
                <Typography variant="h2">Items</Typography>
                <img
                  src={closeIcon}
                  alt="Close"
                  onClick={toggleDrawer(anchor, false)}
                />
              </div>
              <AddNewItem
                formik={formik}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                isEdit={isEdit}
                error={error}
                handleImage={handleImage}
                jobsData={props.jobsData}
              />
              {state.job.loadingConsignmentItems ? (
                <div className="circular-progress">
                  <CircularProgress color="inherit" size={60} />
                </div>
              ) : (
                <div className="uld-list-wrapper">
                  {state.job?.consignmentItems?.count === 0 ? (
                    <div className="uld-list-item">
                      <span className="uld-id">No Items Found</span>
                    </div>
                  ) : (
                    state.job?.consignmentItems?.rows?.map((item, index) => {
                      return (
                        <div className="uld-list-item" key={index}>
                          <div className="uld-list-item-info">
                            <span className="uld-id">{item.quantity}</span>
                            {item.additionalInfo ? (
                              <span className="uld-additionalInfo">
                                {" "}
                                | {item.additionalInfo}
                              </span>
                            ) : null}
                          </div>
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
                                  <MenuItem
                                    onClick={() => openDeletePopup(item)}
                                  >
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
              )}
            </div>
            <DeletePopup
              open={openDelete}
              handleClose={closeDeletePopup}
              handleDelete={() => deleteConsignmentItem(initialValue.id)}
              deleteUser={initialValue.number}
              loading={state.job?.deletingConsignmentItem}
              error={error}
            />
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Sidebar;
