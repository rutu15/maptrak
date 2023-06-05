import {
  FETCH_TOLL_LOCATION,
  FETCH_TOLL_LOCATION_SUCCESS,
  FETCH_TOLL_LOCATION_FAILURE,
  DELETE_TOLL_LOCATION,
  DELETE_TOLL_LOCATION_SUCCESS,
  DELETE_TOLL_LOCATION_FAILURE,
  ADD_TOLL_LOCATION,
  ADD_TOLL_LOCATION_SUCCESS,
  ADD_TOLL_LOCATION_FAILURE,
  EDIT_TOLL_LOCATION,
  EDIT_TOLL_LOCATION_SUCCESS,
  EDIT_TOLL_LOCATION_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loading: false,
  tollLocations: null,
  addingTollLocation: false,
  addTollLocationData: null,
  editingTollLocation: false,
  editTollLocation: null,
  deletingTollLocation: false,
  deleteTollLocationData: null,
};

const tollLocationReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_TOLL_LOCATION:
      return { ...state, loading: true };
    case FETCH_TOLL_LOCATION_SUCCESS:
      return { ...state, tollLocations: action.payload, loading: false };
    case FETCH_TOLL_LOCATION_FAILURE:
      return { ...state, tollLocations: action.payload, loading: false };

    case DELETE_TOLL_LOCATION:
      return { ...state, deletingTollLocation: true };
    case DELETE_TOLL_LOCATION_SUCCESS:
      return {
        ...state,
        deleteTollLocationData: action.payload,
        deletingTollLocation: false,
      };
    case DELETE_TOLL_LOCATION_FAILURE:
      return {
        ...state,
        deleteTollLocationData: action.payload,
        deletingTollLocation: false,
      };

    case ADD_TOLL_LOCATION:
      return { ...state, addingTollLocation: true };
    case ADD_TOLL_LOCATION_SUCCESS:
      return {
        ...state,
        addTollLocationData: action.payload,
        addingTollLocation: false,
      };
    case ADD_TOLL_LOCATION_FAILURE:
      return {
        ...state,
        addTollLocationData: action.payload,
        addingTollLocation: false,
      };

    case EDIT_TOLL_LOCATION:
      return { ...state, editingTollLocation: true };
    case EDIT_TOLL_LOCATION_SUCCESS:
      return {
        ...state,
        editTollLocation: action.payload,
        editingTollLocation: false,
      };
    case EDIT_TOLL_LOCATION_FAILURE:
      return {
        ...state,
        editTollLocation: action.payload,
        editingTollLocation: false,
      };

    default:
      return state;
  }
};
export default tollLocationReducer;
