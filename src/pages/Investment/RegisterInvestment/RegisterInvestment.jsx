import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import _ from 'lodash';
import * as format from '../../../helpers/formatHelpers';
import { formatInputCurrency } from '../../../helpers/formatInputCurrency';
import { styles } from './registerInvestmentStyle';
import {
  currentInvestment,
  addInvestment,
  editInvestment,
} from '../../../states/Investment/investmentActions';

const useStyles = makeStyles(styles);

export default function RegisterInvestment({ idCustomer, onClose }) {
  const investment = useSelector((state) => state.investmentState.investment);
  const dispatch = useDispatch();

  const labelTitle = investment._id ? 'Atualizar' : 'Novo';

  useEffect(() => {
    const rentability = format.calcRentability(investment);
    dispatch(currentInvestment({ ...investment, rentability }));
  }, [investment.capital, investment.months]);

  const handleClose = () => {
    onClose(null);
  };

  const handleSave = () => {
    const capital = format.toCurrencyUSA(investment.capital); //Because Mask Input
    const investToSave = { ...investment, capital };

    if (!investment._id) {
      dispatch(addInvestment(idCustomer, investToSave));
    } else {
      dispatch(editInvestment(idCustomer, investToSave));
    }
  };

  const handleChangeValue = (event) => {
    const { name, value } = event.target;

    dispatch(currentInvestment({ ...investment, [name]: value }));
  };

  const handleChangeValue2 = (event) => {
    const { name, value } = event.target;
    const capital = formatInputCurrency(value); //because mask format

    dispatch(currentInvestment({ ...investment, [name]: capital }));
  };

  const classes = useStyles();
  return (
    <>
      <div className={`${classes.box} ${classes.root}`}>
        <div>
          <Typography variant="h5">{`${labelTitle} Investimento`}</Typography>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className={classes.content}>
            <div className={classes.field}>
              <TextField
                id="capital"
                label="Capital a investir"
                type="text"
                name="capital"
                value={format.formatNumber(investment.capital)}
                onChange={handleChangeValue2}
                InputProps={{
                  // inputComponent: CurrencyInput,
                  startAdornment: (
                    <InputAdornment position="start" variant="outlined">
                      R$
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel id="select-label">Tempo de aplicação</InputLabel>
                <Select
                  labelId="select-label"
                  id="months"
                  name="months"
                  type="number"
                  value={investment.months}
                  onChange={handleChangeValue}
                >
                  {optionsTempo.map((status, index) => {
                    return (
                      <MenuItem value={status} key={index}>
                        {status}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className={classes.field}>
              <TextField
                id="interest"
                label="Taxa (%) | conforme seu score"
                type="number"
                name="interest"
                disabled
                value={investment.interest}
                onChange={() => {}}
              />
            </div>
            <div className={`${classes.field} ${classes.destak}`}>
              <TextField
                id="rentability"
                label="Rentabilidade"
                type="text"
                name="rentability"
                value={format.formatCurrency(investment.rentability)}
                onChange={() => {}}
                disabled
              />
            </div>
            {/* BUTTONS ACTIONS   */}
            <div className={classes.boxButtons}>
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSave}
                  disabled={!investment.capital || !investment.months}
                >
                  Salvar
                </Button>
              </div>
              <div>
                <Button onClick={handleClose}>Sair</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

const optionsTempo = [6, 12, 18, 24, 36];
