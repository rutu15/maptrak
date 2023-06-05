import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Typography } from "@material-ui/core";
import { useStore } from "@store/store";
import Header from "@components/header";
import {
	FETCH_OFFLINE_JOBS,
	FETCH_OFFLINE_JOBS_SUCCESS,
	FETCH_OFFLINE_JOBS_FAILURE,
	DELETE_OFFLINE_JOBS,
	DELETE_OFFLINE_JOBS_SUCCESS,
	DELETE_OFFLINE_JOBS_FAILURE,
} from "@utils/actionTypes";
import { rowsPerPageVal } from "@utils/constant";
import API from "@services/axios";
import DeletePopup from "@components/deletePopup";
import PreviewPopup from "./preview-popup";
import TableListing from "./table-listing";
import { OfflineJobListingStyle } from "./style";

function OfflineJobListing() {
	const classes = OfflineJobListingStyle();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageVal);
	const [state, dispatch] = useStore();
	// const [order, setOrder] = useState("");
	// const [orderBy, setOrderBy] = useState("");
	const [open, setOpen] = useState(false);
	const [getPreviewData, setPreviewData] = useState({});
	const [getOfflineJob, setDeleteOfflineJob] = useState({});
	const [openDeletePopup, setDeletePopup] = useState(false);
	const [error, setError] = useState("");

	// API calling to get list of getOfflineJObs
	let getOfflineJobs = () => {
		const params = {
			page: page + 1,
			size: rowsPerPage,
			// ...(!!order ? { order } : {}),
			// ...(!!orderBy ? { orderBy } : {}),
		};
		dispatch({ type: FETCH_OFFLINE_JOBS });
		API.get("jobs/offlineForm", { params })
			.then((response) => {
				dispatch({
					type: FETCH_OFFLINE_JOBS_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: FETCH_OFFLINE_JOBS_FAILURE, payload: error });
			});
	};

	useEffect(() => {
		getOfflineJobs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		page,
		rowsPerPage,
		//  order, orderBy
	]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// const handleSorting = (event, property) => {
	// 	const isAsc = orderBy === property.sortTitle && order === "asc";
	// 	setOrder(isAsc ? "desc" : "asc");
	// 	setOrderBy(property.sortTitle);
	// };

	const handleOpenPreview = (data) => {
		setOpen(true);
		setPreviewData(data);
	};

	const handleClosePreview = () => {
		setOpen(false);
	};

	const handleDeletePopup = (offlineJob) => {
		setDeleteOfflineJob(offlineJob);
		setDeletePopup(true);
	};

	const handleCloseDeletePopup = () => {
		setError();
		setDeletePopup(false);
	};

	const handleDelete = () => {
		dispatch({ type: DELETE_OFFLINE_JOBS });
		API.delete(`jobs/offlineForm/${getOfflineJob.id}`)
			.then((response) => {
				setDeletePopup(false);
				getOfflineJobs();
				dispatch({
					type: DELETE_OFFLINE_JOBS_SUCCESS,
					payload: response.data.data,
				});
				toast.success(response.data.message);
			})
			.catch((error) => {
				if (error.response.data.code === 409) {
					setError(error.response?.data?.message);
					toast.error(error.response?.data?.message);
				}
				dispatch({ type: DELETE_OFFLINE_JOBS_FAILURE, payload: error });
			});
	};
	return (
		<>
			<Header />
			<div className={classes.OfflineJobListingWrapper}>
				<div className="dashboard-page wrapper">
					<div className="inner-page">
						<div className={classes.innerPageTopBlock}>
							<div className="left-block">
								<Typography variant="h1">Offline Jobs</Typography>
							</div>
						</div>
						<TableListing
							count={state?.job?.offlineJobsData?.count}
							data={state?.job}
							page={page}
							handleChangePage={handleChangePage}
							rowsPerPage={rowsPerPage}
							handleChangeRowsPerPage={handleChangeRowsPerPage}
							// handleSorting={(e, property) => handleSorting(e, property)}
							// orderBy={orderBy}
							// order={order}
							handleOpenPreview={handleOpenPreview}
							handleOpen={(offlineJob) => handleDeletePopup(offlineJob)}
						/>
						<PreviewPopup
							open={open}
							handleClose={handleClosePreview}
							getPreviewData={getPreviewData}
						/>
						<DeletePopup
							open={openDeletePopup}
							handleClose={handleCloseDeletePopup}
							handleDelete={(deleteTrailer) => handleDelete(deleteTrailer)}
							deleteUser={`${getOfflineJob?.drivers?.name}'s offline job`}
							loading={state.job?.deletingOfflineJob}
							error={error}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export default OfflineJobListing;
