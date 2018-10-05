import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Route, Redirect, Switch } from 'react-router-dom';
import { LoadingIcon } from '@pdyxs/re-decorate';

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const enhance = compose(
  firebaseConnect(),
  connect(mapStateToProps, null, null, {
    pure: false
  })
);

const PrivateRoute = ({
  component: Component, auth, email, ...rest
}) => {
  if (!auth || !isLoaded(auth)) {
    return (
      <LoadingIcon />
    );
  }

  if (isEmpty(auth) || (email && email != auth.email)) {
    return (
      <Switch>
        <Route exact path='/' />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <Route {...rest} render={(props) => (
        <Component {...rest} {...props} />
    )}/>
  );
};

export default enhance(PrivateRoute);
