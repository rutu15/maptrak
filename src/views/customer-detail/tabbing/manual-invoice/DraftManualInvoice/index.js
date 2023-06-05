import API from "@services/axios";
import { useStore } from "@store/store";
import {
  FETCH_CUSTOMER_CREDIT_NOTE,
  FETCH_CUSTOMER_CREDIT_NOTE_FAILURE,
  FETCH_CUSTOMER_CREDIT_NOTE_SUCCESS,
} from "@utils/actionTypes";
import React, { useEffect } from "react";
import TableListing from "./table-listing";

const DraftManualInvoice = () => {
  // eslint-disable-next-line
  const [state, dispatch] = useStore();

  // API calling to get list of credit notes
  let getCreditNoteData = () => {
    dispatch({ type: FETCH_CUSTOMER_CREDIT_NOTE });
    API.get(`customers/153/creditNotes`)
      .then((response) => {
        console.log(response.data.data, " << RESPONSE");
        dispatch({
          type: FETCH_CUSTOMER_CREDIT_NOTE_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_CUSTOMER_CREDIT_NOTE_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    getCreditNoteData();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <TableListing />
    </div>
  );
};

export default DraftManualInvoice;
