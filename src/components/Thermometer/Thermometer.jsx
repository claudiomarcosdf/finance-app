import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { styles } from './thermometer';
const useStyles = makeStyles(styles);

export default function Thermometer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <div className={`${classes.itemBox} ${classes.box1}`}>Conservador</div>
        <div className={`${classes.itemBox} ${classes.box2}`}>Moderado</div>
        <div className={`${classes.itemBox} ${classes.box3}`}>Arrojado</div>
        <div className={`${classes.itemBox} ${classes.box4}`}>Alienado</div>
      </div>
      <div className={classes.box}>
        <div className={`${classes.itemBox} ${classes.indicator}`}></div>
        <div className={`${classes.itemBox} ${classes.indicator}`}>
          <i class="fas fa-hand-point-up"></i>
        </div>
        <div className={`${classes.itemBox} ${classes.indicator}`}></div>
        <div className={`${classes.itemBox} ${classes.indicator}`}></div>
      </div>

      <div className={classes.space}>
        <Link to="/" className={classes.linkDecorator}>
          <Button variant="outlined" color="primary">
            Finalizar
          </Button>
        </Link>
      </div>
    </div>
  );
}
