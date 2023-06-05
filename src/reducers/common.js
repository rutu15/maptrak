import {
  GET_INVOICING_PERIOD,
  GET_INVOICING_PERIOD_SUCCESS,
  GET_INVOICING_PERIOD_FAILURE,
  GET_JOBTYPES,
  GET_JOBTYPES_SUCCESS,
  GET_JOBTYPES_FAILURE,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILURE,
  GET_PRESIGNEDURL_SUCCESS,
  GET_PRESIGNEDURL_FAILURE,
  IMAGE_UPLOAD,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  GET_TRUCK_TYPE,
  GET_TRUCK_TYPE_SUCCESS,
  GET_TRUCK_TYPE_FAILURE,
  GET_CUSTOMER_CATEGORIES,
  GET_CUSTOMER_CATEGORIES_SUCCESS,
  GET_CUSTOMER_CATEGORIES_FAILURE,
  GET_DRIVER_TYPE,
  GET_DRIVER_TYPE_SUCCESS,
  GET_DRIVER_TYPE_FAILURE,
  GET_ASIC_TYPE,
  GET_ASIC_TYPE_SUCCESS,
  GET_ASIC_TYPE_FAILURE,
  GET_DRIVER_LICENSE_TYPE,
  GET_DRIVER_LICENSE_TYPE_SUCCESS,
  GET_DRIVER_LICENSE_TYPE_FAILURE,
  GET_CARGO_TYPE,
  GET_CARGO_TYPE_SUCCESS,
  GET_CARGO_TYPE_FAILURE,
  GET_CTOS,
  GET_CTOS_SUCCESS,
  GET_CTOS_FAILURE,
  GET_JOB_STATUS,
  GET_JOB_STATUS_SUCCESS,
  GET_JOB_STATUS_FAILURE,
  GET_REQUEST_STATUS,
  GET_REQUEST_STATUS_SUCCESS,
  GET_REQUEST_STATUS_FAILURE,
  GET_ADDITIONAL_CHARGE_TYPE,
  GET_ADDITIONAL_CHARGE_TYPE_SUCCESS,
  GET_ADDITIONAL_CHARGE_TYPE_FAILURE,
  GET_STATES,
  GET_STATES_SUCCESS,
  GET_STATES_FAILURE,
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loadingInvoicingPeriod: false,
  invoicingPeriodData: null,
  loadingJobType: false,
  jobTypeData: null,
  loadingCities: false,
  citiesData: null,
  presignedData: null,
  imageUploading: false,
  imageData: null,
  loadingTruckType: false,
  truckTypeData: null,
  loadingCustomerCategories: false,
  customerCategoriesData: null,
  loadingDriverType: false,
  driverTypeData: null,
  loadingDriverLicenseType: false,
  driverLicenseTypeData: null,
  loadingAsicType: false,
  asicTypeData: null,
  loadingCargoType: false,
  cargoTypeData: null,
  loadingCtos: false,
  ctosData: null,
  loadingJobStatus: false,
  jobStatusData: null,
  loadingRequestStatus: false,
  requestStatusData: null,
  loadingAdditionalChargeType: false,
  chargeTypeData: null,
  loadingStates: false,
  statesData: null,
  loadingCountries: false,
  countriesData: null,
};

const CommonReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INVOICING_PERIOD:
      return { ...state, loadingInvoicingPeriod: true };
    case GET_INVOICING_PERIOD_SUCCESS:
      return {
        ...state,
        invoicingPeriodData: action.payload,
        loadingInvoicingPeriod: false,
      };
    case GET_INVOICING_PERIOD_FAILURE:
      return {
        ...state,
        invoicingPeriodData: action.payload,
        loadingInvoicingPeriod: false,
      };

    case GET_JOBTYPES:
      return { ...state, loadingJobType: true };
    case GET_JOBTYPES_SUCCESS:
      return {
        ...state,
        jobTypeData: action.payload,
        loadingJobType: false,
      };
    case GET_JOBTYPES_FAILURE:
      return {
        ...state,
        jobTypeData: action.payload,
        loadingJobType: false,
      };

    case GET_CITIES:
      return { ...state, loadingCities: true };
    case GET_CITIES_SUCCESS:
      return {
        ...state,
        citiesData: action.payload,
        loadingCities: false,
      };
    case GET_CITIES_FAILURE:
      return {
        ...state,
        citiesData: action.payload,
        loadingCities: false,
      };

    case GET_PRESIGNEDURL_SUCCESS:
      return {
        ...state,
        presignedData: action.payload,
      };
    case GET_PRESIGNEDURL_FAILURE:
      return {
        ...state,
        presignedData: action.payload,
      };

    case IMAGE_UPLOAD:
      return { ...state, imageUploading: true };
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        imageData: action.payload,
        imageUploading: false,
      };
    case IMAGE_UPLOAD_FAILURE:
      return {
        ...state,
        imageData: action.payload,
        imageUploading: false,
      };

    case GET_TRUCK_TYPE:
      return { ...state, loadingTruckType: true };
    case GET_TRUCK_TYPE_SUCCESS:
      return {
        ...state,
        truckTypeData: action.payload,
        loadingTruckType: false,
      };
    case GET_TRUCK_TYPE_FAILURE:
      return {
        ...state,
        truckTypeData: action.payload,
        loadingTruckType: false,
      };

    case GET_CUSTOMER_CATEGORIES:
      return { ...state, loadingCustomerCategories: true };
    case GET_CUSTOMER_CATEGORIES_SUCCESS:
      return {
        ...state,
        customerCategoriesData: action.payload,
        loadingCustomerCategories: false,
      };
    case GET_CUSTOMER_CATEGORIES_FAILURE:
      return {
        ...state,
        customerCategoriesData: action.payload,
        loadingCustomerCategories: false,
      };

    case GET_DRIVER_TYPE:
      return { ...state, loadingDriverType: true };
    case GET_DRIVER_TYPE_SUCCESS:
      return {
        ...state,
        driverTypeData: action.payload,
        loadingDriverType: false,
      };
    case GET_DRIVER_TYPE_FAILURE:
      return {
        ...state,
        driverTypeData: action.payload,
        loadingDriverType: false,
      };

    case GET_DRIVER_LICENSE_TYPE:
      return { ...state, loadingDriverLicenseType: true };
    case GET_DRIVER_LICENSE_TYPE_SUCCESS:
      return {
        ...state,
        driverLicenseTypeData: action.payload,
        loadingDriverLicenseType: false,
      };
    case GET_DRIVER_LICENSE_TYPE_FAILURE:
      return {
        ...state,
        driverLicenseTypeData: action.payload,
        loadingDriverLicenseType: false,
      };

    case GET_ASIC_TYPE:
      return { ...state, loadingAsicType: true };
    case GET_ASIC_TYPE_SUCCESS:
      return {
        ...state,
        asicTypeData: action.payload,
        loadingAsicType: false,
      };
    case GET_ASIC_TYPE_FAILURE:
      return {
        ...state,
        asicTypeData: action.payload,
        loadingAsicType: false,
      };

    case GET_CARGO_TYPE:
      return { ...state, loadingCargoType: true };
    case GET_CARGO_TYPE_SUCCESS:
      return {
        ...state,
        cargoTypeData: action.payload,
        loadingCargoType: false,
      };
    case GET_CARGO_TYPE_FAILURE:
      return {
        ...state,
        cargoTypeData: action.payload,
        loadingCargoType: false,
      };

    case GET_CTOS:
      return { ...state, loadingCtos: true };
    case GET_CTOS_SUCCESS:
      return {
        ...state,
        ctosData: action.payload,
        loadingCtos: false,
      };
    case GET_CTOS_FAILURE:
      return {
        ...state,
        ctosData: action.payload,
        loadingCtos: false,
      };

    case GET_JOB_STATUS:
      return { ...state, loadingJobStatus: true };
    case GET_JOB_STATUS_SUCCESS:
      return {
        ...state,
        jobStatusData: action.payload,
        loadingJobStatus: false,
      };
    case GET_JOB_STATUS_FAILURE:
      return {
        ...state,
        jobStatusData: action.payload,
        loadingJobStatus: false,
      };

    case GET_REQUEST_STATUS:
      return { ...state, loadingRequestStatus: true };
    case GET_REQUEST_STATUS_SUCCESS:
      return {
        ...state,
        requestStatusData: action.payload,
        loadingRequestStatus: false,
      };
    case GET_REQUEST_STATUS_FAILURE:
      return {
        ...state,
        requestStatusData: action.payload,
        loadingRequestStatus: false,
      };

    case GET_ADDITIONAL_CHARGE_TYPE:
      return { ...state, loadingAdditionalChargeType: true };
    case GET_ADDITIONAL_CHARGE_TYPE_SUCCESS:
      return {
        ...state,
        chargeTypeData: action.payload,
        loadingAdditionalChargeType: false,
      };
    case GET_ADDITIONAL_CHARGE_TYPE_FAILURE:
      return {
        ...state,
        chargeTypeData: action.payload,
        loadingAdditionalChargeType: false,
      };

    case GET_STATES:
      return { ...state, loadingStates: true };
    case GET_STATES_SUCCESS:
      return {
        ...state,
        statesData: action.payload,
        loadingStates: false,
      };
    case GET_STATES_FAILURE:
      return {
        ...state,
        statesData: action.payload,
        loadingStates: false,
      };

    case GET_COUNTRIES:
      return { ...state, loadingCountries: true };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countriesData: action.payload,
        loadingCountries: false,
      };
    case GET_COUNTRIES_FAILURE:
      return {
        ...state,
        countriesData: action.payload,
        loadingCountries: false,
      };

    default:
      return state;
  }
};
export default CommonReducer;
