import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import '../../App.css';
import _ from 'lodash';
import GlobalMessages from '../../components/Messages/GlobalMessages';
import { styles } from './investmentStyle';
import InvestmentItems from './InvestmentItems/InvestmentItems';
import ReactModal from '../../components/Modal/ReactModal';
import { visibleModal, actualModal } from '../../states/Modal/modalActions';
import { currentInvestment } from '../../states/Investment/investmentActions';
import RegisterInvestment from './RegisterInvestment/RegisterInvestment';
import { newInvestment } from '../../states/Investment/investmentModel';

const useStyles = makeStyles(styles);

export default function Investment() {
  const modal = useSelector((state) => state.modalState);
  const customer = useSelector((state) => state.customerState.customer);
  const scoreCustomer = !_.isEmpty(customer) ? customer.profile.score : 0;
  const idCustomer = !_.isEmpty(customer) ? customer._id : 0;
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(visibleModal(false));
  };

  const handleNewInvestment = (event) => {
    //Calculate insterest % -> VEFIFICAR CÁLCULO COM CLEITON
    let interest = 0;
    if (scoreCustomer <= 5) interest = 2;
    if (scoreCustomer > 5) interest = 6;

    dispatch(currentInvestment({ ...newInvestment, interest })); // new
    dispatch(visibleModal(true));
    dispatch(actualModal('Invest'));
  };

  const classes = useStyles();
  return (
    <div className="home">
      <div className={classes.box}>
        <div className={classes.boxHeader}>
          <div className={classes.header}>
            <Typography variant="h5">Meus investimentos</Typography>
            <Tooltip title="Novo investimento" placement="left" arrow>
              <Fab
                color="primary"
                className={classes.fab}
                onClick={handleNewInvestment}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>
        </div>
        <div className={classes.boxItemsPaper}>
          <InvestmentItems />
        </div>
        <div className={classes.boxButtonClose}>
          <Link to="/" className={classes.linkDecorator}>
            <Button>Sair</Button>
          </Link>
        </div>
      </div>
      {modal.modalName === 'Invest' && (
        <ReactModal open={modal.visible} size="400">
          <RegisterInvestment
            onClose={handleCloseModal}
            idCustomer={idCustomer}
          />
        </ReactModal>
      )}
      <GlobalMessages />
    </div>
  );
}
