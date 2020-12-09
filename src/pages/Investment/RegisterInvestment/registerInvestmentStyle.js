export const styles = {
  root: {
    '& .MuiTextField-root': {
      width: '45ch',
    },
    '& .Mui-disabled': {
      '& .MuiInputBase-input': {
        fontSize: '1.3rem',
        color: '#8e24aa',
      },
    },
  },
  input: {
    fontSize: 18,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '15px',
    backgroundColor: 'white',
    borderStyle: 'none',
    borderRadius: '5px',
    color: '#4a5759',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: '20px',
    fontSize: '0.8rem',
  },
  field: {
    width: '45ch',
    marginBottom: '20px',
  },
  destak: {
    fontWeight: '700px',
  },
  boxButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '15px',
  },
};
