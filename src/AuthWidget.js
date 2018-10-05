import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { authLogin } from './authenticate';
import { connectFirebase, authConnect } from './connect';
import { LoadingIcon } from '@pdyxs/re-decorate';

const mapStateToProps = (state) => {
  return {
    isLoggingIn: state.authIsLoggingIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (firebase) => dispatch(authLogin(firebase))
  };
}

class AuthWidget extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  isLoaded() {
    return isLoaded(this.props.auth);
  }

  isLoggedIn() {
    return !isEmpty(this.props.auth);
  }

  login() {
    this.props.login(this.props.firebase);
  }

  render() {
    if (!this.isLoaded() || this.props.isLoggingIn) {
      return (
        <LoadingIcon />
      );
    }

    if (this.isLoggedIn())
    {
      return (
        <span className="form-inline">
          {
            isLoaded(this.props.profile) ?
            (
              <span className="small">
                <span className="d-none d-md-inline">Logged in as </span>
                {this.props.profile.displayName}
              </span>
            ) : (
              <LoadingIcon />
            )
          }

          <button className="btn btn-danger ml-2"
            onClick={() => {
              this.props.firebase.logout();
            }}
            >Logout</button>
        </span>
      );
    } else {
      return (
        <button className="btn btn-primary" onClick={this.login}>
          Login
        </button>
      )
    }
  }
}

AuthWidget.propTypes = {};
const enhance = compose(
  authConnect(),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(AuthWidget);
