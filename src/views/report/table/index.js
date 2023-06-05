import {
	TableCell,
	TableRow,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	Paper,
} from "@material-ui/core";

import { useStore } from "@store/store";
import AwbRow from "./AwbRow";
import Row from "./row";
import { tableStyles } from "./style";

function TableDynamic(props) {
	const classes = tableStyles();
	const [state] = useStore();

	return (
		<>
			<TableContainer component={Paper} className={classes.customTable}>
				<Table stickyHeader aria-label="simple table">
					<TableHead>
						<TableRow>
							{props?.reportsHeading?.map((item, index) => {
								return (
									<TableCell key={index} className={item.className}>
										{item.title}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{state?.report?.reportData?.count === 0 ? (
							<TableRow>
								<TableCell colSpan={5}>No Data Found</TableCell>
							</TableRow>
						) : (
							state?.report?.reportData?.rows?.map((row, id) => {
								return props.getTab === 3 ? (
									<AwbRow key={id} row={row} unique={id} />
								) : (
									<Row key={id} row={row} unique={id} getTab={props.getTab} />
								);
							})
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default TableDynamic;
