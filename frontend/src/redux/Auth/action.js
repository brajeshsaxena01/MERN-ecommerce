import * as Types from './actionTypes';
import axios from 'axios';

const userSignUpSuccess = (payload) => {
  return {
    type: Types.USER_SIGNUP_SUCCESS,
    payload,
  };
};
const userSignInSuccess = (payload) => {
  return {
    type: Types.USER_SIGNIN_SUCCESS,
    payload,
  };
};
const userSignOutSuccess = () => {
  return {
    type: Types.USER_SIGNOUT_SUCCESS,
  };
};

export const userSignUp = (data) => (dispatch) => {
  dispatch(userSignUpSuccess);
};

export const userSignIn = (data) => (dispatch) => {
  dispatch(userSignInSuccess(data));
};

export const userSignOut = () => (dispatch) => {
  console.log('in user-signout');
  dispatch(userSignOutSuccess());
};
