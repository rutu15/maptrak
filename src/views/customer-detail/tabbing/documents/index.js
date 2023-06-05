import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import { uploadImage } from "@utils/commonFunctions";
import DeletePopup from "@components/deletePopup";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import {
	FETCH_DOCUMENT,
	FETCH_DOCUMENT_SUCCESS,
	FETCH_DOCUMENT_FAILURE,
	DELETE_DOCUMENT,
	DELETE_DOCUMENT_SUCCESS,
	DELETE_DOCUMENT_FAILURE,
	ADD_DOCUMENT,
	ADD_DOCUMENT_SUCCESS,
	ADD_DOCUMENT_FAILURE,
	IMAGE_UPLOAD,
	IMAGE_UPLOAD_SUCCESS,
	IMAGE_UPLOAD_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import TableListing from "./table-listing";
import AddDocument from "./add-document";
import { DocumentStyle } from "./style";

function Documents() {
	const classes = DocumentStyle();
	const [openDeletePopup, setDeletePopup] = useState(false);
	const [getDeleteId, setDeleteId] = useState();
	const [openAddPopup, setOpenAddPopup] = useState(false);
	const [getDocument, setDocument] = useState(schema.addDocumentSchema);
	const [fileName, setFileName] = useState(null);
	const [uploadError, setUploadError] = useState(false);
	const [uploadErrorMsg, setUploadErrorMsg] = useState("");
	const [buttonLoader, setButtonLoader] = useState(false);
	const [, setChatType] = useState("1");
	const [error, setError] = useState("");
	const [image, setImage] = useState(null);
	const [showMsg, setShowMsg] = useState(false);
	const [state, dispatch] = useStore();
	const { id } = useParams();
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: getDocument,
		validationSchema: validationSchema.addDocumentValidationSchema,
		onSubmit: (value) => {
			if (uploadError) {
				setShowMsg(true);
			}
			let data = {
				name: value.name,
			};
			if (image) {
				setButtonLoader(true);
				dispatch({
					type: IMAGE_UPLOAD,
				});
				uploadImage(image, image.target.files[0]?.type, "customer-documents")
					.then((res) => {
						data.documentPath = res?.data?.fileName;
						dispatch({
							type: ADD_DOCUMENT,
						});
						API.post(`customers/${id}/documents`, data)
							.then((response) => {
								getDocuments();
								handleCloseAddPopup();
								setButtonLoader(false);
								dispatch({
									type: ADD_DOCUMENT_SUCCESS,
								});
								toast.success("Document Added Successfully");
								setFileName(null);
								setShowMsg(false);
							})
							.catch((error) => {
								setButtonLoader(false);
								dispatch({
									type: ADD_DOCUMENT_FAILURE,
								});
							});
						setButtonLoader(false);
						dispatch({
							type: IMAGE_UPLOAD_SUCCESS,
						});
					})
					.catch((err) => {
						setButtonLoader(false);
						dispatch({
							type: IMAGE_UPLOAD_FAILURE,
						});
						toast.error("Document Uploading Failed");
					});
			}
		},
	});

	// API calling to get the list of added documents.
	let getDocuments = () => {
		dispatch({ type: FETCH_DOCUMENT });
		API.get(`customers/${id}/documents`)
			.then((response) => {
				dispatch({
					type: FETCH_DOCUMENT_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((err) => {
				dispatch({ type: FETCH_DOCUMENT_FAILURE, payload: err });
			});
	};

	// API calling to delete address
	const handleDelete = () => {
		const deleteIds = {
			documentIds: [],
		};
		deleteIds.documentIds.push(getDeleteId);
		dispatch({ type: DELETE_DOCUMENT });
		API.put(`customers/${id}/documents`, deleteIds)
			.then((response) => {
				setDeletePopup(false);
				getDocuments();
				dispatch({
					type: DELETE_DOCUMENT_SUCCESS,
					payload: response.data.data,
				});
				toast.success("Document Deleted Successfully");
			})
			.catch((error) => {
				toast.error(error.response.data?.message);
				dispatch({ type: DELETE_DOCUMENT_FAILURE, payload: error });
			});
	};
	const handleDeletePopup = (userid) => {
		setDeleteId(userid);
		setDeletePopup(true);
	};

	const handleAddPopup = (data) => {
		setOpenAddPopup(true);
		setUploadError(true);
		setUploadErrorMsg("Please upload document");
	};

	const hadleDownloadOpen = (data) => {
		window.open(data, "_blank");
	};

	const handleCloseAddPopup = () => {
		setImage(null);
		// setEdit(false);
		setOpenAddPopup(false);
		setDocument(schema.addDocumentSchema);
		setError("");
		setFileName(null);
		setShowMsg(false);
		formik.handleReset();
	};

	useEffect(() => {
		getDocuments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (openAddPopup) {
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [openAddPopup]);

	const uploadFile = (event) => {
		if (event?.target?.files && event?.target?.files?.length) {
			setImage(event);
			const type = event.target?.files[0]?.type.split("/")[0]?.trim();
			setFileName(event.target?.files[0]?.name);
			setUploadError(false);
			setUploadErrorMsg("");
			if (type === "video") {
				if (event?.target?.files[0].size > 52428800) {
					setError("You can't upload video more than 50 mb");
					toast.error("You can't upload video more than 50 mb");
				} else setError("");
				setChatType("3");
			} else if (type === "application") {
				setChatType("4");
			} else if (type === "image") {
				if (event?.target?.files[0].size > 10485760) {
					setError("You can't upload image more than 10 mb");
					toast.error("You can't upload image more than 10 mb");
				} else setError("");
				setChatType("2");
			} else {
				setChatType("1");
				setError("");
			}
		}
	};

	return (
		<div className={classes.creditNoteWrapper}>
			<Loader
				loading={
					state?.customer.loadingDocument || state?.customer.deletingDocument
				}
			/>
			<div className={classes.tabHeadingRow}>
				<div className={classes.modalWrapper}>
					<AddDocument
						handleClickOpen={() => handleAddPopup()}
						handleClose={handleCloseAddPopup}
						open={openAddPopup}
						formik={formik}
						error={error}
						uploadFile={uploadFile}
						fileName={fileName}
						uploadError={uploadError}
						uploadErrorMsg={uploadErrorMsg}
						showMsg={showMsg}
						buttonLoader={buttonLoader}
					/>
				</div>
				<div className={classes.searchWrapper}>
					<div className="form-gourp">
						{/* <TextField
              placeholder="Search credit note"
              variant="outlined"
              type="search"
              InputProps={{
                endAdornment: <img src={SearchIcon} alt="Search" />,
              }}
              value={search}
              onChange={handleSearch}
            /> */}
					</div>
				</div>
			</div>
			<TableListing
				handleOpen={(user) => handleDeletePopup(user)}
				handleDownload={(filePath) => hadleDownloadOpen(filePath)}
			/>
			<DeletePopup
				open={openDeletePopup}
				handleClose={() => setDeletePopup(false)}
				deleteUser={""}
				error={error}
				handleDelete={(userid) => handleDelete(userid)}
			/>
		</div>
	);
}

export default Documents;
