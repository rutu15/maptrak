import React from "react";
import {
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Table,
  Paper,
  FormHelperText,
} from "@material-ui/core";

import { allowOnlyFloatFour } from "@utils/commonFunctions";
import { TableStyle } from "../style";

function Empty(props) {
  const classes = TableStyle();
  return (
    <>
      <TableContainer component={Paper} className={classes.customTable}>
        <Table stickyHeader aria-label="simple table">
          <TableBody>
            {props.emptyData?.map((item, index) => {
              return (
                <TableRow>
                  <TableCell className="weight">Job Charge</TableCell>
                  <TableCell className="amount">
                    <TextField
                      name="charge"
                      variant="outlined"
                      type="text"
                      placeholder="Charge"
                      value={item.charge}
                      onChange={(e) => props.handleEmpty(e, index)}
                      onKeyPress={allowOnlyFloatFour}
                    />
                    <FormHelperText className="error-text">
                      {item.flag === true && item.error}
                    </FormHelperText>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default Empty;
