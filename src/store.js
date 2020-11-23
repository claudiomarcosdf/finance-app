import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import promise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducers from './rootReducers';

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk, multi, promise))
);

export default store;
