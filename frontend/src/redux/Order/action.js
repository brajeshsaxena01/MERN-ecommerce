import { toast } from "react-toastify";
import * as Types from "./actionTypes";
import axios from "axios";
import { getError } from "../../components/utils";

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
const fetchAllOrdersSuccess = (payload) => {
  return {
    type: Types.FETCH_ALL_ORDERS_SUCCESS,
    payload,
  };
};
const updateOrderSuccess = (payload) => {
  return {
    type: Types.UPDATE_ORDER_SUCCESS,
    payload,
  };
};

//Create user data
export const addOrder = (payload) => (dispatch) => {
  let order = payload;
  axios
    .post("/api/orders", order)
    .then(function (res) {
      dispatch(addOrderSuccess(res.data));
      if (order.paymentMethod == "cash") {
        toast.success("Order placed successfully!");
      }
      // console.log(response);
    })
    .catch(function (error) {
      // console.log(error);
      toast.error(getError(error));
    });
};
export const clearCurrentOrder = (payload) => (dispatch) => {
  dispatch(clearCurrentOrderSuccess());
};

export const fetchOrderByLoggedInUserId = (payload) => (dispatch) => {
  // let userId = payload;
  axios
    .get("/api/orders/user")
    .then((res) => {
      dispatch(fetchOrderByUserIdSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const fetchAllOrders =
  ({ sort, pagination }) =>
  (dispatch) => {
    let queryString = "";
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }

    axios
      .get(`/api/orders?${queryString}`)
      .then((res) => {
        const totalOrder = res.headers["x-total-count"];
        dispatch(
          fetchAllOrdersSuccess({ orders: res.data, totalOrder: +totalOrder })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const updateOrder = (payload) => (dispatch) => {
  let updatedOrder = payload;
  axios
    .patch(`/api/orders/${updatedOrder.id}`, updatedOrder, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(updateOrderSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
