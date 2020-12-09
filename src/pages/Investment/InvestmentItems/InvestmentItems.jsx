import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import SpaOutlinedIcon from '@material-ui/icons/SpaOutlined';
import SyncOutlinedIcon from '@material-ui/icons/SyncOutlined';
import Button from '@material-ui/core/Button';

import ReactModal from '../../../components/Modal/ReactModal';
import * as format from '../../../helpers/formatHelpers';
import { styles } from './investmentItemsStyle';
import {
  currentInvestment,
  cancelInvestment,
  rescueInvestment,
} from '../../../states/Investment/investmentActions';
import { visibleModal, actualModal } from '../../../states/Modal/modalActions';
import enableButton from '../../../helpers/actionsButton';
import ActionButton from '../../../components/ActionButton/ActionButton';
import CustomDialog from '../../../components/Dialog/CustomDialog';
import VoucherInvestment from './VoucherInvestment/VoucherInvestment';
const useStyles = makeStyles(styles);

export default function InvestmentItems() {
  const [dialog, setDialog] = useState({
    open: false,
    id: 0,
    type: '',
    title: '',
    msg: '',
  });
  const modal = useSelector((state) => state.modalState);
  const { _id, investments } = useSelector(
    (state) => state.customerState.customer
  );
  const dispatch = useDispatch();

  const handleEditInvestment = (investment) => {
    dispatch(currentInvestment(investment)); //edit
    dispatch(actualModal('Invest'));
    dispatch(visibleModal(true));
  };

  const handleCancelInvestment = (investment) => {
    const { _id, capital } = investment;

    setDialog({
      open: true,
      id: _id,
      type: 'cancel',
      title: 'Cancelamento de investimento',
      msg: `Confirma o cancelamento deste investimento de ${format.formatCurrency(
        capital
      )}`,
    });
  };

  const handleRescueInvestment = (investment) => {
    const { _id, capital } = investment;

    setDialog({
      open: true,
      id: _id,
      type: 'rescue',
      title: 'Resgate de investimento',
      msg: `Confirma o resgate deste investimento de ${format.formatCurrency(
        capital
      )}`,
    });
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, id: 0, type: '', msg: '' });
  };

  const handleConfirmDialog = () => {
    const idInvestment = dialog.id;

    if (dialog.type === 'cancel') {
      dispatch(cancelInvestment(_id, idInvestment));
    } else {
      dispatch(rescueInvestment(_id, idInvestment));
    }

    setDialog({ open: false, id: 0, type: '', msg: '' });
  };

  const handleSetVoucher = (investment) => {
    dispatch(currentInvestment(investment));
    dispatch(actualModal('Voucher'));
    dispatch(visibleModal(true));
  };

  const handleCloseModal = () => {
    dispatch(visibleModal(false));
  };

  const classes = useStyles();
  return (
    <>
      {console.log(investments)}
      {investments && investments.length !== 0 ? (
        <>
          {investments.map((investment) => {
            return (
              <div className={classes.boxItemPaper} key={investment._id}>
                <div className={classes.boxItemFieldContent}>
                  <div className={classes.itemTitle}>
                    <MonetizationOnOutlinedIcon style={{ fontSize: '20px' }} />
                    <div className={classes.caption}>Capital investido</div>
                  </div>

                  <div className={classes.itemValue}>
                    {format.formatCurrency(investment.capital)}
                  </div>
                </div>
                <div className={classes.boxItemFieldContent}>
                  <div className={classes.itemTitle}>
                    <CalendarTodayOutlinedIcon style={{ fontSize: '20px' }} />
                    <div className={classes.caption}>Data de início</div>
                  </div>
                  <div className={classes.itemValue}>
                    {format.formatDateBr(investment.date_input)}
                  </div>
                </div>
                <div className={classes.boxItemFieldContent}>
                  <div className={classes.itemTitle}>
                    <TimelineOutlinedIcon style={{ fontSize: '20px' }} />
                    <div className={classes.caption}>Tempo de aplicação</div>
                  </div>

                  <div className={classes.itemValue}>
                    {investment.months}
                    <span style={{ fontSize: '0.8rem' }}> meses</span>
                  </div>
                </div>
                <div className={classes.boxItemFieldContent}>
                  <div className={classes.itemTitle}>
                    <div style={{ fontSize: '17px' }}>%</div>
                    <div className={classes.caption}>Taxa</div>
                  </div>

                  <div className={classes.itemValue}>
                    {investment.interest}
                    <span style={{ fontSize: '0.8rem' }}> a.m</span>
                  </div>
                </div>
                {/* BROKEN ROW - RENTABILITY, STATUS AND ACTIONS */}

                <div className={classes.boxItemFieldContent}>
                  <div className={classes.itemTitle}>
                    <SpaOutlinedIcon style={{ fontSize: '20px' }} />
                    <div className={classes.caption}>Rentabilidade</div>
                  </div>

                  <div className={classes.itemValue}>
                    {format.formatCurrency(investment.rentability)}
                  </div>
                </div>

                {/* BUTTONS TO EDIT AND CANCEL */}
                <div className={classes.boxItemFieldContent}>
                  <div className={classes.transparent}>&nbsp;</div>

                  <div className={classes.itemActions}>
                    <ActionButton
                      button="edit"
                      status={investment.status}
                      onClick={(e) => handleEditInvestment(investment)}
                    />
                    <span className={classes.transparent}>&nbsp;</span>
                    <ActionButton
                      button="cancel"
                      status={investment.status}
                      onClick={(e) => handleCancelInvestment(investment)}
                    />
                    <span className={classes.transparent}>&nbsp;</span>

                    <ActionButton
                      button="voucher"
                      status={investment.status}
                      onClick={(e) => handleSetVoucher(investment)}
                    />
                  </div>
                </div>
                {/* BUTTOM TO RESGATE */}
                <div className={classes.boxItemFieldContent}>
                  <div className={classes.transparent}>&nbsp;</div>
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={!enableButton('rescue', investment.status)}
                      onClick={(e) => handleRescueInvestment(investment)}
                    >
                      Resgatar
                    </Button>
                  </div>
                </div>
                {/* STATUS MESSAGES */}
                <div className={classes.boxItemFieldContent}>
                  <div className={classes.itemTitle}>
                    <SyncOutlinedIcon style={{ fontSize: '20px' }} />
                    <div className={classes.caption}>Status</div>
                  </div>

                  <div
                    className={`${classes.itemValue} ${classes.itemValueStatus}`}
                  >
                    {investment.status}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <span className={classes.instructions} style={{ fontSize: '1.5rem' }}>
            Você ainda não fez nenhum investimento.
          </span>
          <span className={classes.instructions} style={{ fontSize: '1.5rem' }}>
            Faça um agora mesmo clicando no botão acima.
          </span>
        </>
      )}
      {modal.modalName === 'Voucher' && (
        <ReactModal open={modal.visible} size="650">
          <VoucherInvestment onClose={handleCloseModal} />
        </ReactModal>
      )}

      {/* Dialog here! */}
      <CustomDialog
        open={dialog.open}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
        title={dialog.title}
        message={dialog.msg}
      />
    </>
  );
}
