import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import { styles } from './bankDataStyle';
import { currentCustomer } from '../../../states/Customer/customerActions';

export default function BankData() {
  const customer = useSelector((state) => state.customerState.customer);
  const dispatch = useDispatch();

  const handleChangeBankDataValues = (event) => {
    const { name, value } = event.target;
    const bankData = customer.bank_data;

    const newBankData = {
      ...bankData,
      [name]: value,
    };

    updateCustomer('bank_data', newBankData);
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
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className={classes.field}>
          <div className={classes.lineRow}>
            <TextField
              id="bank"
              label="Banco"
              type="text"
              name="bank"
              value={customer.bank_data.bank}
              onChange={handleChangeBankDataValues}
            />
          </div>
          <div className={classes.lineRow}>
            <TextField
              id="agency"
              label="Agência"
              type="number"
              name="agency"
              value={customer.bank_data.agency}
              onChange={handleChangeBankDataValues}
            />
            <TextField
              id="account_number"
              label="Número da conta"
              type="number"
              name="account_number"
              value={customer.bank_data.account_number}
              onChange={handleChangeBankDataValues}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
