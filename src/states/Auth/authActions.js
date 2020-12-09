import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { visibleButtonsLogged } from '../Menu/menuAcitons';
import { currentCustomer } from '../Customer/customerActions';

const BASE_AUTH_URL = process.env.REACT_APP_AUTH_BASE_URL;

export function login(values) {
  return submit(values, `${BASE_AUTH_URL}/login`);
}

export function signup(values) {
  return submit(values, `${BASE_AUTH_URL}/signup`);
}

function submit(values, url) {
  return (dispatch) => {
    axios
      .post(url, values)
      .then((resp) => {
        dispatch([
          { type: 'USER_FETCHED', payload: resp.data },
          currentCustomer(resp.data),
          visibleButtonsLogged(true),
        ]);
      })
      .catch((err) => {
        err.response.data.errors.forEach((error) => {
          toastr.error('Erro', error);
        });
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch([
      { type: 'TOKEN_VALIDATED', payload: false },
      visibleButtonsLogged(false),
      currentCustomer({}),
    ]);
  };
}

export function validateToken(auth) {
  const { token, email } = auth;

  return (dispatch) => {
    if (token) {
      axios
        .post(`${BASE_AUTH_URL}/validateToken`, { token })
        .then((resp) => {
          dispatch([
            { type: 'TOKEN_VALIDATED', payload: resp.data.valid },
            visibleButtonsLogged(resp.data.valid),
          ]);
        })
        .catch((err) =>
          dispatch([
            { type: 'TOKEN_VALIDATED', payload: false },
            visibleButtonsLogged(false),
          ])
        );
    } else {
      dispatch([
        { type: 'TOKEN_VALIDATED', payload: false },
        visibleButtonsLogged(false),
      ]);
    }
  };
}
