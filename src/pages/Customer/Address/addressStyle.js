import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  field: {
    '& .MuiTextField-root': {
      marginRight: theme.spacing(4),
      width: '20ch',
    },
  },
  lineColumn: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginTop: '0px',
  },
  lineRow: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: '15px',
  },
}));
