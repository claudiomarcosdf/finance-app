import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import Products from './pages/Products';
import CustomerProfile from './pages/CustomerProfile/CustomerProfile';
import ContactUs from './pages/ContactUs';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import Marketing from './pages/Marketing';
import Consulting from './pages/Consulting';
import Customer from './pages/Customer/Customer';
import Services from './pages/Services';

import './App.css';
import Home from './pages/Home';

const theme = createMuiTheme({
  palette: {
    primary: { main: green[600], contrastText: '#fff' },
    secondary: { main: purple[500] },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
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
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
