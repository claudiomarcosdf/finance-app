import {
  CURRENT_INVESTMENT,
  ADD_INVESTMENT_REQUEST,
  ADD_INVESTMENT_SUCCESS,
  ADD_INVESTMENT_FAILURE,
  CANCEL_INVESTMENT_REQUEST,
  CANCEL_INVESTMENT_SUCCESS,
  CANCEL_INVESTMENT_FAILURE,
  EDIT_INVESTMENT_REQUEST,
  EDIT_INVESTMENT_SUCCESS,
  EDIT_INVESTMENT_FAILURE,
  RESCUE_INVESTMENT_REQUEST,
  RESCUE_INVESTMENT_SUCCESS,
  RESCUE_INVESTMENT_FAILURE,
  ADD_VOUCHER_REQUEST,
  ADD_VOUCHER_SUCCESS,
  ADD_VOUCHER_FAILURE,
} from './investmentTypes';

const initialState = {
  investment: {},
  loading: false,
  errors: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_INVESTMENT:
      return {
        ...state,
        loading: false,
        investment: action.payload,
      };

    case ADD_INVESTMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_INVESTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: [],
      };

    case ADD_INVESTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case CANCEL_INVESTMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CANCEL_INVESTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CANCEL_INVESTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case EDIT_INVESTMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EDIT_INVESTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: [],
      };

    case EDIT_INVESTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case RESCUE_INVESTMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case RESCUE_INVESTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case RESCUE_INVESTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case ADD_VOUCHER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_VOUCHER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case ADD_VOUCHER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    default:
      return state;
  }
}
