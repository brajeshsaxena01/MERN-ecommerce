import * as Types from "./actionTypes";
import axios from "axios";

const addOrderSuccess = (payload) => {
  return {
    type: Types.ADD_ORDER_SUCCESS,
    payload,
  };
};
const clearCurrentOrderSuccess = (payload) => {
  return {
    type: Types.CLEAR_CURRENT_ORDER_SUCCESS,
    payload,
  };
};

const fetchOrderByUserIdSuccess = (payload) => {
  return {
    type: Types.FETCH_ORDER_BY_USER_ID_SUCCESS,
    payload,
  };
};

//Create user data
export const addOrder = (payload) => (dispatch) => {
  let order = payload;
  axios
    .post("/orders", order)
    .then(function (res) {
      dispatch(addOrderSuccess(res.data));
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const clearCurrentOrder = (payload) => (dispatch) => {
  dispatch(clearCurrentOrderSuccess());
};

export const fetchOrderByLoggedInUserId = (payload) => (dispatch) => {
  let userId = payload;
  axios
    .get(`/orders/?user.id=${userId}`)
    .then((res) => {
      dispatch(fetchOrderByUserIdSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
