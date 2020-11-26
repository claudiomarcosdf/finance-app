import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Menu/Navbar';
import GlobalMessages from './components/Messages/GlobalMessages';
import store from './store';
import AuthOrApp from './AuthOrApp';

const hist = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <GlobalMessages />
      <Navbar />

      <Switch>
        <Route path="/" component={AuthOrApp} />
      </Switch>
    </Router>
  </Provider>,

  document.getElementById('root')
);
