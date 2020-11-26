import {
  CURRENT_CUSTOMER,
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILURE,
  EDIT_CUSTOMER_REQUEST,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_FAILURE,
  ADD_CUSTOMER_PHOTO_REQUEST,
  ADD_CUSTOMER_PHOTO_SUCCESS,
  ADD_CUSTOMER_PHOTO_FAILURE,
} from './customerTypes';

const initialState = {
  loading: false,
  customer: {},
  errors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_CUSTOMER:
      return {
        ...state,
        loading: false,
        customer: action.payload,
      };

    case FETCH_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.payload,
        errors: [],
      };

    case FETCH_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        customer: {},
        errors: action.payload,
      };

    case EDIT_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EDIT_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.payload,
        errors: [],
      };

    case EDIT_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        // customer: {},
        errors: action.payload,
      };

    case ADD_CUSTOMER_PHOTO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_CUSTOMER_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.payload,
        errors: [],
      };

    case ADD_CUSTOMER_PHOTO_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
