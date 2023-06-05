import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, FormControl } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { enAU } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

import { useStore } from "@store/store";
import Loader from "@components/loader";
import {
  UPDATE_VALIDITY,
  UPDATE_VALIDITY_SUCCESS,
  UPDATE_VALIDITY_FAILURE,
} from "@utils/actionTypes";
import API from "@services/axios";
import calendarIcon from "@assets/images/calendar-icon.svg";
import { ValidityStyle } from "./style";

function Validity(props) {
  const classes = ValidityStyle();
  const [state, dispatch] = useStore();
  const [data, setData] = useState(
    state.customer?.customerByIdData?.pricingValidity
  );
  const { id } = useParams();

  const handleChange = (date) => {
    setData(date);
  };

  const handleSubmit = () => {
    dispatch({
      type: UPDATE_VALIDITY,
    });
    API.patch(`customers/${id}/saveData`, {
      pricingValidity: moment(data).format("YYYY-MM-DD"),
    })
      .then((response) => {
        dispatch({
          type: UPDATE_VALIDITY_SUCCESS,
          payload: response.data.data,
        });
        toast.success("Validity Updated Successfully");
        props.getCustomer();
      })
      .catch((error) => {
        dispatch({ type: UPDATE_VALIDITY_FAILURE, payload: error });
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <>
      <div className={classes.ValidityWrapper}>
        <div className="date-wrapper">
          <Loader loading={state?.customer?.updatingValidity} />
          <FormControl variant="outlined" className={classes.formControl}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enAU}>
              <KeyboardDatePicker
                variant="inline"
                format="dd/MM/yyyy"
                placeholder="DD/MM/YYYY"
                value={data}
                className="custom-datepicker"
                onChange={handleChange}
                autoOk
                keyboardIcon={<img src={calendarIcon} alt="calendar" />}
                // minDate={new Date()}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
        <Button
          className="blue-btn primary-btn"
          color="inherit"
          disableElevation
          underlinenone="true"
          onClick={handleSubmit}
          disabled={data === null}
        >
          Save
        </Button>
      </div>
    </>
  );
}
export default Validity;
