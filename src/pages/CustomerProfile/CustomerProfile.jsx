import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Button from '../../components/CustomButtons/Button.js';
import Typography from '@material-ui/core/Typography';
import Card from '../../components/Card/Card.js';
import CardAvatar from '../../components/Card/CardAvatar.js';
import CardBody from '../../components/Card/CardBody.js';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { formatCurrency } from '../../helpers/formatHelpers';
import { styles } from './customerProfileStyle';
import avatarDefault from '../../assets/images/user_green.jpg';
import '../../App.css';
import ReactModal from '../../components/Modal/ReactModal';
import { visibleModal, actualModal } from '../../states/Modal/modalActions';
import CustomerProfilePhoto from './CustomerProfilePhoto';

const useStyles = makeStyles(styles);

export default function CustomerProfile() {
  const [avatar, setAvatar] = useState(avatarDefault);
  const modalState = useSelector((state) => state.modalState);
  const customerState = useSelector((state) => state.customerState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(customerState.customer)) {
      if (customerState.customer.personal_data.photo_name !== '') {
        setAvatar(
          `${customerState.customer.personal_data.photo_url}${customerState.customer.personal_data.photo_name}`
        );
      }
    }
  }, [customerState.customer]);

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
                {customerState.customer.code || 'CÓDIGO'}
              </h6>
              <h4 className={classes.cardName}>
                {customerState.customer.name || 'Nome'}
              </h4>
              <h5 className={classes.cardEmail}>
                {customerState.customer.email || 'Email'}
              </h5>
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

          <Card className={classes.cardProfile}>
            <CardBody profile>
              <Typography variant="subtitle2">Meus investimentos</Typography>

              <div className={classes.boxInvestments}>
                {!_.isEmpty(customerState.customer.name)
                  ? customerState.customer.investments.map((investment) => {
                      const { capital, months } = investment;
                      return (
                        <div
                          key={investment._id}
                          className={classes.itemsInvestments}
                        >
                          <div className={classes.item}>
                            {formatCurrency(capital)}
                          </div>
                          <div className={classes.item}>
                            Tempo: {months} meses
                          </div>
                        </div>
                      );
                    })
                  : ''}
              </div>
            </CardBody>
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
