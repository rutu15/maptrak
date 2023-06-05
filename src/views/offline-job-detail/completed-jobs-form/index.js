import React from "react";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useStore } from "@store/store";
import Detail from "./detail";
import Location from "./location";
import { CreateJobStyle } from "./style";

function CreateCompletedJobs(props) {
	const classes = CreateJobStyle();
	const [state] = useStore();

	return (
		<div className={classes.CreateCompleteJobWrapper}>
			<div className="white-card card-wrapper">
				{props.error && <Alert severity="error">{props.error}</Alert>}
				<Typography variant="h2">
					Create a Completed Job (for billing purpose)
				</Typography>
				<form
					noValidate
					autoComplete="off"
					className={classes.customForm}
					onSubmit={props.formik.handleSubmit}
				>
					<Detail formik={props.formik} />
					<Location
						formik={props.formik}
						handleChange={props.handleChange}
						handleSelect={props.handleSelect}
					/>
					<div className="bottom-button-block">
						<Button
							className="orange-btn primary-btn"
							color="inherit"
							disableElevation
							type="submit"
							disabled={
								state.job?.creatingCompletedJob ||
								state.job?.creatingCompletedOfflineJob
							}
						>
							{state.job?.creatingCompletedJob ||
							state.job?.creatingCompletedOfflineJob ? (
								<CircularProgress color="inherit" />
							) : (
								"Create"
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateCompletedJobs;
