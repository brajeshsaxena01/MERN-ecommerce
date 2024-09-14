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

const saveShipingAddressSuccess = (payload) => {
  return {
    type: Types.SAVE_SHIPPING_ADDRESS_SUCCESS,
    payload,
  };
};
const updateUserDetailsSuccess = (payload) => {
  return {
    type: Types.UPDATE_USER_DETAILS_SUCCESS,
    payload,
  };
};
const checkUserLoggedInOrNotSuccess = (payload) => {
  return {
    type: Types.CHECKED_USER_LOGGEDIN_OR_NOT_SUCCESS,
    payload,
  };
};
const checkUserLoggedInOrNotFailure = (payload) => {
  return {
    type: Types.CHECKED_USER_LOGGEDIN_OR_NOT_FAILURE,
    payload,
  };
};

//Create user data
export const userSignUp = (payload) => (dispatch) => {
  let userData = payload;
  axios
    .post("/api/users/signup", userData)
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
  const loginInfo = payload;
  // console.log(payload);
  axios
    .post("/api/users/signin", { email, password })
    .then((res) => {
      // console.log(res.data);
      dispatch(userSignInSuccess(res.data));
    })
    .catch((err) => {
      dispatch(userSignInFailure({ message: err.message }));
      console.log("message", err.message);
    });
};

export const userSignOut = () => (dispatch) => {
  console.log("in user-signout");
  dispatch(userSignOutSuccess());
};

export const saveShipingAddress = (payload) => (dispatch) => {
  let updatedUserData = payload;
  axios
    .patch(`/api/users/${updatedUserData.id}`, updatedUserData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(saveShipingAddressSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateUserDetails = (payload) => (dispatch) => {
  let updatedUserData = payload;
  axios
    .patch(`/api/users/${updatedUserData.id}`, updatedUserData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(updateUserDetailsSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const checkLoggedInUser = (payload) => (dispatch) => {
  axios
    .get("/api/users/check")
    .then((res) => {
      // console.log("user info", res.data);
      dispatch(checkUserLoggedInOrNotSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(checkUserLoggedInOrNotFailure(err.message));
    });
};
