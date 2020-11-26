import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../../assets/images/neo-final.png';

import GlobalMessages from '../../components/Messages/GlobalMessages';
import { signup } from '../../states/Auth/authActions';
import _ from 'lodash';
import CpfMask from '../../helpers/CpfMask';
import Customer from '../../states/Customer/customerModel';

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
    marginTop: theme.spacing(3),
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

export default function SignUp() {
  const [newCustomer, setNewCustomer] = useState(Customer);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChangeValue = (event) => {
    const { name, value } = event.target;

    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleChangeValueCpf = (event) => {
    const { name, value } = event.target;
    const personalData = newCustomer.personal_data;

    const newPersonalData = {
      ...personalData,
      [name]: value,
    };

    setNewCustomer({ ...newCustomer, personal_data: newPersonalData });
  };

  const handleSubmit = () => {
    const {
      name,
      lastName,
      email,
      password,
      confirm_password,
      personal_data,
    } = newCustomer;
    if (
      !_.isEmpty(name) &&
      !_.isEmpty(lastName) &&
      !_.isEmpty(email) &&
      !_.isEmpty(password) &&
      !_.isEmpty(confirm_password) &&
      !_.isEmpty(personal_data.cpf)
    ) {
      dispatch(signup(newCustomer));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <GlobalMessages />
      <CssBaseline />
      <div className={classes.paper}>
        {/* <img src={logo} alt="" /> */}
        <Typography component="h1" variant="h4" className={classes.green}>
          My Invest <i className="fas fa-seedling" />
        </Typography>
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => event.preventDefault()}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                autoFocus
                value={newCustomer.name}
                onChange={handleChangeValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                name="lastName"
                autoComplete="lastName"
                value={newCustomer.lastName}
                onChange={handleChangeValue}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={newCustomer.email}
                onChange={handleChangeValue}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpf"
                label="CPF"
                id="cpf"
                autoComplete="cpf"
                value={newCustomer.personal_data.cpf}
                onChange={handleChangeValueCpf}
                InputProps={{
                  inputComponent: CpfMask,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={newCustomer.password}
                onChange={handleChangeValue}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm_password"
                label="Confirmar senha"
                type="password"
                id="confirm_password"
                autoComplete="current-password"
                value={newCustomer.confirm_password}
                onChange={handleChangeValue}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/entrar" className={classes.link}>
                Possui uma conta? Entrar
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
