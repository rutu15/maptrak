import {
  FETCH_STAFF_USERS,
  FETCH_STAFF_USERS_SUCCESS,
  FETCH_STAFF_USERS_FAILURE,
  ADD_STAFF_USER,
  ADD_STAFF_USER_SUCCESS,
  ADD_STAFF_USER_FAILURE,
  EDIT_STAFF_USER,
  EDIT_STAFF_USER_SUCCESS,
  EDIT_STAFF_USER_FAILURE,
  DELETE_STAFF_USER,
  DELETE_STAFF_USER_SUCCESS,
  DELETE_STAFF_USER_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loading: false,
  staffUsers: null,
  addingUser: false,
  addStaffUserData: null,
  editingUser: false,
  editUserData: null,
  deletingUser: false,
  deleteUserData: null,
};

const staffUsersReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_STAFF_USERS:
      return { ...state, loading: true };
    case FETCH_STAFF_USERS_SUCCESS:
      return { ...state, staffUsers: action.payload, loading: false };
    case FETCH_STAFF_USERS_FAILURE:
      return { ...state, staffUsers: action.payload, loading: false };

    case ADD_STAFF_USER:
      return { ...state, addingUser: true };
    case ADD_STAFF_USER_SUCCESS:
      return { ...state, addStaffUserData: action.payload, addingUser: false };
    case ADD_STAFF_USER_FAILURE:
      return { ...state, addStaffUserData: action.payload, addingUser: false };

    case EDIT_STAFF_USER:
      return { ...state, editingUser: true };
    case EDIT_STAFF_USER_SUCCESS:
      return { ...state, editUserData: action.payload, editingUser: false };
    case EDIT_STAFF_USER_FAILURE:
      return { ...state, editUserData: action.payload, editingUser: false };

    case DELETE_STAFF_USER:
      return { ...state, deletingUser: true };
    case DELETE_STAFF_USER_SUCCESS:
      return { ...state, deleteUserData: action.payload, deletingUser: false };
    case DELETE_STAFF_USER_FAILURE:
      return { ...state, deleteUserData: action.payload, deletingUser: false };
    default:
      return state;
  }
};
export default staffUsersReducer;
