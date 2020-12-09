import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import '../../App.css';
import { styles } from './perfilStyle';
import CustomTabs from '../../components/CustomTabs/CustomTabs';

const useStyles = makeStyles(styles);

export default function PerfilInvestidor() {
  const classes = useStyles();
  return (
    <div className="home">
      <div className={classes.box}>
        <CustomTabs />
      </div>
    </div>
  );
}
