import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Typography } from "@material-ui/core";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Header from "@components/header";
import ProfileSideBar from "@components/profile-sidebar";
import DeletePopup from "@components/deletePopup";
import {
  FETCH_ROLES,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
  FETCH_STAFF_USERS,
  FETCH_STAFF_USERS_SUCCESS,
  FETCH_STAFF_USERS_FAILURE,
  ADD_STAFF_USER,
  ADD_STAFF_USER_SUCCESS,
  ADD_STAFF_USER_FAILURE,
  EDIT_STAFF_USER,
  EDIT_STAFF_USER_SUCCESS,
  EDIT_STAFF_USER_FAILURE,
  DELETE_STAFF_USER,
  DELETE_STAFF_USER_SUCCESS,
  DELETE_STAFF_USER_FAILURE,
} from "@utils/actionTypes";
import { schema } from "@utils/schemas";
import { rowsPerPageVal } from "@utils/constant";
import validationSchema from "@utils/validationSchemas";
import API from "@services/axios";
import AddCustomer from "./add-staff-user";
import TableListing from "./table-listing";
import { StaffUserStyle } from "./style";

function StaffUser() {
  const classes = StaffUserStyle();
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [getDeleteUser, setDeleteUser] = useState({});
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [getEditUser, setEditUser] = useState(schema.addStaffUserSchema);
  const [getEdit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
  const [state, dispatch] = useStore();
  const [err, setError] = useState("");

  // API calling to get list of staff user
  let getUsers = () => {
    const params = {
      page: page + 1,
      size: rowsPerPage,
      ...(!!order ? { order } : {}),
      ...(!!orderBy ? { orderBy } : {}),
    };
    dispatch({ type: FETCH_STAFF_USERS });
    API.get("users", { params })
      .then((response) => {
        dispatch({
          type: FETCH_STAFF_USERS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_STAFF_USERS_FAILURE, payload: err });
      });
  };

  // API calling to add staff user
  let addUser = (value) => {
    const data = {
      name: value.name,
      email: value.email,
      roleId: value.roleId,
      password: value.password,
      status: value.status,
    };
    dispatch({ type: ADD_STAFF_USER });
    API.post("users", data)
      .then((response) => {
        handleCloseAddPopup();
        getUsers();
        toast.success("Staff User Added Successfully");
        dispatch({
          type: ADD_STAFF_USER_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        if (error.response.data.code === 409)
          setError(error.response?.data?.message);
        dispatch({ type: ADD_STAFF_USER_FAILURE, payload: error });
      });
  };

  // API calling to edit staff user
  let editUser = (value) => {
    let data = {
      name: value.name,
      email: value.email,
      roleId: value.roleId,
      status: value.status,
    };
    data = {
      ...data,
      ...(!!value.password ? { password: value.password } : {}),
    };
    dispatch({ type: EDIT_STAFF_USER });
    API.put(`users/${value.id}`, data)
      .then((response) => {
        handleCloseAddPopup();
        getUsers();
        toast.success("Staff User Updated Successfully");
        dispatch({
          type: EDIT_STAFF_USER_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        if (error.response.data.code === 409)
          setError(error.response?.data?.message);
        dispatch({ type: EDIT_STAFF_USER_FAILURE, payload: error });
      });
  };

  // API calling to get list of roles
  let getRoles = () => {
    if (state.rolesPermission.rolesData === null) {
      dispatch({ type: FETCH_ROLES });
      API.get("roles")
        .then((response) => {
          dispatch({
            type: FETCH_ROLES_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: FETCH_ROLES_FAILURE, payload: error });
        });
    }
  };

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, order, orderBy]);

  // API calling to delete staff user
  const handleDelete = () => {
    dispatch({ type: DELETE_STAFF_USER });
    API.delete(`users/${getDeleteUser.id}`)
      .then((response) => {
        setDeletePopup(false);
        getUsers();
        toast.success("Staff User Deleted Successfully");
        dispatch({
          type: DELETE_STAFF_USER_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        setError("You can't delete this record");
        dispatch({ type: DELETE_STAFF_USER_FAILURE, payload: error });
      });
  };

  const handleDeletePopup = (user) => {
    setDeleteUser(user);
    setDeletePopup(true);
    setError("");
  };

  const handleAddPopup = (user) => {
    if (user) {
      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roles.id ? user.roles.id : "",
        status: user.status ? 1 : 0,
        password: "",
        confirmPassword: "",
      };
      setEdit(true);
      // eslint-disable-next-line
      setEditUser(data);
    }
    setOpenAddPopup(true);
  };
  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
    setEdit(false);
    setEditUser(schema.addStaffUserSchema);
    setError("");
    formik.handleReset();
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getEditUser,
    validationSchema: getEdit
      ? validationSchema.editStaffUserValidationSchema
      : validationSchema.addStaffUserValidationSchema,
    onSubmit: (value) => {
      getEdit ? editUser(value) : addUser(value);
    },
  });

  const handleSorting = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <Header />
      <div className={classes.StaffListingWrapper}>
        <div className="setting-page wrapper">
          <div className="inner-page">
            <Typography variant="h1">Settings</Typography>
            <div className="setting-row-wrapper">
              <div className="left-sidebar">
                <ProfileSideBar />
              </div>
              <div className="right-content">
                <div className="white-card right-content-inner">
                  <div className={classes.innerPageTopBlock}>
                    <div className="left-block">
                      <Typography variant="h1">Staff Users</Typography>
                    </div>
                    <div className="right-block">
                      <div className="right-block-inner">
                        <div className="modal-wrapper">
                          <div className="btn-wrapper">
                            <AddCustomer
                              handleClickOpen={() => handleAddPopup()}
                              handleClose={handleCloseAddPopup}
                              open={openAddPopup}
                              formik={formik}
                              isEdit={getEdit}
                              error={err}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <TableListing
                    handleOpen={(user) => handleDeletePopup(user)}
                    handleEdit={(editUser) => handleAddPopup(editUser)}
                    handleSorting={(e, property) => handleSorting(e, property)}
                    orderBy={orderBy}
                    order={order}
                    page={page}
                    handleChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                  <DeletePopup
                    open={openDeletePopup}
                    handleClose={() => setDeletePopup(false)}
                    handleDelete={(deleteUser) => handleDelete(deleteUser)}
                    deleteUser={getDeleteUser.name}
                    loading={state.staffUser.deletingUser}
                    error={err}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default StaffUser;
