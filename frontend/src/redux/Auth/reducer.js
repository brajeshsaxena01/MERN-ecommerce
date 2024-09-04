import * as Types from "./actionTypes";

const initState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  custom_data: localStorage.getItem("custom_data")
    ? JSON.parse(localStorage.getItem("custom_data"))
    : null,
  error: null,
};

export const authReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        userInfo: payload,
      };
    }
    case Types.USER_SIGNIN_SUCCESS: {
      return {
        ...state,
        userInfo: payload,
      };
    }
    case Types.USER_SIGNIN_FAILURE: {
      return {
        ...state,
        error: payload,
      };
    }
    case Types.USER_SIGNOUT_SUCCESS: {
      return {
        ...state,
        userInfo: null,
      };
    }
    case Types.SAVE_SHIPPING_ADDRESS_SUCCESS: {
      return {
        ...state,
        userInfo: payload,
      };
    }
    case Types.UPDATE_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        userInfo: payload,
      };
    }
    default: {
      return state;
    }
  }
};
