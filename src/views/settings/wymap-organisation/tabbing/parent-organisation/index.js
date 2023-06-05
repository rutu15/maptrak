import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Loader from "@components/loader";
import {
  FETCH_PARENT_ORGANISATION,
  FETCH_PARENT_ORGANISATION_SUCCESS,
  FETCH_PARENT_ORGANISATION_FAILURE,
  ADD_PARENT_ORGANISATION,
  ADD_PARENT_ORGANISATION_SUCCESS,
  ADD_PARENT_ORGANISATION_FAILURE,
  EDIT_PARENT_ORGANISATION,
  EDIT_PARENT_ORGANISATION_SUCCESS,
  EDIT_PARENT_ORGANISATION_FAILURE,
} from "@utils/actionTypes";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import SearchIcon from "@assets/images/search.svg";
import API from "@services/axios";
import TableListing from "./table-listing";
import AddOrganisation from "./add-parent-organisation";
import { ParentOrganisationStyle } from "./style";

function ParentOrganisation() {
  const classes = ParentOrganisationStyle();
  const [search, setSearch] = useState("");
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [getEditParentOrganisation, setEditParentOrganisation] = useState(
    schema.addParentOrganisationSchema
  );
  const [getEdit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [state, dispatch] = useStore();

  // API calling to get list of parent organisation
  let getParentOrganisation = () => {
    const params = {
      ...(!!search ? { search } : {}),
    };
    dispatch({ type: FETCH_PARENT_ORGANISATION });
    API.get("parentOrganisations", { params })
      .then((response) => {
        dispatch({
          type: FETCH_PARENT_ORGANISATION_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_PARENT_ORGANISATION_FAILURE, payload: err });
      });
  };

  // API calling to add parent organisation
  let addOrganisation = (value) => {
    dispatch({ type: ADD_PARENT_ORGANISATION });
    API.post("parentOrganisations", { name: value.name })
      .then(() => {
        handleCloseAddPopup();
        getParentOrganisation();
        toast.success("Organisation Added Successfully");
        dispatch({
          type: ADD_PARENT_ORGANISATION_SUCCESS,
        });
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch({ type: ADD_PARENT_ORGANISATION_FAILURE });
      });
  };

  // API calling to edit parent organisation
  let editOrganisation = (value) => {
    dispatch({ type: EDIT_PARENT_ORGANISATION });
    API.put(`parentOrganisations/${value.id}`, { name: value.name })
      .then(() => {
        handleCloseAddPopup();
        getParentOrganisation();
        toast.success("Organisation Updated Successfully");
        dispatch({
          type: EDIT_PARENT_ORGANISATION_SUCCESS,
        });
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch({ type: EDIT_PARENT_ORGANISATION_FAILURE });
      });
  };
  useEffect(() => {
    getParentOrganisation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDebouncedEffect(() => getParentOrganisation(), 1000, [search]);

  const handleAddPopup = (org) => {
    if (org) {
      setEdit(true);
      setEditParentOrganisation({
        id: org.id,
        name: org.name,
      });
    }
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setEdit(false);
    setOpenAddPopup(false);
    setError("");
    setEditParentOrganisation(schema.addParentOrganisationSchema);
    formik.handleReset();
  };
  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getEditParentOrganisation,
    validationSchema: validationSchema.parentOrganisationValidationSchema,
    onSubmit: (value) => {
      getEdit ? editOrganisation(value) : addOrganisation(value);
    },
  });

  return (
    <div className={classes.parentOrganisationWrapper}>
      <Loader loading={state?.organisation?.loadingParentOrganisaiton} />
      <div className={classes.tabHeadingRow}>
        <div className={classes.modalWrapper}>
          <AddOrganisation
            handleClickOpen={() => handleAddPopup()}
            handleClose={handleCloseAddPopup}
            open={openAddPopup}
            isEdit={getEdit}
            formik={formik}
            error={error}
          />
        </div>
        <div className={classes.searchWrapper}>
          <div className="form-gourp">
            <TextField
              placeholder="Search organisation"
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
      <TableListing handleEdit={(editOrg) => handleAddPopup(editOrg)} />
    </div>
  );
}

export default ParentOrganisation;
