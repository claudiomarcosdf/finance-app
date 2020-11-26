const VISIBLE_BUTTONS_LOGGED = 'VISIBLE_BUTTONS_LOGGED';

export const visibleButtonsLogged = (value) => {
  return {
    type: VISIBLE_BUTTONS_LOGGED,
    payload: value,
  };
};
