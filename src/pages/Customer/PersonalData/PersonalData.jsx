import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { styles } from './personalDataStyle';
import * as format from '../../../helpers/formatHelpers';
import CpfMask from '../../../helpers/CpfMask';
import { currentCustomer } from '../../../states/Customer/customerActions';

export default function PersonalData() {
  const customer = useSelector((state) => state.customerState.customer);
  const dispatch = useDispatch();

  const handleChangeBasicValues = (event) => {
    const { name, value } = event.target;
    dispatch(currentCustomer({ ...customer, [name]: value }));
  };

  const handleChangePersonalDataValues = (event) => {
    const { name, value } = event.target;
    const personalData = customer.personal_data;

    const newPersonalData = {
      ...personalData,
      [name]: value,
    };

    updateCustomer('personal_data', newPersonalData);
  };

  const updateCustomer = (fieldToChange, valueToChange) => {
    const alteredCustomer = {
      ...customer,
      [fieldToChange]: valueToChange,
    };

    dispatch(currentCustomer(alteredCustomer));
  };

  const classes = styles();
  return (
    <>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className={classes.field}>
          <div className={classes.lineRow}>
            <TextField
              name="code"
              id="code"
              label="Código"
              value={customer.code}
            />
          </div>
          <div className={classes.lineRow}>
            <TextField
              name="birthday"
              id="birthday"
              label="Data de nascimento"
              type="date"
              value={format.formatDateToField(customer.birthday)}
              onChange={handleChangeBasicValues}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              id="cpf"
              label="Cpf"
              type="text"
              name="cpf"
              value={customer.personal_data.cpf}
              onChange={handleChangePersonalDataValues}
              InputProps={{
                inputComponent: CpfMask,
              }}
            />
            <TextField
              id="rg"
              label="Rg"
              name="rg"
              value={customer.personal_data.rg}
              onChange={handleChangePersonalDataValues}
            />
          </div>
          <div className={classes.lineRow}>
            <TextField
              name="name"
              required
              id="name"
              label="Nome completo"
              value={customer.name}
              onChange={handleChangeBasicValues}
              style={{ width: '44ch' }}
            />
            <TextField
              name="nationality"
              id="nationality"
              label="Nacionalidade"
              value={customer.personal_data.nationality}
              onChange={handleChangePersonalDataValues}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Gênero</FormLabel>
              <RadioGroup
                row
                aria-label="genero"
                name="gender"
                value={customer.personal_data.gender}
                onChange={handleChangePersonalDataValues}
              >
                <FormControlLabel
                  value="Feminino"
                  control={<Radio />}
                  label="Feminino"
                />
                <FormControlLabel
                  value="Masculino"
                  control={<Radio />}
                  label="Masculino"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={classes.lineRow}>
            <FormControl style={{ width: '25ch' }}>
              <InputLabel id="select-label">Estado civil</InputLabel>
              <Select
                labelId="select-label"
                id="civil_status"
                name="civil_status"
                value={customer.personal_data.civil_status}
                onChange={handleChangePersonalDataValues}
              >
                {optionsCivilStatus.map((status, index) => {
                  return (
                    <MenuItem value={status} key={index}>
                      {status}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className={classes.lineRow}>
            <TextField
              id="father_name"
              label="Nome do pai"
              name="father_name"
              style={{ width: '44ch' }}
              value={customer.personal_data.father_name}
              onChange={handleChangePersonalDataValues}
            />
          </div>
          <div className={classes.lineRow}>
            <TextField
              id="mother_name"
              label="Nome da mãe"
              name="mother_name"
              style={{ width: '44ch' }}
              value={customer.personal_data.mother_name}
              onChange={handleChangePersonalDataValues}
            />
          </div>
        </div>
      </form>
    </>
  );
}

const optionsCivilStatus = [
  'Solteiro(a)',
  'Casado(a)',
  'Viúvo(a)',
  'Divorciado(a)',
];
