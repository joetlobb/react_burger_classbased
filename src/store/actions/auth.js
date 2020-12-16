import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, method) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3oaZxMbRIdzfp4mkoIX64qNGBlOSQmgk'
    if (method === 'login') {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3oaZxMbRIdzfp4mkoIX64qNGBlOSQmgk'
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(
          response.data.idToken,
          response.data.localId));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });
  }
}