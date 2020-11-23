import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
        <div className={classes.box}></div>
        {/* <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={0}>
                Home
              </Paper>
            </Grid>
          </Grid>
        </div> */}
      </div>
    </>
  );
}
