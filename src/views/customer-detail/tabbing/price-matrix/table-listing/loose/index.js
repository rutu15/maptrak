import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import cx from "classnames";
import { useFormik } from "formik";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import {
  UPDATE_PRICE_MATRIX_SUCCESS,
  UPDATE_PRICE_MATRIX_FAILURE,
} from "@utils/actionTypes";
import validationSchema from "@utils/validationSchemas";
import API from "@services/axios";
import Popup from "./popup";
import { TableStyle } from "./style";

function LooseListing(props) {
  const classes = TableStyle();
  const [open, setOpen] = useState(false);
  const [week, setWeek] = useState({});
  const [state, dispatch] = useStore();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const data = state?.customer?.priceMatrixData?.filter((item) => {
    return item?.cargoTypes?.name === "Loose";
  });

  useEffect(() => {
    return () => {
      setWeek({});
    };
  }, []);

  const handleClickOpen = (val, i) => {
    setWeek(val);
    setOpen(true);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: week,
    validationSchema: validationSchema.priceMatrixLooseValidationSchema,
    onSubmit: (value) => {
      // Need to delete because we are using common api with different params for ULD and loose
      delete value.jobTypes;
      delete value.uldTypes;
      delete value.truckTypes;
      delete value.cargoTypes;
      setLoading(true);
      API.put(`customers/${id}/priceMatrix/${value.id}`, value)
        .then((response) => {
          dispatch({
            type: UPDATE_PRICE_MATRIX_SUCCESS,
            payload: response.data.data,
          });
          setLoading(false);
          props.getPriceMatrix();
          handleClose();
          toast.success("Pricing Updated Successfully");
        })
        .catch((error) => {
          setLoading(false);
          dispatch({ type: UPDATE_PRICE_MATRIX_FAILURE, payload: error });
          toast.error(error?.response?.data?.message);
        });
    },
  });
  const handleClose = () => {
    setOpen(false);
    formik.handleReset();
  };

  return (
    <>
      <div className={cx(classes.minimumHours, classes.dailyMinimumHours)}>
        <div className={classes.TableWrapper}>
          <Loader loading={state?.customer?.loadingPriceMatrix} />
          <TableContainer component={Paper} className={classes.customTable}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="jobType">Job Type</TableCell>
                  <TableCell className="truckType">Truck Type</TableCell>
                  <TableCell className="pricing">Pricing</TableCell>
                  <TableCell className="savePricing">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="jobType">
                      {row.jobTypes ? row.jobTypes.name : "-"}
                    </TableCell>
                    <TableCell className="truckType">
                      {row.truckTypes ? row.truckTypes.name : "-"}
                    </TableCell>
                    <TableCell className="pricing">
                      {`WD: $${row.weekDaysWage}; Sat: $${row.saturdayWage}; Sun: $${row.sundayWage}; PH1: $${row.publicHoliday1Wage}; PH2: $${row.publicHoliday2Wage}; `}
                    </TableCell>
                    <TableCell className="savePricing">
                      <span onClick={() => handleClickOpen(row, index)}>
                        Edit Pricing
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Popup
        handleClose={handleClose}
        open={open}
        formik={formik}
        loading={loading}
      />
    </>
  );
}
export default LooseListing;
