import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import moment from "moment";

import { useDebouncedEffect } from "@hooks/debounceEffect";
import { useStore } from "@store/store";
import Loader from "@components/loader";
import { uploadImage } from "@utils/commonFunctions";
import DeletePopup from "@components/deletePopup";
import SearchIcon from "@assets/images/search.svg";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import {
  FETCH_CUSTOMER_CREDIT_NOTE,
  FETCH_CUSTOMER_CREDIT_NOTE_SUCCESS,
  FETCH_CUSTOMER_CREDIT_NOTE_FAILURE,
  ADD_CUSTOMER_CREDIT_NOTE,
  ADD_CUSTOMER_CREDIT_NOTE_SUCCESS,
  ADD_CUSTOMER_CREDIT_NOTE_FAILURE,
  EDIT_CUSTOMER_CREDIT_NOTE,
  EDIT_CUSTOMER_CREDIT_NOTE_FAILURE,
  EDIT_CUSTOMER_CREDIT_NOTE_SUCCESS,
  FETCH_CHILD_ORGANISATION,
  FETCH_CHILD_ORGANISATION_SUCCESS,
  FETCH_CHILD_ORGANISATION_FAILURE,
  FETCH_CUSTOMERS,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  IMAGE_UPLOAD,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  DELETE_CUSTOMER_CREDIT_NOTE,
  DELETE_CUSTOMER_CREDIT_NOTE_SUCCESS,
  DELETE_CUSTOMER_CREDIT_NOTE_FAILURE,
  SEND_CREDIT_NOTE,
  SEND_CREDIT_NOTE_SUCCESS,
  SEND_CREDIT_NOTE_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import TableListing from "./table-listing";
import AddCreditNote from "./add-creditnote";
import PreviewPopup from "./preview-popup";
import { CreditNoteStyle } from "./style";

function CreditNote() {
  const classes = CreditNoteStyle();
  const [open, setOpen] = useState(false);
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [getDeleteCreditNote, setDeleteCreditNote] = useState({});
  const [search, setSearch] = useState("");
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [getCreditNote, setCreditNote] = useState(schema.addCreditNoteSchema);
  const [getEdit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [getPreviewData, setPreviewData] = useState({});
  const [state, dispatch] = useStore();
  const { id } = useParams();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getCreditNote,
    validationSchema: validationSchema.addCreditNoteValidationSchema,
    onSubmit: (value) => {
      let data = {
        id: value.id,
        date: moment(value.date).format("yyyy-MM-DD"),
        childCustomerId: value.childCustomer,
        childOrganisationId: value.organisation,
        amount: value.amt,
      };
      data = {
        ...data,
        ...(!!value.desc ? { description: value.desc } : {}),
      };
      if (image) {
        dispatch({
          type: IMAGE_UPLOAD,
        });
        uploadImage(image, image.target.files[0]?.type, "credit-note")
          .then((res) => {
            data = {
              ...data,
              ...(!!res.data.fileName
                ? { approvalDocument: res.data.fileName }
                : {}),
            };
            getEdit ? editCreditNote(data) : addCreditNoteData(data);
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
        getEdit ? editCreditNote(data) : addCreditNoteData(data);
      }
    },
  });

  // https://wymap.atlassian.net/browse/MAPTRAK-943 Make organistion default to customer city
  // API calling to get list of child organisation
  let getChildOrganisation = () => {
    dispatch({ type: FETCH_CHILD_ORGANISATION });
    API.get("childOrganisations")
      .then((response) => {
        dispatch({
          type: FETCH_CHILD_ORGANISATION_SUCCESS,
          payload: response.data.data,
        });
        if (!getEdit) {
          formik.setFieldValue(
            "organisation",
            response.data.data?.rows.find(
              (item) =>
                item?.cities?.id ===
                state.customer?.customerByIdData?.cities?.id
            ).id
          );
        }
      })
      .catch((err) => {
        dispatch({ type: FETCH_CHILD_ORGANISATION_FAILURE, payload: err });
      });
    // https://wymap.atlassian.net/browse/MAPTRAK-932 Added status true to show only active customers
    dispatch({ type: FETCH_CUSTOMERS });
    API.get("customers", {
      params: {
        filter: {
          parent: id,
          status: true,
        },
      },
    })
      .then((response) => {
        dispatch({
          type: FETCH_CUSTOMERS_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error });
      });
  };

  // API calling to get list of credit notes
  let getCreditNoteData = () => {
    const params = {
      ...(!!search ? { search } : {}),
    };
    dispatch({ type: FETCH_CUSTOMER_CREDIT_NOTE });
    API.get(`customers/${id}/creditNotes`, { params })
      .then((response) => {
        dispatch({
          type: FETCH_CUSTOMER_CREDIT_NOTE_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMER_CREDIT_NOTE_FAILURE, payload: error });
      });
  };

  // API calling to add customer's credit note
  let addCreditNoteData = (value) => {
    dispatch({ type: ADD_CUSTOMER_CREDIT_NOTE });
    API.post(`customers/${id}/creditNotes`, value)
      .then((response) => {
        handleCloseAddPopup();
        getCreditNoteData();
        dispatch({
          type: ADD_CUSTOMER_CREDIT_NOTE_SUCCESS,
          payload: response.data.data,
        });
        creditNoteByIdData(response.data.data?.id);
        toast.success("Credit Note Added Successfully");
        handleOpenPreview();
      })
      .catch((error) => {
        setError(error.response?.data?.message);
        dispatch({ type: ADD_CUSTOMER_CREDIT_NOTE_FAILURE, payload: error });
      });
  };

  // API calling to get customer's credit note by id
  let creditNoteByIdData = (c_id) => {
    handleOpenPreview();
    API.get(`customers/${id}/creditNotes/${c_id}`)
      .then((response) => {
        setPreviewData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API calling to edit customer's credit note
  let editCreditNote = (value) => {
    dispatch({ type: EDIT_CUSTOMER_CREDIT_NOTE });
    API.put(`customers/${id}/creditNotes/${value.id}`, value)
      .then((response) => {
        handleCloseAddPopup();
        getCreditNoteData();
        dispatch({
          type: EDIT_CUSTOMER_CREDIT_NOTE_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Credit Note Updated Successfully");
        creditNoteByIdData(value.id);
      })
      .catch((error) => {
        setError(error.response?.data?.message);
        dispatch({ type: EDIT_CUSTOMER_CREDIT_NOTE_FAILURE, payload: error });
      });
  };

  // API calling to delete customer's credit note
  const handleDelete = () => {
    dispatch({ type: DELETE_CUSTOMER_CREDIT_NOTE });
    API.delete(`customers/${id}/creditNotes/${getDeleteCreditNote?.id}`)
      .then((response) => {
        setDeletePopup(false);
        getCreditNoteData();
        dispatch({
          type: DELETE_CUSTOMER_CREDIT_NOTE_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Credit Note Deleted Successfully");
      })
      .catch((error) => {
        toast.error(error.response.data?.message);
        dispatch({ type: DELETE_CUSTOMER_CREDIT_NOTE_FAILURE, payload: error });
      });
  };
  const handleDeletePopup = (note) => {
    setDeleteCreditNote(note);
    setDeletePopup(true);
  };

  const handleAddPopup = (data) => {
    if (data) {
      setEdit(true);
      setCreditNote({
        id: data?.id || "",
        childCustomer: data?.childCustomers?.id || "",
        date: data?.date || "",
        desc: data?.description || "",
        amt: data?.amount || "",
        photo: "",
        organisation: data?.childOrganisations?.id || "",
        viewPhoto: data?.approvalDocument || "",
      });
    }
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setImage(null);
    setEdit(false);
    setOpenAddPopup(false);
    setCreditNote(schema.addCreditNoteSchema);
    setError("");
    formik.handleReset();
  };

  useEffect(() => {
    getCreditNoteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openAddPopup) {
      getChildOrganisation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAddPopup]);

  useDebouncedEffect(() => getCreditNoteData(), 1000, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value.trimStart());
  };

  const handleOpenPreview = (data) => {
    setOpen(true);
    setPreviewData(data);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch({ type: SEND_CREDIT_NOTE });
    API.get(`customers/${id}/creditNotes/${getPreviewData?.id}/sendMail`)
      .then((response) => {
        dispatch({
          type: SEND_CREDIT_NOTE_SUCCESS,
          payload: response.data.data,
        });
        handleClosePreview();
        toast.success("Credit Note Sent SuccessFully");
      })
      .catch((error) => {
        toast.error(error.response.data?.message);
        dispatch({ type: SEND_CREDIT_NOTE_FAILURE, payload: error });
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
    <div className={classes.creditNoteWrapper}>
      <Loader loading={state?.customer.loadingCreditNote} />
      <div className={classes.tabHeadingRow}>
        <div className={classes.modalWrapper}>
          <AddCreditNote
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
              placeholder="Search credit note"
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
        handleEdit={(editCreditNote) => handleAddPopup(editCreditNote)}
        handleOpenPreview={handleOpenPreview}
      />
      <PreviewPopup
        open={open}
        handleClose={handleClosePreview}
        getPreviewData={getPreviewData}
        handleSubmit={handleSubmit}
      />
      <DeletePopup
        open={openDeletePopup}
        handleClose={() => setDeletePopup(false)}
        deleteUser={getDeleteCreditNote.childCustomer}
        error={error}
        handleDelete={(deleteCreditNote) => handleDelete(deleteCreditNote)}
      />
    </div>
  );
}

export default CreditNote;
