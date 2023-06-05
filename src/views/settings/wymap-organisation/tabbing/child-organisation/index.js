import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Loader from "@components/loader";
import SearchIcon from "@assets/images/search.svg";
import {
  FETCH_PARENT_ORGANISATION,
  FETCH_PARENT_ORGANISATION_SUCCESS,
  FETCH_PARENT_ORGANISATION_FAILURE,
  GET_STATES,
  GET_STATES_SUCCESS,
  GET_STATES_FAILURE,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILURE,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
  FETCH_CHILD_ORGANISATION,
  FETCH_CHILD_ORGANISATION_SUCCESS,
  FETCH_CHILD_ORGANISATION_FAILURE,
  ADD_CHILD_ORGANISATION,
  ADD_CHILD_ORGANISATION_SUCCESS,
  ADD_CHILD_ORGANISATION_FAILURE,
  EDIT_CHILD_ORGANISATION,
  EDIT_CHILD_ORGANISATION_SUCCESS,
  EDIT_CHILD_ORGANISATION_FAILURE,
  IMAGE_UPLOAD,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
} from "@utils/actionTypes";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { uploadImage } from "@utils/commonFunctions";
import API from "@services/axios";
import TableListing from "./table-listing";
import AddOrganisation from "./add-child-organisation";
import { ChildOrganisationStyle } from "./style";

