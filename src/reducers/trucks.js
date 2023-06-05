import {
  FETCH_TRUCKS,
  FETCH_TRUCKS_SUCCESS,
  FETCH_TRUCKS_FAILURE,
  ADD_TRUCK,
  ADD_TRUCK_SUCCESS,
  ADD_TRUCK_FAILURE,
  EDIT_TRUCK,
  EDIT_TRUCK_SUCCESS,
  EDIT_TRUCK_FAILURE,
  DELETE_TRUCK,
  DELETE_TRUCK_SUCCESS,
  DELETE_TRUCK_FAILURE,
  IMPORT_TRUCK_CSV,
  IMPORT_TRUCK_CSV_SUCCESS,
  IMPORT_TRUCK_CSV_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loadingTrucks: false,
  trucksData: null,
  addingTruck: false,
  addTruckData: null,
  editingTruck: false,
  editTruckData: null,
  deletingTruck: false,
  deleteTruckData: null,
  importingTruckCsv: false,
  importTruckCsv: null,
};

const truckReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_TRUCKS:
      return { ...state, loadingTrucks: true };
    case FETCH_TRUCKS_SUCCESS:
      return { ...state, trucksData: action.payload, loadingTrucks: false };
    case FETCH_TRUCKS_FAILURE:
      return { ...state, trucksData: action.payload, loadingTrucks: false };

    case ADD_TRUCK:
      return { ...state, addingTruck: true };
    case ADD_TRUCK_SUCCESS:
      return {
        ...state,
        addTruckData: action.payload,
        addingTruck: false,
      };
    case ADD_TRUCK_FAILURE:
      return {
        ...state,
        addTruckData: action.payload,
        addingTruck: false,
      };

    case EDIT_TRUCK:
      return { ...state, editingTruck: true };
    case EDIT_TRUCK_SUCCESS:
      return {
        ...state,
        editTruckData: action.payload,
        editingTruck: false,
      };
    case EDIT_TRUCK_FAILURE:
      return {
        ...state,
        editTruckData: action.payload,
        editingTruck: false,
      };

    case DELETE_TRUCK:
      return { ...state, deletingTruck: true };
    case DELETE_TRUCK_SUCCESS:
      return {
        ...state,
        deleteTruckData: action.payload,
        deletingTruck: false,
      };
    case DELETE_TRUCK_FAILURE:
      return {
        ...state,
        deleteTruckData: action.payload,
        deletingTruck: false,
      };

    case IMPORT_TRUCK_CSV:
      return { ...state, importingTruckCsv: true };
    case IMPORT_TRUCK_CSV_SUCCESS:
      return {
        ...state,
        importTruckCsv: action.payload,
        importingTruckCsv: false,
      };
    case IMPORT_TRUCK_CSV_FAILURE:
      return {
        ...state,
        importTruckCsv: action.payload,
        importingTruckCsv: false,
      };

    default:
      return state;
  }
};
export default truckReducer;
