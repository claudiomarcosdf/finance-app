import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import InputAdornment from '@material-ui/core/InputAdornment';

import { styles } from './addressStyle';
import CepMask from '../../../helpers/CepMask';
import PhoneMask from '../../../helpers/PhoneMask';
import { currentCustomer } from '../../../states/Customer/customerActions';
import * as api from '../../../services/apiGeneralServices';
import { toastr } from 'react-redux-toastr';

export default function Address() {
  const customer = useSelector((state) => state.customerState.customer);
  const dispatch = useDispatch();

  const handleChangeResidenceValues = (event) => {
    const { name, value } = event.target;
    const personalData = customer.personal_data;
    const residence = customer.personal_data.residence;

    const newResidence = {
      ...residence,
      [name]: value,
    };
    const alteredPersonalData = {
      ...personalData,
      residence: newResidence,
    };

    updateCustomer('personal_data', alteredPersonalData);
  };

  const handleChangeContactsValues = (event) => {
    const { name, value } = event.target;
    const personalData = customer.personal_data;
    const contacts = customer.personal_data.contacts;

    const newContact = {
      ...contacts,
      [name]: value,
    };

    const alteredPersonalData = {
      ...personalData,
      contacts: newContact,
    };

    updateCustomer('personal_data', alteredPersonalData);
  };

  const updateCustomer = (fieldToChange, valueToChange) => {
    const alteredCustomer = {
      ...customer,
      [fieldToChange]: valueToChange,
    };

    dispatch(currentCustomer(alteredCustomer));
  };

  const handleBuscaCep = (event) => {
    const cep = event.target.value;

    api
      .buscaCep(cep)
      .then((response) => {
        const { data } = response;
        populateFields(data);
      })
      .catch((error) => {
        toastr.error('Erro', 'Cep inválido.');
      });
  };

  const populateFields = (data) => {
    const personalData = customer.personal_data;
    const residence = customer.personal_data.residence;

    const newResidence = {
      ...residence,
      address: data.logradouro,
      complement: `${data.complemento} ${data.bairro}`,
      city: data.localidade,
      uf: data.uf,
    };
    const alteredPersonalData = {
      ...personalData,
      residence: newResidence,
    };

    updateCustomer('personal_data', alteredPersonalData);
  };

  const classes = styles();
  return (
    <>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className={classes.field}>
          <div className={classes.lineRow}>
            <TextField
              required
              id="cep"
              label="Cep"
              type="text"
              name="cep"
              value={customer.personal_data.residence.cep}
              onChange={handleChangeResidenceValues}
              onBlur={handleBuscaCep}
              InputProps={{
                inputComponent: CepMask,
              }}
            />
            <FormControl style={{ width: '10ch' }}>
              <InputLabel id="select-label">UF</InputLabel>
              <Select
                labelId="select-label"
                id="uf"
                name="uf"
                value={customer.personal_data.residence.uf}
                onChange={handleChangeResidenceValues}
              >
                {optionsUFs.map((uf, index) => {
                  return (
                    <MenuItem value={uf} key={index}>
                      {uf}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className={classes.lineRow}>
            <TextField
              id="address"
              label="Endereço"
              name="address"
              style={{ width: '94ch' }}
              value={customer.personal_data.residence.address}
              onChange={handleChangeResidenceValues}
            />
          </div>
          <div className={classes.lineRow}>
            <TextField
              id="complement"
              label="Complemento"
              name="complement"
              style={{ width: '45ch' }}
              value={customer.personal_data.residence.complement}
              onChange={handleChangeResidenceValues}
            />
            <TextField
              id="city"
              label="Cidade"
              name="city"
              style={{ width: '45ch' }}
              value={customer.personal_data.residence.city}
              onChange={handleChangeResidenceValues}
            />
          </div>
          <Typography
            variant="h6"
            color="textSecondary"
            style={{ marginTop: '40px', marginBottom: '30px' }}
          >
            Contatos:
          </Typography>
          <div className={classes.lineRow}>
            <TextField
              id="cellphone1"
              label="Celular 1"
              type="text"
              name="cellphone1"
              value={customer.personal_data.contacts.cellphone1}
              onChange={handleChangeContactsValues}
              style={{ width: '25ch' }}
              InputProps={{
                inputComponent: PhoneMask,
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="cellphone2"
              label="Celular 2"
              type="text"
              name="cellphone2"
              value={customer.personal_data.contacts.cellphone2}
              onChange={handleChangeContactsValues}
              style={{ width: '25ch' }}
              InputProps={{
                inputComponent: PhoneMask,
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={classes.lineRow}>
            <TextField
              id="phone"
              label="Telefone fixo"
              type="text"
              name="phone"
              value={customer.personal_data.contacts.phone}
              onChange={handleChangeContactsValues}
              style={{ width: '25ch' }}
              InputProps={{
                inputComponent: PhoneMask,
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </form>
    </>
  );
}

//prettier-ignore
const optionsUFs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
