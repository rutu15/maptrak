import {
  FETCH_PARENT_ORGANISATION,
  FETCH_PARENT_ORGANISATION_SUCCESS,
  FETCH_PARENT_ORGANISATION_FAILURE,
  ADD_PARENT_ORGANISATION,
  ADD_PARENT_ORGANISATION_SUCCESS,
  ADD_PARENT_ORGANISATION_FAILURE,
  EDIT_PARENT_ORGANISATION,
  EDIT_PARENT_ORGANISATION_SUCCESS,
  EDIT_PARENT_ORGANISATION_FAILURE,
  FETCH_CHILD_ORGANISATION,
  FETCH_CHILD_ORGANISATION_SUCCESS,
  FETCH_CHILD_ORGANISATION_FAILURE,
  ADD_CHILD_ORGANISATION,
  ADD_CHILD_ORGANISATION_SUCCESS,
  ADD_CHILD_ORGANISATION_FAILURE,
  EDIT_CHILD_ORGANISATION,
  EDIT_CHILD_ORGANISATION_SUCCESS,
  EDIT_CHILD_ORGANISATION_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loadingParentOrganisaiton: false,
  parentOrganisationData: null,
  editingParentOrganisation: false,
  addingParentOrganisation: false,
  loadingChildOrganisation: false,
  childOrganisationData: null,
  editingChildOrganisation: false,
  addingChildOrganisation: false,
};

const OrganisationReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_PARENT_ORGANISATION:
      return { ...state, loadingParentOrganisaiton: true };
    case FETCH_PARENT_ORGANISATION_SUCCESS:
      return {
        ...state,
        parentOrganisationData: action.payload,
        loadingParentOrganisaiton: false,
      };
    case FETCH_PARENT_ORGANISATION_FAILURE:
      return {
        ...state,
        parentOrganisationData: action.payload,
        loadingParentOrganisaiton: false,
      };

    case ADD_PARENT_ORGANISATION:
      return { ...state, addingParentOrganisation: true };
    case ADD_PARENT_ORGANISATION_SUCCESS:
      return {
        ...state,
        addingParentOrganisation: false,
      };
    case ADD_PARENT_ORGANISATION_FAILURE:
      return {
        ...state,
        addingParentOrganisation: false,
      };

    case EDIT_PARENT_ORGANISATION:
      return { ...state, editingParentOrganisation: true };
    case EDIT_PARENT_ORGANISATION_SUCCESS:
      return {
        ...state,
        editingParentOrganisation: false,
      };
    case EDIT_PARENT_ORGANISATION_FAILURE:
      return {
        ...state,
        editingParentOrganisation: false,
      };

    case FETCH_CHILD_ORGANISATION:
      return { ...state, loadingChildOrganisation: true };
    case FETCH_CHILD_ORGANISATION_SUCCESS:
      return {
        ...state,
        childOrganisationData: action.payload,
        loadingChildOrganisation: false,
      };
    case FETCH_CHILD_ORGANISATION_FAILURE:
      return {
        ...state,
        childOrganisationData: action.payload,
        loadingChildOrganisation: false,
      };

    case ADD_CHILD_ORGANISATION:
      return { ...state, addingChildOrganisation: true };
    case ADD_CHILD_ORGANISATION_SUCCESS:
      return {
        ...state,
        addingChildOrganisation: false,
      };
    case ADD_CHILD_ORGANISATION_FAILURE:
      return {
        ...state,
        addingChildOrganisation: false,
      };

    case EDIT_CHILD_ORGANISATION:
      return { ...state, editingChildOrganisation: true };
    case EDIT_CHILD_ORGANISATION_SUCCESS:
      return {
        ...state,
        editingChildOrganisation: false,
      };
    case EDIT_CHILD_ORGANISATION_FAILURE:
      return {
        ...state,
        editingChildOrganisation: false,
      };

    default:
      return state;
  }
};
export default OrganisationReducer;
