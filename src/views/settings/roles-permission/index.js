import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Typography } from "@material-ui/core";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import DeletePopup from "@components/deletePopup";
import Header from "@components/header";
import ProfileSideBar from "@components/profile-sidebar";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import {
  FETCH_ROLES,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
  ADD_ROLE,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAILURE,
  EDIT_ROLE,
  EDIT_ROLE_SUCCESS,
  EDIT_ROLE_FAILURE,
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE,
  GET_PERMISSIONS,
  GET_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_FAILURE,
  GET_ROLES_PERMISSIONS,
  GET_ROLES_PERMISSIONS_SUCCESS,
  GET_ROLES_PERMISSIONS_FAILURE,
  SET_ROLES_PERMISSIONS,
  SET_ROLES_PERMISSIONS_SUCCESS,
  SET_ROLES_PERMISSIONS_FAILURE,
} from "@utils/actionTypes";
import { getPermissions } from "@utils/commonFunctions";
import { rowsPerPageVal } from "@utils/constant";
import API from "@services/axios";
import AddRole from "./add-role";
import TableListing from "./table-listing";
import { RoleStyle } from "./style";

function RolesPermission() {
  const classes = RoleStyle();
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [getDeleteRole, setDeleteRole] = useState({});
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [getEditRole, setEditRole] = useState(schema.addRoleSchema);
  const [getEdit, setEdit] = useState(false);
  const [openPermissionPopup, setPermissionPopup] = useState(false);
  const [permission, setPermission] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
  const [roleId, setRoleID] = useState(0);
  const [err, setErr] = useState("");
  const [state, dispatch] = useStore();

  // API calling to get list of roles
  let getRoles = () => {
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
  };

  // API calling to add role
  let addRole = (values) => {
    dispatch({ type: ADD_ROLE });
    API.post("roles", values)
      .then((response) => {
        handleCloseAddPopup();
        toast.success("Role Added Successfully");
        dispatch({
          type: ADD_ROLE_SUCCESS,
          payload: response.data.data,
        });
        getRoles();
      })
      .catch((error) => {
        if (error.response.data.code === 409)
          setErr(error.response?.data?.message);
        dispatch({ type: ADD_ROLE_FAILURE, payload: error });
      });
  };

  // API calling to edit role
  let editRole = (values) => {
    dispatch({ type: EDIT_ROLE });
    API.put(`roles/${values.id}`, values)
      .then((response) => {
        handleCloseAddPopup();
        getRoles();
        toast.success("Role Updated Successfully");
        dispatch({
          type: EDIT_ROLE_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        if (error.response.data.code === 409)
          setErr(error.response?.data?.message);
        dispatch({ type: EDIT_ROLE_FAILURE, payload: error });
      });
  };

  // API calling to get list of permissions
  useEffect(() => {
    if (getPermissions().includes("rolePermission")) {
      dispatch({ type: GET_PERMISSIONS });
      API.get("permissions")
        .then((response) => {
          dispatch({
            type: GET_PERMISSIONS_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_PERMISSIONS_FAILURE, payload: error });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  // API calling to delete role
  const handleDelete = () => {
    dispatch({ type: DELETE_ROLE });
    API.delete(`roles/${getDeleteRole.id}`)
      .then((response) => {
        handleCloseDeletePopup();
        getRoles();
        toast.success("Role Deleted Successfully");
        dispatch({
          type: DELETE_ROLE_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        if (error.response.data.code === 409) {
          setErr(error.response?.data?.message);
        }
        dispatch({ type: DELETE_ROLE_FAILURE, payload: error });
      });
  };

  const handleCloseDeletePopup = () => {
    setDeletePopup(false);
    setErr("");
  };

  const handleDeletePopup = (user) => {
    setDeleteRole(user);
    setDeletePopup(true);
  };

  const handleAddPopup = (user) => {
    if (user) {
      setEdit(true);
      setEditRole({
        id: user.id,
        name: user.name,
        status: user.status ? 1 : 0,
      });
    }
    setOpenAddPopup(true);
  };
  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
    setEdit(false);
    setEditRole(schema.addRoleSchema);
    formik.handleReset();
    setErr("");
  };

  // API calling to get permissions of roles in popup
  const handlePermissionPopup = (id) => {
    dispatch({ type: GET_ROLES_PERMISSIONS });
    API.get(`roles/${id}/permissions`)
      .then((response) => {
        const permissionId = response.data?.data?.map((item) => {
          return item.permissionId;
        });
        setPermission(permissionId);
        dispatch({
          type: GET_ROLES_PERMISSIONS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: GET_ROLES_PERMISSIONS_FAILURE, payload: error });
      });
    setPermissionPopup(true);
    setRoleID(id);
  };

  const handleClosePermissionPopup = () => {
    setPermissionPopup(false);
    setPermission([]);
  };

  // API calling to assign access/permission to particular role
  const assignPermission = () => {
    dispatch({ type: SET_ROLES_PERMISSIONS });
    API.post(`roles/${roleId}/permissions`, {
      permissions: permission,
    })
      .then((response) => {
        handleClosePermissionPopup();
        toast.success("Permission Assigned Successfully");
        dispatch({
          type: SET_ROLES_PERMISSIONS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: SET_ROLES_PERMISSIONS_FAILURE, payload: error });
      });
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
    initialValues: getEditRole,
    validationSchema: validationSchema.addRoleValidationSchema,
    onSubmit: (values) => {
      getEdit ? editRole(values) : addRole(values);
    },
  });

  //  List of menu to show in permission popup to assign permission
  const menuData = state.rolesPermission.permissionsData?.map((item) => {
    return {
      value: item.id,
      label: item.description,
    };
  });
  const permissionChange = (event) => {
    setPermission(event.target.value);
  };
  return (
    <>
      <Header />
      <div className={classes.RoleListingWrapper}>
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
                      <Typography variant="h1">Roles List</Typography>
                    </div>
                    <div className="right-block">
                      <div className="right-block-inner">
                        <div className="modal-wrapper">
                          <div className="btn-wrapper">
                            <AddRole
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
                    openPermissionPopup={openPermissionPopup}
                    handleClickOpen={(id) => handlePermissionPopup(id)}
                    handleClosePermission={handleClosePermissionPopup}
                    permissionData={permission}
                    menuData={menuData}
                    permissionChange={permissionChange}
                    assignPermission={() => assignPermission()}
                    page={page}
                    handleChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                  <DeletePopup
                    open={openDeletePopup}
                    handleClose={handleCloseDeletePopup}
                    handleDelete={handleDelete}
                    deleteUser={getDeleteRole.name}
                    loading={state.rolesPermission.deletingRole}
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
export default RolesPermission;
