import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import Navbar from './components/Menu/Navbar';
import './App.css';
// import Home from './pages/Home';
import Customer from './pages/Customer/Customer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './pages/Services';
// import Products from './pages/Products';
import CustomerProfile from './pages/CustomerProfile/CustomerProfile';
import ContactUs from './pages/ContactUs';
import SignUp from './pages/SignUp';
import Marketing from './pages/Marketing';
import Consulting from './pages/Consulting';

import GlobalMessages from './components/Messages/GlobalMessages';

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
        <GlobalMessages />
        <Navbar />
        <Switch>
          <Route path="/" exact component={CustomerProfile} />
          <Route path="/services" component={Services} />
          <Route path="/cadastro" component={Customer} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/marketing" component={Marketing} />
          <Route path="/consulting" component={Consulting} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
