import {
  FETCH_HOLIDAYS,
  FETCH_HOLIDAYS_SUCCESS,
  FETCH_HOLIDAYS_FAILURE,
  ADD_HOLIDAYS,
  ADD_HOLIDAYS_SUCCESS,
  ADD_HOLIDAYS_FAILURE,
  EDIT_HOLIDAYS,
  EDIT_HOLIDAYS_SUCCESS,
  EDIT_HOLIDAYS_FAILURE,
  DELETE_HOLIDAYS,
  DELETE_HOLIDAYS_SUCCESS,
  DELETE_HOLIDAYS_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loadingHolidays: false,
  holidaysData: null,
  addingHolidays: false,
  addHolidaysData: null,
  editingHolidays: false,
  editHolidaysData: null,
  deletingHolidays: false,
  deleteHolidaysData: null,
};

const holidaysReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_HOLIDAYS:
      return { ...state, loadingHolidays: true };
    case FETCH_HOLIDAYS_SUCCESS:
      return { ...state, holidaysData: action.payload, loadingHolidays: false };
    case FETCH_HOLIDAYS_FAILURE:
      return { ...state, holidaysData: action.payload, loadingHolidays: false };

    case ADD_HOLIDAYS:
      return { ...state, addingHolidays: true };
    case ADD_HOLIDAYS_SUCCESS:
      return {
        ...state,
        addHolidaysData: action.payload,
        addingHolidays: false,
      };
    case ADD_HOLIDAYS_FAILURE:
      return {
        ...state,
        addHolidaysData: action.payload,
        addingHolidays: false,
      };

    case EDIT_HOLIDAYS:
      return { ...state, editingHolidays: true };
    case EDIT_HOLIDAYS_SUCCESS:
      return {
        ...state,
        editHolidaysData: action.payload,
        editingHolidays: false,
      };
    case EDIT_HOLIDAYS_FAILURE:
      return {
        ...state,
        editHolidaysData: action.payload,
        editingHolidays: false,
      };

    case DELETE_HOLIDAYS:
      return { ...state, deletingHolidays: true };
    case DELETE_HOLIDAYS_SUCCESS:
      return {
        ...state,
        deleteHolidaysData: action.payload,
        deletingHolidays: false,
      };
    case DELETE_HOLIDAYS_FAILURE:
      return {
        ...state,
        deleteHolidaysData: action.payload,
        deletingHolidays: false,
      };

    default:
      return state;
  }
};
export default holidaysReducer;
