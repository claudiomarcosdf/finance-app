import * as api from '../../services/apiCustomerService';
import { toastr } from 'react-redux-toastr';

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
} from './customerTypes';

export const currentCustomer = (customer) => {
  return {
    type: CURRENT_CUSTOMER,
    payload: customer,
  };
};

export const fetchCustomerRequest = () => {
  return {
    type: FETCH_CUSTOMER_REQUEST,
  };
};

export const fetchCustomerSuccess = (customer) => {
  return {
    type: FETCH_CUSTOMER_SUCCESS,
    payload: customer,
  };
};

export const fetchCustomerFailure = (errors) => {
  return {
    type: FETCH_CUSTOMER_FAILURE,
    payload: errors,
  };
};

export const addCustomerRequest = () => {
  return {
    type: ADD_CUSTOMER_REQUEST,
  };
};

export const addCustomerSuccess = (customer) => {
  return {
    type: ADD_CUSTOMER_SUCCESS,
    payload: customer,
  };
};

export const addCustomerFailure = (errors) => {
  return {
    type: ADD_CUSTOMER_FAILURE,
    payload: errors,
  };
};

export const editCustomerRequest = () => {
  return {
    type: EDIT_CUSTOMER_REQUEST,
  };
};

export const editCustomerSuccess = (customer) => {
  return {
    type: EDIT_CUSTOMER_SUCCESS,
    payload: customer,
  };
};

export const editCustomerFailure = (errors) => {
  return {
    type: EDIT_CUSTOMER_FAILURE,
    payload: errors,
  };
};

export const fetchCustomer = (id) => {
  return async (dispatch) => {
    dispatch(fetchCustomerRequest);

    try {
      const response = await api.getCustomer(id);
      const customer = response.data;

      dispatch([fetchCustomerSuccess(customer), currentCustomer(customer)]);
    } catch (error) {
      const errors = [];
      errors.push('Falha na requisição [' + error + ']');

      dispatch([fetchCustomerFailure(errors)]);
    }
  };
};

export const editCustomer = (customerToUpdate) => {
  const { _id } = customerToUpdate;

  return (dispatch) => {
    dispatch(editCustomerRequest);

    api
      .updateCustomer(_id, customerToUpdate)
      .then((response) => {
        const customer = response.data;
        dispatch(editCustomerSuccess(customer));

        toastr.success('Sucesso', 'Atualização realizada com sucesso.');
      })
      .catch((error) => {
        const errors = error.response.data.errors;

        dispatch(editCustomerFailure(errors));
        errors.forEach((error) => toastr.error('Erro', error));
      });
  };
};