function ChildOrganisation() {
  const classes = ChildOrganisationStyle();
  const [search, setSearch] = useState("");
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [getEditOrganisation, setEditOrganisation] = useState(
    schema.addOrganisationSchema
  );
  const [getEdit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [state, dispatch] = useStore();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getEditOrganisation,
    validationSchema: getEdit
      ? validationSchema?.editChildOrganisationValidatonSchema
      : validationSchema.addChildOrganisationValidatonSchema,
    onSubmit: (value) => {
      let data = {
        id: value.id,
        name: value.name,
        parentOrganisationId: value.parentOrganisationId,
        address1: value.address1,
        suburb: value.suburb,
        postalCode: value.postalCode,
        countryId: value.countryId,
        stateId: value.stateId,
        ABN: value.ABN,
        phone: value.phone,
        email: value.email,
        accountNumber: value.accountNumber,
        bank: value.bank,
        accountName: value.accountName,
        cityId: value.cityId,
      };
      // https://wymap.atlassian.net/browse/MAPTRAK-927 Make BSB optional
      data = {
        ...data,
        ...(!!value.address2 ? { address2: value.address2 } : {}),
        ...(!!value.fax ? { fax: value.fax } : {}),
        ...(!!value.BSB ? { BSB: value.BSB } : {}),
      };
      if (image) {
        dispatch({
          type: IMAGE_UPLOAD,
        });
        uploadImage(image, image.target.files[0]?.type, "organization-logo")
          .then((res) => {
            data = {
              ...data,
              ...(!!res.data.fileName ? { photo: res.data.fileName } : {}),
            };
            getEdit ? editOrganisation(data) : addOrganisation(data);
            dispatch({
              type: IMAGE_UPLOAD_SUCCESS,
            });
          })
          .catch((err) => {
            dispatch({
              type: IMAGE_UPLOAD_FAILURE,
            });
            toast.error("Image Uploading Failed");
          });
      } else {
        editOrganisation(data);
      }
    },
  });

  // API calling to get list of child organisation
  let getChildOrganisation = () => {
    const params = {
      ...(!!search ? { search } : {}),
    };
    dispatch({ type: FETCH_CHILD_ORGANISATION });
    API.get("childOrganisations", { params })
      .then((response) => {
        dispatch({
          type: FETCH_CHILD_ORGANISATION_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        dispatch({ type: FETCH_CHILD_ORGANISATION_FAILURE, payload: err });
      });
  };

  // API calling to add child organisation
  let addOrganisation = (value) => {
    dispatch({ type: ADD_CHILD_ORGANISATION });
    API.post("childOrganisations", value)
      .then(() => {
        handleCloseAddPopup();
        getChildOrganisation();
        toast.success("Organisation Added Successfully");
        dispatch({
          type: ADD_CHILD_ORGANISATION_SUCCESS,
        });
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        dispatch({ type: ADD_CHILD_ORGANISATION_FAILURE });
      });
  };

  // API calling to edit child organisation
  let editOrganisation = (value) => {
    dispatch({ type: EDIT_CHILD_ORGANISATION });
    API.put(`childOrganisations/${value.id}`, value)
      .then(() => {
        handleCloseAddPopup();
        getChildOrganisation();
        toast.success("Organisation Updated Successfully");
        dispatch({
          type: EDIT_CHILD_ORGANISATION_SUCCESS,
        });
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        dispatch({ type: EDIT_CHILD_ORGANISATION_FAILURE });
      });
  };

  useEffect(() => {
    getChildOrganisation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDebouncedEffect(() => getChildOrganisation(), 1000, [search]);

  useEffect(() => {
    if (openAddPopup) {
      dispatch({ type: FETCH_PARENT_ORGANISATION });
      API.get("parentOrganisations")
        .then((response) => {
          dispatch({
            type: FETCH_PARENT_ORGANISATION_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((err) => {
          dispatch({ type: FETCH_PARENT_ORGANISATION_FAILURE, payload: err });
        });

      if (state?.common?.citiesData === null) {
        dispatch({ type: GET_CITIES });
        API.get("master/cities")
          .then((response) => {
            dispatch({
              type: GET_CITIES_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            dispatch({ type: GET_CITIES_FAILURE, payload: error });
          });
      }

      if (state?.common?.countriesData === null) {
        dispatch({ type: GET_COUNTRIES });
        API.get("master/countries")
          .then((response) => {
            dispatch({
              type: GET_COUNTRIES_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            dispatch({ type: GET_COUNTRIES_FAILURE, payload: error });
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAddPopup]);

  useEffect(() => {
    if (formik.values?.countryId !== getEditOrganisation?.countryId) {
      formik.setFieldValue("stateId", "");
    } else {
      formik.setFieldValue("stateId", getEditOrganisation?.stateId);
    }

    if (formik.values.countryId) {
      dispatch({ type: GET_STATES });
      API.get("master/states", {
        params: {
          countryId: formik.values.countryId,
        },
      })
        .then((response) => {
          dispatch({
            type: GET_STATES_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({ type: GET_STATES_FAILURE, payload: error });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.countryId]);

  const handleAddPopup = (org) => {
    if (org) {
      setEdit(true);
      API.get(`childOrganisations/${org.id}`)
        .then((response) => {
          setEditOrganisation({
            id: response?.data?.data?.id,
            name: response?.data?.data?.name,
            parentOrganisationId: response?.data?.data?.parentOrganisationId,
            cityId: response?.data?.data?.cityId,
            address1: response?.data?.data?.address1,
            address2: response?.data?.data?.address2,
            suburb: response?.data?.data?.suburb,
            postalCode: response?.data?.data?.postalCode,
            countryId: response?.data?.data?.countryId,
            stateId: response?.data?.data?.stateId,
            ABN: response?.data?.data?.ABN,
            phone: response?.data?.data?.phone,
            fax: response?.data?.data?.fax,
            email: response?.data?.data?.email,
            BSB: response?.data?.data?.BSB,
            accountNumber: response?.data?.data?.accountNumber,
            bank: response?.data?.data?.bank,
            accountName: response?.data?.data?.accountName,
            photo: "",
            viewPhoto: response?.data?.data?.photo,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setEdit(false);
    setOpenAddPopup(false);
    setEditOrganisation(schema.addOrganisationSchema);
    setError("");
    formik.handleReset();
    setImage("");
  };

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };

  // Handle Image
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
    <div className={classes.ChildOrganisationWrapper}>
      <Loader loading={state?.organisation?.loadingChildOrganisation} />
      <div className={classes.tabHeadingRow}>
        <div className={classes.modalWrapper}>
          <AddOrganisation
            handleClickOpen={() => handleAddPopup()}
            handleClose={handleCloseAddPopup}
            open={openAddPopup}
            formik={formik}
            isEdit={getEdit}
            error={error}
            handleImage={handleImage}
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
      <TableListing handleEdit={(editAddress) => handleAddPopup(editAddress)} />
    </div>
  );
}

export default ChildOrganisation;
