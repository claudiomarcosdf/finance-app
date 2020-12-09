import React from 'react';
import Card from '../../../components/Card/Card.js';
import CardBody from '../../../components/Card/CardBody.js';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { styles } from './cardInvestmentStyle';
import { formatCurrency } from '../../../helpers/formatHelpers';

const useStyles = makeStyles(styles);

export default function CardInvestment({ investments }) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.cardProfile}>
        <CardBody profile>
          <Typography variant="subtitle2">Meus investimentos</Typography>

          <div className={classes.boxInvestments}>
            {investments.length !== 0
              ? (console.log(investments.length),
                investments.map((investment) => {
                  const { capital, months } = investment;
                  return (
                    <div
                      key={investment._id}
                      className={classes.itemsInvestments}
                    >
                      <div className={classes.item}>
                        {formatCurrency(capital)}
                      </div>
                      <div className={classes.item}>Tempo: {months} meses</div>
                    </div>
                  );
                }))
              : ''}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
