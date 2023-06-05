import React, { useState, useEffect } from "react";
import { TextareaAutosize, Button, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
	FETCH_NOTE,
	FETCH_NOTE_SUCCESS,
	FETCH_NOTE_FAILURE,
	UPDATE_NOTE,
	UPDATE_NOTE_SUCCESS,
	UPDATE_NOTE_FAILURE,
} from "@utils/actionTypes";
import { useStore } from "@store/store";
import API from "@services/axios";
import { NoteStyle } from "./style";

function Note() {
	const classes = NoteStyle();
	const [state, dispatch] = useStore();
	const [data, setData] = useState(state?.customer?.noteData?.note);
	const { id } = useParams();

	const getNote = () => {
		dispatch({ type: FETCH_NOTE });
		API.get(`customers/${id}/note`)
			.then((response) => {
				dispatch({
					type: FETCH_NOTE_SUCCESS,
					payload: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({ type: FETCH_NOTE_FAILURE, payload: error });
			});
	};

	const handleChange = (e) => {
		setData(e.target.value);
	};

	const handleSubmit = () => {
		if (data === null) {
			const newData = {
				note: "",
			};
			dispatch({ type: UPDATE_NOTE });
			API.put(`customers/${id}/note`, newData)
				.then((response) => {
					dispatch({
						type: UPDATE_NOTE_SUCCESS,
						payload: response.data.data,
					});
					toast.success("Note Updated Successfully");
				})
				.catch((error) => {
					dispatch({ type: UPDATE_NOTE_FAILURE, payload: error });
					toast.error(error?.response?.data?.message);
				});
		} else {
			const newData = {
				note: data,
			};
			dispatch({ type: UPDATE_NOTE });
			API.put(`customers/${id}/note`, newData)
				.then((response) => {
					dispatch({
						type: UPDATE_NOTE_SUCCESS,
						payload: response.data.data,
					});
					toast.success("Note Updated Successfully");
					getNote();
				})
				.catch((error) => {
					dispatch({ type: UPDATE_NOTE_FAILURE, payload: error });
					toast.error(error?.response?.data?.message);
				});
		}
	};
	useEffect(() => {
		if (state?.customer?.noteData?.note === undefined) {
			getNote();
		}
		setData(state?.customer?.noteData?.note);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.customer?.noteData?.note]);

	useEffect(() => {
		if (state?.customer?.noteData?.note !== undefined) {
			getNote();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={classes.NoteWrapper}>
			<div className={classes.customBox}>
				<Typography>Note</Typography>
				<TextareaAutosize
					rowsMax={3}
					name="note"
					aria-label="note"
					placeholder="Note"
					value={data === null || data === undefined ? "" : data}
					onChange={handleChange}
				/>

				<div className="bottom-button-block">
					<Button
						className="orange-btn primary-btn"
						color="inherit"
						disableElevation
						underlinenone="true"
						onClick={handleSubmit}
					>
						SAVE
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Note;
