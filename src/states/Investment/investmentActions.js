import * as api from '../../services/apiCustomerService';
import { saveVoucher } from '../../services/apiImagesService';
import * as apiImages from '../../services/apiImagesService';
import { toastr } from 'react-redux-toastr';

import { currentCustomer } from '../Customer/customerActions';

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

export const currentInvestment = (investment) => {
  return {
    type: CURRENT_INVESTMENT,
    payload: investment,
  };
};

const addInvestmentRequest = () => {
  return {
    type: ADD_INVESTMENT_REQUEST,
  };
};

const addInvestmentSuccess = () => {
  return {
    type: ADD_INVESTMENT_SUCCESS,
  };
};

const addInvestmentFailure = (errors) => {
  return {
    type: ADD_INVESTMENT_FAILURE,
    payload: errors,
  };
};

const cancelInvestmentRequest = () => {
  return {
    type: CANCEL_INVESTMENT_REQUEST,
  };
};

const cancelInvestmentSuccess = () => {
  return {
    type: CANCEL_INVESTMENT_SUCCESS,
  };
};

const cancelInvestmentFailure = (errors) => {
  return {
    type: CANCEL_INVESTMENT_FAILURE,
    payload: errors,
  };
};

const editInvestmentRequest = () => {
  return {
    type: EDIT_INVESTMENT_REQUEST,
  };
};

const editInvestmentSuccess = () => {
  return {
    type: EDIT_INVESTMENT_SUCCESS,
  };
};

const editInvestmentFailure = (errors) => {
  return {
    type: EDIT_INVESTMENT_FAILURE,
    payload: errors,
  };
};

export const addInvestment = (customerId, investment) => {
  return async (dispatch) => {
    dispatch(addInvestmentRequest);

    try {
      const response = await api.insertInvestment(customerId, investment);
      const customerWithInvestments = response.data;
      dispatch([
        addInvestmentSuccess,
        currentCustomer(customerWithInvestments),
      ]);
      toastr.success('Sucesso', 'Seu investimento foi salvo.');
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(addInvestmentFailure(errors));
      errors.forEach((error) => toastr.error('Erro', error));
    }
  };
};

export const cancelInvestment = (customerId, investmentId) => {
  return (dispatch) => {
    dispatch(cancelInvestmentRequest);

    api
      .cancelInvestment(customerId, investmentId)
      .then((response) => {
        const customerWithInvestments = response.data;
        dispatch([
          cancelInvestmentSuccess,
          currentCustomer(customerWithInvestments),
        ]);
        toastr.success('Sucesso', 'Investimento cancelado.');
      })
      .catch((error) => {
        const errors = error.response.data.errors;
        dispatch(cancelInvestmentFailure(errors));
        errors.forEach((error) => toastr.error('Erro', error));
      });
  };
};

export const editInvestment = (customerId, investment) => {
  return async (dispatch) => {
    dispatch(editInvestmentRequest);

    try {
      const response = await api.updateInvestment(customerId, investment);
      const customerWithInvestments = response.data;
      dispatch([
        editInvestmentSuccess,
        currentCustomer(customerWithInvestments),
      ]);
      toastr.success('Sucesso', 'Seu investimento foi alterado.');
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(editInvestmentFailure(errors));
      errors.forEach((error) => toastr.error('Erro', error));
    }
  };
};

export const rescueInvestment = (customerId, investmentId) => {
  return (dispatch) => {
    dispatch({ type: RESCUE_INVESTMENT_REQUEST });

    api
      .rescueInvestment(customerId, investmentId)
      .then((response) => {
        const customerWithInvestments = response.data;
        dispatch([
          { type: RESCUE_INVESTMENT_SUCCESS },
          currentCustomer(customerWithInvestments),
        ]);
        toastr.success('Sucesso', 'Resgate solicitado.');
      })
      .catch((error) => {
        const errors = error.response.data.errors;
        dispatch({ type: RESCUE_INVESTMENT_FAILURE, paylod: errors });
        errors.forEach((error) => toastr.error('Erro', error));
      });
  };
};

export const addVoucher = (customerId, investmentId, namePath, forData) => {
  return (dispatch) => {
    dispatch({ type: ADD_VOUCHER_REQUEST });

    apiImages
      .saveVoucher(customerId, investmentId, namePath, forData)
      .then((response) => {
        const customer = response.data;
        dispatch([{ type: ADD_VOUCHER_SUCCESS }, currentCustomer(customer)]);

        toastr.success('Sucesso', 'Comprovante enviado.');
      })
      .catch((error) => {
        const errors = error.response.data.errors;

        dispatch({ type: ADD_VOUCHER_FAILURE, payload: errors });
        errors.forEach((error) => toastr.error('Erro', error));
      });
  };
};
