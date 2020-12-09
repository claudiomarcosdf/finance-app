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

import Navbar from './components/Menu/Navbar';
import Footer from './pages/Footer';
import Home from './pages/Home';
import CustomerProfile from './pages/CustomerProfile/CustomerProfile';
import Score from './pages/Score';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import Investment from './pages/Investment/Investment';
import Tips from './pages/Tips';
import Customer from './pages/Customer/Customer';
import Services from './pages/Services';
import Perfil from './pages/Perfil/Perfil';

export default function AuthOrApp({ children }) {
  const auth = useSelector((state) => state.auth);
  const customerState = useSelector((state) => state.customerState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      dispatch(validateToken(auth.user));
    }
  }, [auth.user]);

  useEffect(() => {
    if (!_.isEmpty(auth.user) && auth.validToken === true) {
      config();

      if (_.isEmpty(customerState.customer)) {
        dispatch(fetchCustomer(auth.user.email));
      }
    }
  }, [auth.validToken]);

  const config = () => {
    axios.defaults.headers.common['authorization'] = auth.user.token;
  };

  const routes = () => {
    return (
      <Switch>
        <Route path="/minha-conta" component={CustomerProfile} />
        <Route path="/services" component={Services} />
        <Route path="/cadastro" component={Customer} />
        <Route path="/score" component={Score} />
        <Route path="/cadastre-se" component={SignUp} />
        <Route path="/entrar" component={SignIn} />
        <Route path="/investimentos" component={Investment} />
        <Route path="/tips" component={Tips} />
        <Route path="/perfil" component={Perfil} />
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
      <Navbar />
      <MuiThemeProvider theme={theme}>
        {routes()}

        {auth.user && auth.validToken ? (
          <>
            {/* {config()} */}
            <Switch>
              <Redirect to="/minha-conta" />
            </Switch>
            <Footer />
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
