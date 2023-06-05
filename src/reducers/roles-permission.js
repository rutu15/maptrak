import {
  FETCH_ROLES,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
  ADD_ROLE,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAILURE,
  EDIT_ROLE,
  EDIT_ROLE_SUCCESS,
  EDIT_ROLE_FAILURE,
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE,
  GET_PERMISSIONS,
  GET_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_FAILURE,
  GET_ROLES_PERMISSIONS,
  GET_ROLES_PERMISSIONS_SUCCESS,
  GET_ROLES_PERMISSIONS_FAILURE,
  SET_ROLES_PERMISSIONS,
  SET_ROLES_PERMISSIONS_SUCCESS,
  SET_ROLES_PERMISSIONS_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loadingRoles: false,
  rolesData: null,
  addingRole: false,
  addRoleData: null,
  editingRole: false,
  editRoleData: null,
  deletingRole: false,
  deleteRoleData: null,
  loadingPermissions: false,
  permissionsData: null,
  loadingRolesPermission: false,
  rolesPermissionData: null,
  settingRolesPermission: false,
  setRolesPermissionData: null,
};

const rolesPermissionReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ROLES:
      return { ...state, loadingRoles: true };
    case FETCH_ROLES_SUCCESS:
      return { ...state, rolesData: action.payload, loadingRoles: false };
    case FETCH_ROLES_FAILURE:
      return { ...state, rolesData: action.payload, loadingRoles: false };

    case ADD_ROLE:
      return { ...state, addingRole: true };
    case ADD_ROLE_SUCCESS:
      return { ...state, addRoleData: action.payload, addingRole: false };
    case ADD_ROLE_FAILURE:
      return { ...state, addRoleData: action.payload, addingRole: false };

    case EDIT_ROLE:
      return { ...state, editingRole: true };
    case EDIT_ROLE_SUCCESS:
      return { ...state, editRoleData: action.payload, editingRole: false };
    case EDIT_ROLE_FAILURE:
      return { ...state, editRoleData: action.payload, editingRole: false };

    case DELETE_ROLE:
      return { ...state, deletingRole: true };
    case DELETE_ROLE_SUCCESS:
      return { ...state, deleteRoleData: action.payload, deletingRole: false };
    case DELETE_ROLE_FAILURE:
      return { ...state, deleteRoleData: action.payload, deletingRole: false };

    case GET_PERMISSIONS:
      return { ...state, loadingPermissions: true };
    case GET_PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissionsData: action.payload,
        loadingPermissions: false,
      };
    case GET_PERMISSIONS_FAILURE:
      return {
        ...state,
        permissionsData: action.payload,
        loadingPermissions: false,
      };

    case GET_ROLES_PERMISSIONS:
      return { ...state, loadingRolesPermission: true };
    case GET_ROLES_PERMISSIONS_SUCCESS:
      return {
        ...state,
        rolesPermissionData: action.payload,
        loadingRolesPermission: false,
      };
    case GET_ROLES_PERMISSIONS_FAILURE:
      return {
        ...state,
        rolesPermissionData: action.payload,
        loadingRolesPermission: false,
      };

    case SET_ROLES_PERMISSIONS:
      return { ...state, settingRolesPermission: true };
    case SET_ROLES_PERMISSIONS_SUCCESS:
      return {
        ...state,
        setRolesPermissionData: action.payload,
        settingRolesPermission: false,
      };
    case SET_ROLES_PERMISSIONS_FAILURE:
      return {
        ...state,
        setRolesPermissionData: action.payload,
        settingRolesPermission: false,
      };

    default:
      return state;
  }
};
export default rolesPermissionReducer;
