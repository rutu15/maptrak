import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { useStore } from "@store/store";
import Header from "@components/header";
import { routes } from "@utils/constant";
import {
	GET_ONLINE_REQUEST_BY_ID,
	GET_ONLINE_REQUEST_BY_ID_SUCCESS,
	GET_ONLINE_REQUEST_BY_ID_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import EditBlock from "./edit-block";
import { JobDetailStyle } from "./style";
import TableListingConsignment from "./table-listing-consignment";
import TableListingAwb from "./table-listing-awb";

function DetailPage() {
	const classes = JobDetailStyle();
	const { id } = useParams();
	const history = useHistory();
	const [state, dispatch] = useStore();

	// API calling to get particular online request by ID
	let getOnlineRequestById = () => {
		dispatch({ type: GET_ONLINE_REQUEST_BY_ID });
		API.get(`onlineRequests/${id}`)
			.then((response) => {
				dispatch({
					type: GET_ONLINE_REQUEST_BY_ID_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: GET_ONLINE_REQUEST_BY_ID_FAILURE, payload: error });
				if (error?.response?.status === 404) {
					history.push(routes.pageNotFound);
				}
			});
	};

	useEffect(() => {
		getOnlineRequestById();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			<div className={classes.JobDetailWrapper}>
				<div className="wrapper job-detail-page">
					<div className="inner-page">
						<div className={classes.backLinkWrapper}>
							<Link to={routes.onlineRequest} className={classes.backToPage}>
								<ArrowBackIosIcon /> Back to online request
							</Link>
						</div>
						<div className="detail-col-layout">
							<div className="left-block">
								<EditBlock />
							</div>
							<div className="right-block">
								{["Import", "Export", "Empty", "Temp Control"].includes(
									state.onlineRequest?.getOnlineRequestById?.jobTypes?.name
								) ? (
									<TableListingAwb />
								) : (
									<TableListingConsignment />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default DetailPage;
