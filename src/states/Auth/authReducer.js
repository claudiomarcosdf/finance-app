const userKey = '_invest_user';
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem(userKey)),
  validToken: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOKEN_VALIDATED':
      if (action.payload) {
        return { ...state, validToken: true };
      } else {
        localStorage.removeItem(userKey);
        return { ...state, validToken: false, user: null };
      }

    case 'USER_FETCHED':
      const { name, lastName, email, token } = action.payload;
      localStorage.setItem(
        userKey,
        JSON.stringify({ name, lastName, email, token })
      );
      return {
        ...state,
        user: { name, lastName, email, token },
        validToken: true,
      };

    default:
      return state;
  }
};
