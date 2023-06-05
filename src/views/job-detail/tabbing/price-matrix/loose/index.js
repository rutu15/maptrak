import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Table,
  Paper,
  FormHelperText,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import { allowOnlyFloatFour } from "@utils/commonFunctions";
import { materialCommonStyles } from "@utils/materialCommonStyles";
import { TableStyle } from "../style";

function MinimumHours(props) {
  const classes = TableStyle();
  const materilClasses = materialCommonStyles();
  return (
    <>
      <TableContainer component={Paper} className={classes.customTable}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="weight">Charge</TableCell>
              <TableCell className="amount">Charge Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.looseData?.map((item, index) => {
              return (
                <TableRow>
                  <TableCell className="weight">
                    <TextField
                      name="charge"
                      variant="outlined"
                      type="text"
                      placeholder="Charge"
                      value={item.charge}
                      onChange={(e) => props.handleChangeLoose(e, index)}
                      onKeyPress={allowOnlyFloatFour}
                    />
                    <FormHelperText className="error-text">
                      {item.flag === true && item.error}
                    </FormHelperText>
                  </TableCell>
                  <TableCell className="amount">
                    <FormControl variant="outlined">
                      <Select
                        name="chargeType"
                        displayEmpty
                        className={materilClasses.customSelect}
                        menuprops={{
                          classes: { paper: materilClasses.customSelect },
                        }}
                        value={item.chargeType}
                        onChange={(e) => props.handleChangeLoose(e, index)}
                        IconComponent={() => <ExpandMore />}
                      >
                        <MenuItem value={""} disabled>
                          Select Charge Type
                        </MenuItem>
                        <MenuItem value="HOUR">Per Hour</MenuItem>
                        <MenuItem value="KG">Per KG</MenuItem>
                      </Select>
                    </FormControl>
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
export default MinimumHours;
