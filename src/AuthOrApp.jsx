import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import axios from 'axios';

import './App.css';
import { validateToken } from './states/Auth/authActions';
import { fetchCustomer } from './states/Customer/customerActions';
import _ from 'lodash';

import Home from './pages/Home';
import CustomerProfile from './pages/CustomerProfile/CustomerProfile';
import ContactUs from './pages/ContactUs';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import Marketing from './pages/Marketing';
import Consulting from './pages/Consulting';
import Customer from './pages/Customer/Customer';
import Services from './pages/Services';

export default function AuthOrApp({ children }) {
  const auth = useSelector((state) => state.auth);
  const customerState = useSelector((state) => state.customerState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      dispatch(validateToken(auth.user.token));
    }
  }, [auth.user, dispatch]);

  const config = () => {
    axios.defaults.headers.common['authorization'] = auth.user.token;
    if (_.isEmpty(customerState.customer)) {
      dispatch(fetchCustomer(auth.user.email));
    }
  };

  const routes = () => {
    return (
      <Switch>
        <Route path="/minha-conta" component={CustomerProfile} />
        <Route path="/services" component={Services} />
        <Route path="/cadastro" component={Customer} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/cadastre-se" component={SignUp} />
        <Route path="/entrar" component={SignIn} />
        <Route path="/marketing" component={Marketing} />
        <Route path="/consulting" component={Consulting} />
        <Route path="/" exact component={Home} />
      </Switch>
    );
  };

  const theme = createMuiTheme({
    palette: {
      primary: { main: green[600], contrastText: '#fff' },
      secondary: { main: purple[500] },
    },
  });

  return (
    <>
      <MuiThemeProvider theme={theme}>
        {routes()}
        {auth.user && auth.validToken ? (
          <>
            {config()}
            <Switch>
              <Redirect to="/minha-conta" />
            </Switch>
          </>
        ) : !auth.user && !auth.validToken ? (
          <>
            <Switch>
              <Redirect to="/" />
            </Switch>
          </>
        ) : (
          <></>
        )}
      </MuiThemeProvider>
    </>
  );
}
