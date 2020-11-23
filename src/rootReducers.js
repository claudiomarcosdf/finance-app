import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import modalReducer from './states/Modal/modalReducer';
import customerReducer from './states/Customer/customerReducer';

const rootReducers = combineReducers({
  modalState: modalReducer,
  customerState: customerReducer,
  toastr: toastrReducer,
});

export default rootReducers;
