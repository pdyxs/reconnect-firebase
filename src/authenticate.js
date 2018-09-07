export const AUTH_IS_LOGGING_IN = '111edbf2-3487-47c8-b13a-7828e54ed034';

export function authReducer(state = false, action) {
  switch (action.type) {
    case AUTH_IS_LOGGING_IN:
      return action.isLoggingIn;
    default:
      return state;
  }
}

function authIsLoggingIn(bool) {
  return {
    type: AUTH_IS_LOGGING_IN,
    isLoggingIn: bool
  }
}

export function authLogin(firebase, scopes) {
  return (dispatch) => {
    dispatch(authIsLoggingIn(true));
    firebase.login({
      provider: 'google',
      type: 'popup',
      scopes: [
        'email', 'profile', ...scopes
      ],
    }).then((response) =>
      dispatch(authIsLoggingIn(false))
    ).catch(() =>
      dispatch(authIsLoggingIn(false))
    );
  }
}
