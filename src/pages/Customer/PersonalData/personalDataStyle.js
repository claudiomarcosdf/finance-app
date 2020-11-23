import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  field: {
    '& .MuiTextField-root': {
      marginRight: theme.spacing(4),
      width: '20ch',
    },
  },
  lineRow: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: '15px',
    // backgroundColor: 'yellow',
  },
}));
