const VISIBLE_BUTTONS_LOGGED = 'VISIBLE_BUTTONS_LOGGED';

const initialState = {
  visibleButtonSignUp: true,
  labelButtonSignIn: 'Entrar',
  navegateTo: '/entrar',
  navegateHomeTo: '/',
  linkCadastro: false,
  linkPerfil: false,
  linkInvestmentos: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case VISIBLE_BUTTONS_LOGGED:
      return {
        ...state,
        visibleButtonSignUp: !action.payload,
        labelButtonSignIn: action.payload ? 'Sair' : 'Entrar',
        navegateTo: action.payload ? '/' : '/entrar',
        navegateHomeTo: action.payload ? '/minha-conta' : '/',
        linkCadastro: action.payload,
        linkPerfil: action.payload,
        linkInvestmentos: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
