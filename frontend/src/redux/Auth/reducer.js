import * as Types from "./actionTypes";

const initState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  custom_data: localStorage.getItem("custom_data")
    ? JSON.parse(localStorage.getItem("custom_data"))
    : null,
  allUsers: null,
  loading:false,
  error: null,
  checkedUser: false,
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
    case Types.CHECKED_USER_LOGGEDIN_OR_NOT_SUCCESS: {
      return {
        ...state,
        userInfo: payload,
        checkedUser: true,

        error: null,
      };
    }
    case Types.CHECKED_USER_LOGGEDIN_OR_NOT_FAILURE: {
      return {
        ...state,
        checkedUser: true,
        error: payload,
      };
    }
    case Types.FETCH_ALL_USERS_SUCCESS: {
      return {
        ...state,
        allUsers: payload,
        error: payload,
      };
    }
    case Types.EDIT_USER_ROLE_SUCCESS: {
      const newUser = payload;
      //.find() method will return the product that matches the id else it return undefined
      const isUserPresentInTheAllUsers = state?.allUsers.find(
        (x) => x.id === newUser.id
      );
      // console.log('inCartReducer', isItemPresentInTheCart);

      const usersData = isUserPresentInTheAllUsers
        ? state.allUsers.map((user) =>
            user.id === isUserPresentInTheAllUsers.id ? newUser : user
          )
        : [...state.allUsers, newUser];
      return {
        ...state,
        allUsers: usersData,
        loading: false,
        error: "",
      };
    }
    default: {
      return state;
    }
  }
};
