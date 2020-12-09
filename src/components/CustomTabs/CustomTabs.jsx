import React from 'react';
import { makeStyles, useTheme, withTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Options from '../Options/Options';
import Thermometer from '../Thermometer/Thermometer';

const quiz1 = {
  _id: 'abc001',
  question: 'Quem descobriu o Brasil?',
  options: [
    { answer: 'Pedro Álvares Cabral', answer_type: 1 },
    { answer: 'Bolsonaro', answer_type: 2 },
    { answer: 'Chacrinha', answer_type: 2 },
    { answer: 'Tiririca', answer_type: 3 },
  ],
};

const quiz2 = {
  _id: 'abc002',
  question: 'Qual a menina mais bonita do Brasil?',
  options: [
    { answer: 'Florzinha', answer_type: 3 },
    { answer: 'Nandinha', answer_type: 3 },
    { answer: 'Chiquinha', answer_type: 1 },
    { answer: 'Betinha', answer_type: 1 },
  ],
};

const quiz3 = {
  _id: 'abc003',
  question: 'Em qual ano você nasceu?',
  options: [
    { answer: 'Não sei', answer_type: 1 },
    { answer: 'Tenho dúvidas', answer_type: 3 },
    { answer: 'em 1980', answer_type: 3 },
    { answer: 'Não me recordo', answer_type: 2 },
  ],
};

const quiz4 = {
  _id: 'abc004',
  question: 'Qual seu sonho?',
  options: [
    { answer: 'Viajar', answer_type: 2 },
    { answer: 'Estou confuso', answer_type: 3 },
    { answer: 'Não sei', answer_type: 1 },
    { answer: 'Ser rico', answer_type: 2 },
  ],
};

const quiz5 = {
  _id: 'abc005',
  question: 'Qual o tamanho da sua riquiza?',
  options: [
    { answer: 'Sou pobre', answer_type: 1 },
    { answer: 'Não sei mensurar', answer_type: 1 },
    { answer: 'O bastante', answer_type: 3 },
    { answer: 'Estou em dúvida', answer_type: 2 },
  ],
};

const tutorialSteps = [
  {
    quiz: quiz1.question,
    answer: <Options options={quiz1.options} id={quiz1._id} />,
  },
  {
    quiz: quiz2.question,
    answer: <Options options={quiz2.options} id={quiz2._id} />,
  },
  {
    quiz: quiz3.question,
    answer: <Options options={quiz3.options} id={quiz3._id} />,
  },
  {
    quiz: quiz4.question,
    answer: <Options options={quiz4.options} id={quiz4._id} />,
  },
  {
    quiz: quiz5.question,
    answer: <Options options={quiz5.options} id={quiz5._id} />,
  },
  {
    quiz: 'Seu score',
    answer: <Thermometer />,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 755,
    flexGrow: 1,
    '& .MuiTypography-root': {
      fontSize: '1.4rem',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 60,
    paddingLeft: theme.spacing(1),
    backgroundColor: '#43a047',
    color: 'white',
  },
  area: {
    paddingTop: 20,
    height: 355,
    maxWidth: 755,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
}));

export default function CustomTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{tutorialSteps[activeStep].quiz}</Typography>
      </Paper>
      <div className={classes.area}>{tutorialSteps[activeStep].answer}</div>

      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        style={{ backgroundColor: 'white' }}
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Próxima
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Anterior
          </Button>
        }
      />
    </div>
  );
}
