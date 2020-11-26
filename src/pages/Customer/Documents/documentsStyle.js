import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderRadius: '10px',
    marginBottom: '1px',
    backgroundColor: '#f1f2f6',
    padding: '0px 10px 0px 10px',
    marginRight: '5px',
    maxWidth: '250px',
    justifyContent: 'center',
  },
  boxColumn: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendOk: {
    color: '#4b7bec',
    fontSize: '11px',
    marginBottom: '5px',
  },
  legendNotOk: {
    color: '#ff3838',
    fontSize: '11px',
    marginBottom: '5px',
  },
}));
