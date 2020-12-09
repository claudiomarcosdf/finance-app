import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 755,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Options({ options, id }) {
  const [choosedAnwer, setChoosedAnswer] = useState([]); //TEM QUE COLOCAR NO ESTADO GLOBAL PQ QD MUDA DE PÁGINA RECARREGA
  const [answersTypeChoosed, setAnswersTypeChoosed] = useState([]);

  useEffect(() => {
    const array = choosedAnwer.map((item) => item.type);
    setAnswersTypeChoosed(array);
  }, [choosedAnwer]);

  const handleClick = (e) => {
    const answerQuestionExists = choosedAnwer.find(
      (answer) => answer.question === e.question
    );
    if (answerQuestionExists) {
      const newChoosedAnswer = choosedAnwer.filter(
        (answer) => answer.question !== e.question
      );
      setChoosedAnswer([...newChoosedAnswer, e]); //retira a questão do array e adiona a selecionada
    } else {
      setChoosedAnswer([...choosedAnwer, e]);
    }
  };

  const markItem = (value) => {
    const item = choosedAnwer.find((item) => item.value === value);
    if (item) {
      return '#95d5b2';
    } else {
      return '';
    }
  };

  const classes = useStyles();
  return (
    <>
      {console.log(choosedAnwer)}
      {answersTypeChoosed.length > 0 &&
        console.log('Choosed', _.countBy(answersTypeChoosed, Math.floor))}
      {answersTypeChoosed.length > 0 &&
        console.log('Final', _.map(_.countBy(answersTypeChoosed, Math.floor)))}
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        {options.map((option, idx) => (
          <>
            <ListItem
              key={`${id}-${idx}`}
              button
              style={{ background: markItem(`${id}-${idx}`) }}
              onClick={(e) =>
                handleClick({
                  question: id,
                  value: `${id}-${idx}`,
                  type: option.answer_type,
                })
              }
            >
              <ListItemText secondary={option.answer}></ListItemText>
            </ListItem>
            <Divider light />
          </>
        ))}
      </List>
    </>
  );
}
