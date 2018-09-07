import AuthWidget from './AuthWidget';
import PrivateRoute from './PrivateRoute';
import {
  authConnect,
  checkIfAuth,
  connectFirebase,
  connectFirestore,
  connectStore
} from './connect';
import { authReducer, authLogin } from './authenticate';

export {
  AuthWidget,
  PrivateRoute,

  connectFirebase,
  connectFirestore,
  connectStore,
  authConnect,
  checkIfAuth,

  authReducer,
  authLogin
};
