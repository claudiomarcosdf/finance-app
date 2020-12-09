import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import GlobalMessages from '../../components/Messages/GlobalMessages';
import { login } from '../../states/Auth/authActions';

import logo from '../../assets/images/neo-final.png';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Sistema MyInvest
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    backgroundColor: '#fff',
    color: '#388e3c',
  },
  green: {
    color: '#388e3c',
  },
}));

export default function SignIn() {
  const [loginCustomer, setLoginCustomer] = useState({
    email: '',
    password: '',
  });
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setLoginCustomer({ ...loginCustomer, [name]: value });
  };

  const handleSubmit = () => {
    if (loginCustomer.email && loginCustomer.password) {
      dispatch(login(loginCustomer));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <GlobalMessages />
      <CssBaseline />
      <div className={classes.paper}>
        {/* <img src={logo} alt="" /> */}
        <Typography component="h1" variant="h4" className={classes.green}>
          <i className="fas fa-user-circle fa-lg"></i>
        </Typography>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => event.preventDefault()}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={loginCustomer.email}
            onChange={handleChangeValue}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginCustomer.password}
            onChange={handleChangeValue}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Relembrar"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/cadastre-se" className={classes.link}>
                {'Não tem uma conta? Cadastre-se'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
