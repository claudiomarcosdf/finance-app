import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typograpy from '@material-ui/core/Typography';

import '../App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
    height: '75vh',
    elevation: 0,
  },
  box: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    color: 'blue',
    borderStyle: 'none',
    borderRadius: '5px',
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <div className="home">
        <div>
          <div>
            <Typograpy variant="h2">Bem vindo!</Typograpy>
          </div>
          <div>
            <Typograpy variant="h2">Faça seu dinheiro render.</Typograpy>
          </div>
        </div>
      </div>
    </>
  );
}
