import {
  FETCH_TRAILER,
  FETCH_TRAILER_SUCCESS,
  FETCH_TRAILER_FAILURE,
  ADD_TRAILER,
  ADD_TRAILER_SUCCESS,
  ADD_TRAILER_FAILURE,
  EDIT_TRAILER,
  EDIT_TRAILER_SUCCESS,
  EDIT_TRAILER_FAILURE,
  DELETE_TRAILER,
  DELETE_TRAILER_SUCCESS,
  DELETE_TRAILER_FAILURE,
  IMPORT_TRAILER_CSV,
  IMPORT_TRAILER_CSV_SUCCESS,
  IMPORT_TRAILER_CSV_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loadingTrailer: false,
  trailersData: null,
  addingTrailer: false,
  addTrailerData: null,
  editingTrailer: false,
  editTrailerData: null,
  deletingTrailer: false,
  deleteTrailerData: null,
  importingTrailerCsv: false,
  importTrailerCsv:null
};

const trailerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_TRAILER:
      return { ...state, loadingTrailer: true };
    case FETCH_TRAILER_SUCCESS:
      return { ...state, trailersData: action.payload, loadingTrailer: false };
    case FETCH_TRAILER_FAILURE:
      return { ...state, trailersData: action.payload, loadingTrailer: false };

    case ADD_TRAILER:
      return { ...state, addingTrailer: true };
    case ADD_TRAILER_SUCCESS:
      return {
        ...state,
        addTrailerData: action.payload,
        addingTrailer: false,
      };
    case ADD_TRAILER_FAILURE:
      return {
        ...state,
        addTrailerData: action.payload,
        addingTrailer: false,
      };

    case EDIT_TRAILER:
      return { ...state, editingTrailer: true };
    case EDIT_TRAILER_SUCCESS:
      return {
        ...state,
        editTrailerData: action.payload,
        editingTrailer: false,
      };
    case EDIT_TRAILER_FAILURE:
      return {
        ...state,
        editTrailerData: action.payload,
        editingTrailer: false,
      };

    case DELETE_TRAILER:
      return { ...state, deletingTrailer: true };
    case DELETE_TRAILER_SUCCESS:
      return {
        ...state,
        deleteTrailerData: action.payload,
        deletingTrailer: false,
      };
    case DELETE_TRAILER_FAILURE:
      return {
        ...state,
        deleteTrailerData: action.payload,
        deletingTrailer: false,
      };

    case IMPORT_TRAILER_CSV:
      return { ...state, importingTrailerCsv: true };
    case IMPORT_TRAILER_CSV_SUCCESS:
      return {
        ...state,
        importTrailerCsv: action.payload,
        importingTrailerCsv: false,
      };
    case IMPORT_TRAILER_CSV_FAILURE:
      return {
        ...state,
        importTrailerCsv: action.payload,
        importingTrailerCsv: false,
      };

    default:
      return state;
  }
};
export default trailerReducer;
