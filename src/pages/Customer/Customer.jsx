import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
      <div className={classes.box}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper className={classes.paperStepper} elevation={0}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>
        <div>
          {activeStep === steps.length ? (
            <div>
              {!saved && handleSave()}

              <Grid item xs={12} sm={12} md={12}>
                <Paper className={classes.paperContent} variant="outlined">
                  <Typography className={classes.instructions}>
                    {errors.length <= 0 ? (
                      <span>Seus dados foram salvos e estão em análise!</span>
                    ) : (
                      <span>
                        Ocorreu um erro, favor reiniciar e preencher os dados
                        corretamente.
                      </span>
                    )}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Paper className={classes.paperButton} elevation={0}>
                  <Button onClick={handleReset}>Reiniciar</Button>
                </Paper>
              </Grid>
            </div>
          ) : (
            <div>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={12} md={12}>
                  <Paper className={classes.paperContent} variant="outlined">
                    <div className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Paper className={classes.paperButton} elevation={0}>
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
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
