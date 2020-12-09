import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  box: {
    // height: '80%',
    display: 'flex',
    flexDirection: 'column',
    width: '1080px',
    height: '624px',
    backgroundColor: '#ffffff',
    borderStyle: 'none',
    borderRadius: '5px',

    // backgroundColor: 'yellow',
  },
  root: {
    width: '100%',
    borderRadius: '5px',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },

  closeButton: {
    padding: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: '#60a3bc',
  },
  boxStepper: {
    // flexBasis: '100px',
    flexGrow: 1,
  },
  paperStepper: {
    padding: theme.spacing(1),
    margin: '0px 10px 0px 10px',
  },
  boxContent: {
    // flexBasis: '450px',
    flexGrow: 2,
    backgroundColor: '#ffffff',
    // flex: '3 0 450px',
  },
  paperContent: {
    minHeight: '450px',
    padding: theme.spacing(2),
    margin: '0px 20px 0px 20px',
  },
  boxButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    // flexBasis: '70px',
    flexGrow: 1,
  },
  paperButton: {
    padding: theme.spacing(2),
    margin: '0px 20px 0px 20px',
  },
  linkDecorator: {
    textDecoration: 'none',
  },
}));
