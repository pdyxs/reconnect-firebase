import { checkIfPropsContains, checkIfOrdered } from 'reconnect';
import { branch } from 'recompose';
import { compose } from "redux";
import { connect } from "react-redux";
import { withName } from 'reramble';
import { firebaseConnect, firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

export function connectFirebase() {
  return checkIfPropsContains('firebase',
    checkIfOrdered({name: 'firebase'},
      firebaseConnect()
    )
  );
}

export function connectFirestore(func) {
  if (!func) {
    return checkIfPropsContains('firestore',
      firestoreConnect()
    );
  }
  return firestoreConnect(func);
}

export function connectStore() {
  return checkIfPropsContains('store',
    getContext({
      store: PropTypes.object
    })
  );
}

export function authConnect() {
  return checkIfPropsContains('auth',
    compose(
      withName('auth from firebase'),
      connectFirebase(),
      connect(({firebase: {auth, profile}}) => ({auth, profile}))
    )
  );
}

export function checkIfAuth(hoc) {
  return compose(
    authConnect(),
    branch(
      ((props) => (!isEmpty(props.profile) && !isEmpty(props.auth))),
      hoc
    )
  );
}
