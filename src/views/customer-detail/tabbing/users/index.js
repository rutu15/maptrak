import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import DeletePopup from "@components/deletePopup";
import SearchIcon from "@assets/images/search.svg";
import {
  FETCH_CUSTOMER_USERS,
  FETCH_CUSTOMER_USERS_SUCCESS,
  FETCH_CUSTOMER_USERS_FAILURE,
  ADD_CUSTOMER_USERS,
  ADD_CUSTOMER_USERS_SUCCESS,
  ADD_CUSTOMER_USERS_FAILURE,
  EDIT_CUSTOMER_USERS,
  EDIT_CUSTOMER_USERS_SUCCESS,
  EDIT_CUSTOMER_USERS_FAILURE,
  DELETE_CUSTOMER_USERS,
  DELETE_CUSTOMER_USERS_SUCCESS,
  DELETE_CUSTOMER_USERS_FAILURE,
} from "@utils/actionTypes";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import API from "@services/axios";
import AddUser from "../users/add-user";
import TableListing from "./table-listing";
import { UserStyle } from "./style";

function Users() {
  const classes = UserStyle();
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [getDeleteUser, setDeleteUser] = useState({});
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [getEditUser, setEditUser] = useState(schema.addCustomerUserSchema);
  const [getEdit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [state, dispatch] = useStore();
  const { id } = useParams();

  // API calling to get list of customer's users
  let getUsers = () => {
    const params = {
      ...(!!search ? { search } : {}),
    };
    dispatch({ type: FETCH_CUSTOMER_USERS });
    API.get(`customers/${id}/users`, { params })
      .then((response) => {
        dispatch({
          type: FETCH_CUSTOMER_USERS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMER_USERS_FAILURE, payload: error });
      });
  };

  // API calling to add customer user
  let addUsers = (value) => {
    const data = {
      name: value.name,
      email: value.email,
      password: value.password,
      phone: value.phone,
      status: 1,
      isMapCockpitAutoRefresh: value.isMapCockpitAutoRefresh ? 1 : 0,
    };
    dispatch({ type: ADD_CUSTOMER_USERS });
    API.post(`customers/${id}/users`, data)
      .then((response) => {
        handleCloseAddPopup();
        getUsers();
        dispatch({
          type: ADD_CUSTOMER_USERS_SUCCESS,
          payload: response.data.data,
        });
        toast.success("User Added Successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch({ type: ADD_CUSTOMER_USERS_FAILURE, payload: error });
      });
  };

  // API calling to edit customer user
  let editUsers = (value) => {
    let data = {
      name: value.name,
      email: value.email,
      phone: value.phone,
      status: 1,
      isMapCockpitAutoRefresh: value.isMapCockpitAutoRefresh ? 1 : 0,
    };
    data = {
      ...data,
      ...(value.password ? { password: value.password } : {}),
    };
    dispatch({ type: EDIT_CUSTOMER_USERS });
    API.put(`customers/${id}/users/${value.id}`, data)
      .then((response) => {
        handleCloseAddPopup();
        getUsers();
        dispatch({
          type: EDIT_CUSTOMER_USERS_SUCCESS,
          payload: response.data.data,
        });
        toast.success("User Updated Successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch({ type: EDIT_CUSTOMER_USERS_FAILURE, payload: error });
      });
  };

  const handleDeletePopup = (user) => {
    setDeleteUser(user);
    setDeletePopup(true);
  };

  const handleAddPopup = (user) => {
    if (user) {
      setEdit(true);
      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: "",
        confirmPassword: "",
        isMapCockpitAutoRefresh: user.isMapCockpitAutoRefresh,
      };
      setEditUser(data);
    }
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setEdit(false);
    setOpenAddPopup(false);
    setEditUser(schema.addCustomerUserSchema);
    setError("");
    formik.handleReset();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getEditUser,
    validationSchema: !getEdit
      ? validationSchema.addCustomerUserValidationSchema
      : validationSchema.editCustomerUserValidationSchema,
    onSubmit: (value) => {
      getEdit ? editUsers(value) : addUsers(value);
    },
  });

  // API calling to delete customer users
  const handleDelete = () => {
    dispatch({ type: DELETE_CUSTOMER_USERS });
    API.delete(`customers/${id}/users/${getDeleteUser.id}`)
      .then((response) => {
        setDeletePopup(false);
        getUsers();
        dispatch({
          type: DELETE_CUSTOMER_USERS_SUCCESS,
          payload: response.data.data,
        });
        toast.success("User Deleted Successfully");
      })
      .catch((error) => {
        if (error.response.data.code === 409) {
          setError(error.response?.data?.message);
        }
        dispatch({ type: DELETE_CUSTOMER_USERS_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDebouncedEffect(() => getUsers(), 1000, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };

  return (
    <div className={classes.JobsWrapper}>
      <div className={classes.tabHeadingRow}>
        <div className={classes.modalWrapper}>
          <AddUser
            handleClickOpen={() => handleAddPopup()}
            handleClose={handleCloseAddPopup}
            open={openAddPopup}
            formik={formik}
            isEdit={getEdit}
            error={error}
          />
        </div>
        <div className={classes.searchWrapper}>
          <div className="form-gourp">
            <TextField
              placeholder="Search users"
              variant="outlined"
              type="search"
              InputProps={{
                endAdornment: <img src={SearchIcon} alt="Search" />,
              }}
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <TableListing
        handleOpen={(user) => handleDeletePopup(user)}
        handleEdit={(editUser) => handleAddPopup(editUser)}
      />
      <DeletePopup
        open={openDeletePopup}
        handleClose={() => setDeletePopup(false)}
        handleDelete={(deleteUsers) => handleDelete(deleteUsers)}
        deleteUser={getDeleteUser.name}
        loading={state.customer?.deletingCustomerUser}
        error={error}
      />
    </div>
  );
}
export default Users;
