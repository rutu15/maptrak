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
              <TableCell className="cargoType">Sub Cargo Type</TableCell>
              <TableCell className="weight">Charge</TableCell>
              <TableCell className="amount">Charge Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="cargoType">{"AKE"}</TableCell>
              <TableCell className="weight">
                <TextField
                  name="charge1"
                  variant="outlined"
                  type="text"
                  placeholder="Charge"
                  value={props.charge1}
                  onChange={(e) => props.handleInputChange(e)}
                  onKeyPress={allowOnlyFloatFour}
                />
                <FormHelperText className="error-text">
                  {(props.chargeError1 !== "" && props.chargeError1) ||
                    (props.extraCharge && props.charge1 > 0
                      ? "Value must be zero"
                      : "")}
                </FormHelperText>
              </TableCell>
              <TableCell className="amount">
                <FormControl variant="outlined">
                  <Select
                    name="chargeType1"
                    displayEmpty
                    className={materilClasses.customSelect}
                    menuprops={{
                      classes: {
                        paper: materilClasses.customSelect,
                      },
                    }}
                    value={props.chargeType1}
                    onChange={(e) => props.handleChargeChange(e)}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Select Charge Type
                    </MenuItem>
                    <MenuItem value={"QTY"}>Per Quantity</MenuItem>
                    <MenuItem value={"KG"}>Per KG</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText className="error-text">
                  {!props.extraCharge &&
                    props.chargeType1 === "" &&
                    "Please select charge Type"}
                </FormHelperText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="cargoType">{"Main Deck"}</TableCell>
              <TableCell className="weight">
                <TextField
                  name="charge2"
                  variant="outlined"
                  type="text"
                  placeholder="Charge"
                  value={props.charge2}
                  onChange={(e) => props.handleInputChange(e)}
                  onKeyPress={allowOnlyFloatFour}
                />
                <FormHelperText className="error-text">
                  {(props.chargeError2 !== "" && props.chargeError2) ||
                    (props.extraCharge && props.charge2 > 0
                      ? "Value must be zero"
                      : "")}
                </FormHelperText>
              </TableCell>
              <TableCell className="amount">
                <FormControl variant="outlined">
                  <Select
                    name="chargeType2"
                    displayEmpty
                    className={materilClasses.customSelect}
                    menuprops={{
                      classes: {
                        paper: materilClasses.customSelect,
                      },
                    }}
                    value={props.chargeType2}
                    onChange={(e) => props.handleChargeChange(e)}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Select Charge Type
                    </MenuItem>
                    <MenuItem value={"QTY"}>Per Quantity</MenuItem>
                    <MenuItem value={"KG"}>Per KG</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText className="error-text">
                  {!props.extraCharge &&
                    props.chargeType2 === "" &&
                    "Please select charge Type"}
                </FormHelperText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="cargoType">{"Over Hang"}</TableCell>
              <TableCell className="weight">
                <TextField
                  name="charge3"
                  variant="outlined"
                  type="text"
                  placeholder="Charge"
                  value={props.charge3}
                  onChange={(e) => props.handleInputChange(e)}
                  onKeyPress={allowOnlyFloatFour}
                />
                <FormHelperText className="error-text">
                  {(props.chargeError3 !== "" && props.chargeError3) ||
                    (props.extraCharge && props.charge3 > 0
                      ? "Value must be zero"
                      : "")}
                </FormHelperText>
              </TableCell>
              <TableCell className="amount">
                <FormControl variant="outlined">
                  <Select
                    name="chargeType3"
                    displayEmpty
                    className={materilClasses.customSelect}
                    menuprops={{
                      classes: {
                        paper: materilClasses.customSelect,
                      },
                    }}
                    value={props.chargeType3}
                    onChange={(e) => props.handleChargeChange(e)}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Select Charge Type
                    </MenuItem>
                    <MenuItem value={"QTY"}>Per Quantity</MenuItem>
                    <MenuItem value={"KG"}>Per KG</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText className="error-text">
                  {!props.extraCharge &&
                    props.chargeType3 === "" &&
                    "Please select charge Type"}
                </FormHelperText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="cargoType">{"20' ULD"}</TableCell>
              <TableCell className="weight">
                <TextField
                  name="charge4"
                  variant="outlined"
                  type="text"
                  placeholder="Charge"
                  value={props.charge4}
                  onChange={(e) => props.handleInputChange(e)}
                  onKeyPress={allowOnlyFloatFour}
                />
                <FormHelperText className="error-text">
                  {(props.chargeError4 !== "" && props.chargeError4) ||
                    (props.extraCharge && props.charge4 > 0
                      ? "Value must be zero"
                      : "")}
                </FormHelperText>
              </TableCell>
              <TableCell className="amount">
                <FormControl variant="outlined">
                  <Select
                    name="chargeType4"
                    displayEmpty
                    className={materilClasses.customSelect}
                    menuprops={{
                      classes: {
                        paper: materilClasses.customSelect,
                      },
                    }}
                    value={props.chargeType4}
                    onChange={(e) => props.handleChargeChange(e)}
                    IconComponent={() => <ExpandMore />}
                  >
                    <MenuItem value={""} disabled>
                      Select Charge Type
                    </MenuItem>
                    <MenuItem value={"QTY"}>Per Quantity</MenuItem>
                    <MenuItem value={"KG"}>Per KG</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText className="error-text">
                  {!props.extraCharge &&
                    props.chargeType4 === "" &&
                    "Please select charge Type"}
                </FormHelperText>
              </TableCell>
            </TableRow>
            {/* ); */}
            {/* // })} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default MinimumHours;
