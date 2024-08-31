import * as Types from "./actionTypes";
import axios from "axios";

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
const userSignInFailure = (payload) => {
  return {
    type: Types.USER_SIGNIN_FAILURE,
    payload,
  };
};
const userSignOutSuccess = () => {
  return {
    type: Types.USER_SIGNOUT_SUCCESS,
  };
};

//Create user data
export const userSignUp = (payload) => (dispatch) => {
  let userData = payload;
  axios
    .post("/users", userData)
    .then(function (response) {
      dispatch(userSignUpSuccess(response.data));
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

//Fetch user data
export const userSignIn = (payload) => (dispatch) => {
  const { email, password } = payload;
  // console.log(payload);
  axios
    .get(`/users?email=${email}`)
    .then((res) => {
      if (password == res.data[0].password) {
        dispatch(userSignInSuccess(res.data[0]));
        // console.log(res.data[0]);
      } else {
        console.log({ message: "wrong credential" });
        dispatch(userSignInFailure({ message: "wrong credential" }));
      }
    })
    .catch((err) => {
      dispatch(userSignInFailure(err));
      console.log(err);
    });
};

export const userSignOut = () => (dispatch) => {
  console.log("in user-signout");
  dispatch(userSignOutSuccess());
};
