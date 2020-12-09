const painelItem = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  borderRadius: '5px',
  boxShadow: '1px 1px 3px 0px rgba(21, 44, 51, 0.75)',
  minHeight: '160px',
  padding: '15px 0px 0px 0px',
  marginBottom: '10px',
};

export const styles = {
  boxItemPaper: {
    ...painelItem,
    backgroundColor: '#fafafa',
    borderWidth: '0.2px',
    borderColor: 'none',
    // color: '#4a5759',
    color: '#05668d',
  },
  instructions: {
    color: '#60a3bc',
  },

  boxItemFieldContent: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    minWidth: '195px',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: '15px',
    marginBottom: '20px',
  },
  itemTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontStyle: 'italic',
    fontSize: '0.8rem',
  },
  itemValue: {
    fontSize: '1.5rem',
    paddingTop: '5px',
  },
  itemValueStatus: {
    color: '#8e24aa',
  },
  itemActions: {
    paddingTop: '2px',
    fontSize: '1.9rem',
  },
  caption: {
    marginLeft: '2px',
  },
  min: {
    fontSize: '0.8rem',
  },
  transparent: {
    color: 'transparent',
    marginRight: '05px',
  },
};
