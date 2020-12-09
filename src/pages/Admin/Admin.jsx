import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { styles } from './adminStyle';
import MenuAdmin from './MenuAdmin/MenuAdmin';
import Dashboard from './Dashboard/Dashboard';

const useStyles = makeStyles(styles);

export default function Admin() {
  const [itemSelected, setItemSelected] = useState(Dashboard);

  const handleClick = (value) => {
    setItemSelected(value);
  };

  const classes = useStyles();
  return (
    <div className={classes.body}>
      <CssBaseline />
      <Container fixed>
        <div className={classes.container}>
          <div>
            <MenuAdmin onClick={handleClick} />
          </div>
          <div className={classes.content}>
            <span>{itemSelected}</span>
          </div>
          <div className={classes.footer}>Desenvolvido por Claudio Marcos</div>
        </div>
      </Container>
    </div>
  );
}
