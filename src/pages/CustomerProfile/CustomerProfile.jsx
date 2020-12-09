import React, { useState, useEffect } from 'react';
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

import GlobalMessages from '../../components/Messages/GlobalMessages';
import { styles } from './customerProfileStyle';
import avatarDefault from '../../assets/images/user_green.jpg';
import '../../App.css';
import ReactModal from '../../components/Modal/ReactModal';
import { visibleModal, actualModal } from '../../states/Modal/modalActions';
import CustomerProfilePhoto from './CustomerProfilePhoto';
import CardInvestment from './CardInvestment/CardInvestment';

const useStyles = makeStyles(styles);

export default function CustomerProfile() {
  const [avatar, setAvatar] = useState(avatarDefault);
  const modalState = useSelector((state) => state.modalState);
  const customer = useSelector((state) => state.customerState.customer);
  const errors = useSelector((state) => state.customerState.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(customer)) {
      if (customer.personal_data.photo_name !== '') {
        setAvatar(
          `${customer.personal_data.photo_url}${customer.personal_data.photo_name}`
        );
      }
    }
  }, [customer]);

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
        <GridItem xs={12} sm={12} md={12}>
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
                {customer.code || 'CÓDIGO'}
              </h6>
              <h4 className={classes.cardName}>{customer.name || 'Nome'}</h4>
              <h5 className={classes.cardEmail}>{customer.email || 'Email'}</h5>
              <div className={classes.description}>
                Status:{' '}
                <span
                  className={
                    customer.status === 'ATIVO'
                      ? classes.activeColor
                      : classes.inactiveColor
                  }
                >
                  {customer.status || ''}
                </span>
              </div>
              <Link to="/cadastro" className={classes.linkDecorator}>
                <Button color="primary" round>
                  Meus dados
                </Button>
              </Link>
            </CardBody>
            <span className={classes.errorMsg}>{errors[0]}</span>
          </Card>

          {!_.isEmpty(customer) && (
            <CardInvestment investments={customer.investments} />
          )}
        </GridItem>
      </GridContainer>

      {modalState.modalName === 'Photo' && (
        <ReactModal open={modalState.visible} size="500">
          <CustomerProfilePhoto onClose={handleCloseModal} />
        </ReactModal>
      )}
      <GlobalMessages />
    </div>
  );
}
