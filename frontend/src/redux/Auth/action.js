import { toast } from "react-toastify";
import * as Types from "./actionTypes";
import axios from "axios";
import { getError } from "../../components/utils";

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
const fetchAllUsersSuccess = (payload) => {
  return {
    type: Types.FETCH_ALL_USERS_SUCCESS,
    payload,
  };
};
const editUserRoleSuccess = (payload) => {
  return {
    type: Types.EDIT_USER_ROLE_SUCCESS,
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
      console.log(res.data);
      dispatch(userSignInSuccess(res.data));
      toast.success("You logged in successfully!");
    })
    .catch((err) => {
      let message = getError(err);
      toast.error();
      dispatch(userSignInFailure({ message: message }));
      // toast.error(err.message, { icon: false });
      console.log("message", err);
    });
};

export const userSignOut = () => (dispatch) => {
  console.log("in user-signout");
  axios
    .get("/api/users/logout")
    .then((res) => {
      console.log(res.data);
      dispatch(userSignOutSuccess());
      toast.success("Logged out successfully!");
    })
    .catch((err) => {
      console.log(err.message);
    });
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
      toast.success("Address added successfully!");
    })
    .catch((err) => {
      toast.error(getError(err));
      // console.log(err);
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
      toast.success("Details updated successfully!");
    })
    .catch((err) => {
      toast.error(getError(err));
      // console.log(err);
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
      // console.log(err);
      dispatch(checkUserLoggedInOrNotFailure(err.message));
    });
};
export const fetchAllUsers = (payload) => (dispatch) => {
  axios
    .get("/api/users")
    .then((res) => {
      // console.log("user info", res.data);
      dispatch(fetchAllUsersSuccess(res.data));
    })
    .catch((err) => {
      // console.log(err);
      toast.error(getError(err));
    });
};

export const updateUserRole = (payload) => (dispatch) => {
  let updatedUserData = payload;
  axios
    .patch(`/api/users/${updatedUserData.id}`, updatedUserData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(editUserRoleSuccess(res.data));
      toast.success("Role updated successfully!");
    })
    .catch((err) => {
      // console.log(err);
      toast.error(getError(err));
    });
};
