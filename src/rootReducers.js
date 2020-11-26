import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import modalReducer from './states/Modal/modalReducer';
import customerReducer from './states/Customer/customerReducer';
import authReducer from './states/Auth/authReducer';
import menuReducer from './states/Menu/menuReducer';

const rootReducers = combineReducers({
  modalState: modalReducer,
  customerState: customerReducer,
  toastr: toastrReducer,
  menu: menuReducer,
  auth: authReducer,
});

export default rootReducers;
