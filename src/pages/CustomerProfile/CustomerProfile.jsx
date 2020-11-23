import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Button from '../../components/CustomButtons/Button.js';
import Card from '../../components/Card/Card.js';
import CardAvatar from '../../components/Card/CardAvatar.js';
import CardBody from '../../components/Card/CardBody.js';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { styles } from './CustomerProfileStyle';
import avatarDefault from '../../assets/images/user_green.jpg';
import '../../App.css';
import { fetchCustomer } from '../../states/Customer/customerActions';
import ReactModal from '../../components/Modal/ReactModal';
import { visibleModal, actualModal } from '../../states/Modal/modalActions';
import CustomerProfilePhoto from './CustomerProfilePhoto';

const useStyles = makeStyles(styles);

export default function CustomerProfile() {
  const [avatar, setAvatar] = useState(avatarDefault);
  const modalState = useSelector((state) => state.modalState);
  const customerState = useSelector((state) => state.customerState);
  const dispatch = useDispatch();

  const getCustomer = useCallback(() => {
    dispatch(fetchCustomer('5faab9962fee31b0cb455fbb')); //apenas para iniciar o app com um cliente
  }, [dispatch]);

  useEffect(() => {
    getCustomer();
    if (!_.isEmpty(customerState.customer)) {
      if (!_.isUndefined(customerState.customer.personal_data.photo_name)) {
        setAvatar(
          `${customerState.customer.personal_data.photo_url}${customerState.customer.personal_data.photo_name}`
        );
      }
    }
  }, [getCustomer, avatar, customerState.customer]);

  const handleCloseModal = () => {
    dispatch(visibleModal(false));
  };

  const handleUpdatePhoto = (event) => {
    dispatch(actualModal('Photo'));
    dispatch(visibleModal(true));
  };

  const classes = useStyles();
  return (
    <div className="home">
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card profile className={classes.cardProfile}>
            <CardAvatar profile>
              <Tooltip
                title="Clique na foto para editar"
                placement="right-end"
                arrow
              >
                <a href="#user" onClick={handleUpdatePhoto}>
                  <img src={avatar} alt="..." />
                </a>
              </Tooltip>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>
                {customerState.customer.code || 'CÓDIGO'}
              </h6>
              <h4 className={classes.cardTitleBlack}>
                {customerState.customer.name || 'Nome'}
              </h4>
              <div className={classes.description}>
                Status:{' '}
                <span
                  className={
                    customerState.customer.status === 'ATIVO'
                      ? classes.activeColor
                      : classes.inactiveColor
                  }
                >
                  {customerState.customer.status || ''}
                </span>
              </div>
              <Link to="/cadastro" className={classes.linkDecorator}>
                <Button color="primary" round>
                  Meus dados
                </Button>
              </Link>
            </CardBody>
            <span className={classes.errorMsg}>{customerState.errors[0]}</span>
          </Card>
        </GridItem>
      </GridContainer>

      {modalState.modalName === 'Photo' && (
        <ReactModal open={modalState.visible}>
          <CustomerProfilePhoto onClose={handleCloseModal} />
        </ReactModal>
      )}
    </div>
  );
}
