import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import cx from "classnames";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import {
  UPDATE_DAILY_MINIMUM_HOURS_CONSIGNMENT,
  UPDATE_DAILY_MINIMUM_HOURS_CONSIGNMENT_SUCCESS,
  UPDATE_DAILY_MINIMUM_HOURS_CONSIGNMENT_FAILURE,
} from "@utils/actionTypes";
import { allowOnlyFloatFour, allowOnlyNumbers } from "@utils/commonFunctions";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import API from "@services/axios";
import { TableStyle } from "./style";

function DailyHoursSemi(props) {
  const classes = TableStyle();
  const [data, setData] = useState(schema.dailyMinimumHoursRigidConsignment);
  const [state, dispatch] = useStore();
  const { id } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: validationSchema.dailyMinimumHoursRigidValidationSchema,
    onSubmit: (value) => {
      const data = {
        ...value,
        truckTypeId: value?.truckTypes?.id ? value?.truckTypes?.id : 2,
      };
      delete data.id;
      delete data.truckTypes;
      const newData = {};
      for(let key in data){
        newData[key] = Number(data[key]);
      }
      dispatch({
        type: UPDATE_DAILY_MINIMUM_HOURS_CONSIGNMENT,
      });
      API.post(`customers/${id}/dailyMinimumHoursConsignment`, newData)
        .then((response) => {
          dispatch({
            type: UPDATE_DAILY_MINIMUM_HOURS_CONSIGNMENT_SUCCESS,
            payload: response.data.data,
          });
          props.getDailyMinimumHoursConsignment();
          toast.success("Consignment Minimum Hours Updated Successfully");
        })
        .catch((error) => {
          dispatch({
            type: UPDATE_DAILY_MINIMUM_HOURS_CONSIGNMENT_FAILURE,
            payload: error,
          });
          toast.error(error?.response?.data?.message);
        });
    },
  });
  useEffect(() => {
    if (state?.customer?.minimunHourConsignmentData?.length !== 0) {
      if (state?.customer?.minimunHourConsignmentData?.length === 1) {
        if (state?.customer?.minimunHourConsignmentData[0].hasOwnProperty("truckTypes")) {
          if (state?.customer?.minimunHourConsignmentData[0].truckTypes.name === "Semi") {
            setData(
              state?.customer?.minimunHourConsignmentData?.find(
                (item) => item.truckTypes?.name === "Semi"
              )
            );
          }
        }
      }
      if (state?.customer?.minimunHourConsignmentData?.length === 2) {
        setData(
          state?.customer?.minimunHourConsignmentData?.find(
            (item) => item.truckTypes?.name === "Semi"
          )
        );
      }
    } else {
      setData(schema.dailyMinimumHoursRigid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className={cx(classes.minimumHours, classes.weeklyMinimumHours)}>
          <label className="label-text"></label>
          <div className={classes.TableWrapper}>
            <TableContainer component={Paper} className={classes.customTable}>
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="day">Day</TableCell>
                    <TableCell className="hours">Semi Min. Hours</TableCell>
                    <TableCell className="amount">Semi Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className="day">Weekday</TableCell>
                    <TableCell className="hours">
                      <TextField
                        name="weekdayHours"
                        variant="outlined"
                        type="text"
                        placeholder="Hours"
                        onKeyPress={allowOnlyNumbers}
                        onChange={formik.handleChange}
                        value={formik.values?.weekdayHours}
                        error={
                          formik.touched.weekdayHours &&
                          Boolean(formik.errors.weekdayHours)
                        }
                        helperText={
                          formik.touched.weekdayHours &&
                          formik.errors.weekdayHours
                        }
                      />
                    </TableCell>
                    <TableCell className="amount">
                      <TextField
                        name="weekdayCharge"
                        variant="outlined"
                        type="text"
                        placeholder="Amount"
                        onKeyPress={allowOnlyFloatFour}
                        onChange={formik.handleChange}
                        value={formik.values?.weekdayCharge}
                        error={
                          formik.touched.weekdayCharge &&
                          Boolean(formik.errors.weekdayCharge)
                        }
                        helperText={
                          formik.touched.weekdayCharge &&
                          formik.errors.weekdayCharge
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="day">Saturday</TableCell>
                    <TableCell className="hours">
                      <TextField
                        name="saturdayHours"
                        variant="outlined"
                        type="text"
                        placeholder="Hours"
                        onKeyPress={allowOnlyNumbers}
                        onChange={formik.handleChange}
                        value={formik.values?.saturdayHours}
                        error={
                          formik.touched.saturdayHours &&
                          Boolean(formik.errors.saturdayHours)
                        }
                        helperText={
                          formik.touched.saturdayHours &&
                          formik.errors.saturdayHours
                        }
                      />
                    </TableCell>
                    <TableCell className="amount">
                      <TextField
                        name="saturdayCharge"
                        variant="outlined"
                        type="text"
                        placeholder="Amount"
                        onKeyPress={allowOnlyFloatFour}
                        onChange={formik.handleChange}
                        value={formik.values?.saturdayCharge}
                        error={
                          formik.touched.saturdayCharge &&
                          Boolean(formik.errors.saturdayCharge)
                        }
                        helperText={
                          formik.touched.saturdayCharge &&
                          formik.errors.saturdayCharge
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="day">Sunday</TableCell>
                    <TableCell className="hours">
                      <TextField
                        name="sundayHours"
                        variant="outlined"
                        type="text"
                        placeholder="Hours"
                        onKeyPress={allowOnlyNumbers}
                        onChange={formik.handleChange}
                        value={formik.values?.sundayHours}
                        error={
                          formik.touched.sundayHours &&
                          Boolean(formik.errors.sundayHours)
                        }
                        helperText={
                          formik.touched.sundayHours &&
                          formik.errors.sundayHours
                        }
                      />
                    </TableCell>
                    <TableCell className="amount">
                      <TextField
                        name="sundayCharge"
                        variant="outlined"
                        type="text"
                        placeholder="Amount"
                        onKeyPress={allowOnlyFloatFour}
                        onChange={formik.handleChange}
                        value={formik.values?.sundayCharge}
                        error={
                          formik.touched.sundayCharge &&
                          Boolean(formik.errors.sundayCharge)
                        }
                        helperText={
                          formik.touched.sundayCharge &&
                          formik.errors.sundayCharge
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="day">Public Holiday 1</TableCell>
                    <TableCell className="hours">
                      <TextField
                        name="publicHoliday1Hours"
                        variant="outlined"
                        type="text"
                        placeholder="Hours"
                        onKeyPress={allowOnlyNumbers}
                        onChange={formik.handleChange}
                        value={formik.values?.publicHoliday1Hours}
                        error={
                          formik.touched.publicHoliday1Hours &&
                          Boolean(formik.errors.publicHoliday1Hours)
                        }
                        helperText={
                          formik.touched.publicHoliday1Hours &&
                          formik.errors.publicHoliday1Hours
                        }
                      />
                    </TableCell>
                    <TableCell className="amount">
                      <TextField
                        name="publicHoliday1Charge"
                        variant="outlined"
                        type="text"
                        placeholder="Amount"
                        onKeyPress={allowOnlyFloatFour}
                        onChange={formik.handleChange}
                        value={formik.values?.publicHoliday1Charge}
                        error={
                          formik.touched.publicHoliday1Charge &&
                          Boolean(formik.errors.publicHoliday1Charge)
                        }
                        helperText={
                          formik.touched.publicHoliday1Charge &&
                          formik.errors.publicHoliday1Charge
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="day">Public Holiday 2</TableCell>
                    <TableCell className="hours">
                      <TextField
                        name="publicHoliday2Hours"
                        variant="outlined"
                        type="text"
                        placeholder="Hours"
                        onKeyPress={allowOnlyNumbers}
                        onChange={formik.handleChange}
                        value={formik.values?.publicHoliday2Hours}
                        error={
                          formik.touched.publicHoliday2Hours &&
                          Boolean(formik.errors.publicHoliday2Hours)
                        }
                        helperText={
                          formik.touched.publicHoliday2Hours &&
                          formik.errors.publicHoliday2Hours
                        }
                      />
                    </TableCell>
                    <TableCell className="amount">
                      <TextField
                        name="publicHoliday2Charge"
                        variant="outlined"
                        type="text"
                        placeholder="Amount"
                        onKeyPress={allowOnlyFloatFour}
                        onChange={formik.handleChange}
                        value={formik.values?.publicHoliday2Charge}
                        error={
                          formik.touched.publicHoliday2Charge &&
                          Boolean(formik.errors.publicHoliday2Charge)
                        }
                        helperText={
                          formik.touched.publicHoliday2Charge &&
                          formik.errors.publicHoliday2Charge
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className={classes.ButtonWrapper}>
            <Button
              className="blue-btn primary-btn"
              color="inherit"
              disableElevation
              underlinenone="true"
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
export default DailyHoursSemi;
