import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Menu/Navbar';
import store from './store';
import AuthOrApp from './AuthOrApp';
import Admin from './pages/Admin/Admin.jsx';

const hist = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      {/* <Navbar /> */}

      <Switch>
        {/* ROTA QUE SERÁ USADA QD O MÓDULO ADMIN ESTIVER PRONTO */}
        {/* <Route path="/admin" component={AuthOrAdmin} /> */}
        <Route path="/admin" component={Admin} />
        <Route path="/" component={AuthOrApp} />
      </Switch>
    </Router>
  </Provider>,

  document.getElementById('root')
);
