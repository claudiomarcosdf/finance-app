import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import GlobalMessages from '../../components/Messages/GlobalMessages';
import { styles } from './customerStyle';
import '../../App.css';
import PersonalData from './PersonalData/PersonalData';
import Address from './Address/Address';
import BankData from './BankData/BankData';
import Documents from './Documents/Documents';
import { editCustomer } from '../../states/Customer/customerActions';

const useStyles = styles;

function getSteps() {
  return [
    'Dados pessoais',
    'Endereço e contato',
    'Dados bancários',
    'Documentos',
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalData />;
    case 1:
      return <Address />;
    case 2:
      return <BankData />;
    case 3:
      return <Documents />;
    default:
      return '';
  }
}

export default function Home() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [saved, setSaved] = React.useState(false);
  const steps = getSteps();

  const customer = useSelector((state) => state.customerState.customer);
  const errors = useSelector((state) => state.customerState.errors);
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClose = () => {
    return <Link to="/"></Link>;
  };

  const handleReset = () => {
    setActiveStep(0);
    setSaved(false);
  };

  const handleSave = () => {
    dispatch(editCustomer(customer));

    setSaved(true);
  };

  const classes = useStyles();
  return (
    <div className="home">
      {!_.isEmpty(customer) ? (
        <div className={classes.box}>
          <div className={classes.boxStepper}>
            <div className={classes.paperStepper} elevation={0}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
          <div>
            {activeStep === steps.length ? (
              <>
                <div className={classes.boxContent}>
                  {!saved && handleSave()}

                  <div className={classes.paperContent}>
                    <Typography className={classes.instructions}>
                      {errors.length <= 0 ? (
                        <span style={{ fontSize: '1.5rem' }}>
                          Seus dados foram salvos e estão em análise!
                        </span>
                      ) : (
                        <span style={{ fontSize: '1.5rem' }}>
                          Ocorreu um erro, favor reiniciar e preencher os dados
                          corretamente.
                        </span>
                      )}
                    </Typography>
                  </div>
                </div>
                <div className={classes.boxButton}>
                  <div className={classes.paperButton}>
                    <Button onClick={handleReset}>Reiniciar</Button>
                  </div>
                  <div className={classes.paperButton}>
                    <Button onClick={handleClose}>Sair</Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={classes.boxContent}>
                  <div className={classes.paperContent}>
                    <div className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </div>
                  </div>
                </div>
                <div className={classes.boxButton}>
                  <div className={classes.paperButton}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? 'Salvar' : 'Próximo'}
                    </Button>
                  </div>
                  <div className={classes.paperButton}>
                    <Link to="/" className={classes.linkDecorator}>
                      <Button className={classes.closeButton}>Sair</Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
          <GlobalMessages />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
