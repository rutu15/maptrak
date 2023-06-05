import {
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
  } from "@utils/actionTypes";
  
  const INIT_STATE = {
    loading: false,
    data: null,
  };
  
  const resetPasswordReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case RESET_PASSWORD:
        return { ...state, loading: true };
      case RESET_PASSWORD_SUCCESS:
        return { ...state, data: action.payload, loading: false };
      case RESET_PASSWORD_FAILURE:
        return { ...state, data: action.payload, loading: false };
      default:
        return state;
    }
  };
  export default resetPasswordReducer;
  