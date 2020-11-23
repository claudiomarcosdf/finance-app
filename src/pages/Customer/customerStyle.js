import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  box: {
    // height: '80%',
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    backgroundColor: '#ffffff',
    borderStyle: 'none',
    borderRadius: '5px',
  },
  root: {
    width: '100%',
    borderRadius: '5px',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paperStepper: {
    padding: theme.spacing(1),
    margin: '0px 10px 0px 10px',
  },
  paperContent: {
    padding: theme.spacing(2),
    margin: '0px 10px 0px 10px',
    minHeight: '53vh',
  },
  paperButton: {
    padding: theme.spacing(2),
    margin: '0px 10px 0px 10px',
  },
}));
