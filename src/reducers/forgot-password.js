import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loading: false,
  data: null,
};

const forgotPasswordReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD:
      return { ...state, loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case FORGOT_PASSWORD_FAILURE:
      return { ...state, data: action.payload, loading: false };
    default:
      return state;
  }
};
export default forgotPasswordReducer;
