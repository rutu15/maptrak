import {
  FETCH_CTO,
  FETCH_CTO_SUCCESS,
  FETCH_CTO_FAILURE,
  ADD_CTO,
  ADD_CTO_SUCCESS,
  ADD_CTO_FAILURE,
  EDIT_CTO,
  EDIT_CTO_SUCCESS,
  EDIT_CTO_FAILURE,
  DELETE_CTO,
  DELETE_CTO_SUCCESS,
  DELETE_CTO_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loadingCto: false,
  ctoData: null,
  addingCto: false,
  editingCto: false,
  deletingCto: null,
};

const ctoReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_CTO:
      return { ...state, loadingCto: true };
    case FETCH_CTO_SUCCESS:
      return { ...state, ctoData: action.payload, loadingCto: false };
    case FETCH_CTO_FAILURE:
      return { ...state, ctoData: action.payload, loadingCto: false };

    case ADD_CTO:
      return { ...state, addingCto: true };
    case ADD_CTO_SUCCESS:
      return {
        ...state,
        addingCto: false,
      };
    case ADD_CTO_FAILURE:
      return {
        ...state,
        addingCto: false,
      };

    case EDIT_CTO:
      return { ...state, editingCto: true };
    case EDIT_CTO_SUCCESS:
      return {
        ...state,
        editingCto: false,
      };
    case EDIT_CTO_FAILURE:
      return {
        ...state,
        editingCto: false,
      };

    case DELETE_CTO:
      return { ...state, deletingCto: true };
    case DELETE_CTO_SUCCESS:
      return {
        ...state,
        deletingCto: false,
      };
    case DELETE_CTO_FAILURE:
      return {
        ...state,
        deletingCto: false,
      };

    default:
      return state;
  }
};
export default ctoReducer;
