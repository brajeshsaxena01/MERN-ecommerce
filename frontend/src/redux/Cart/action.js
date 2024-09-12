import * as types from "./actionTypes";
import Axios from "axios";

const addToCartSuccess = (payload) => {
  return {
    type: types.ADD_TO_CART_SUCCESS,
    payload,
  };
};
const addToCartFailure = (payload) => {
  return {
    type: types.ADD_TO_CART_FAILURE,
    payload,
  };
};
const fetchCartItemRequest = (payload) => {
  return {
    type: types.FETCH_CART_ITEM_REQUEST,
    payload,
  };
};
const fetchCartItemSuccess = (payload) => {
  return {
    type: types.FETCH_CART_ITEM_SUCCESS,
    payload,
  };
};
const fetchCartItemFailure = (payload) => {
  return {
    type: types.FETCH_CART_ITEM_FAILURE,
    payload,
  };
};

const updateCartItemQuantitySuccess = (payload) => {
  return {
    type: types.UPDATE_CART_ITEM_QTY_SUCCESS,
    payload,
  };
};
const deleteItemInCartSuccess = (payload) => {
  return {
    type: types.DELETE_ITEM_IN_CART_SUCCESS,
    payload,
  };
};
const clearCartSuccess = (payload) => {
  return {
    type: types.CLEAR_CART_SUCCESS,
    payload,
  };
};

//adding and fetching data -->

export const addToCart = (payload) => (dispatch) => {
  let item = payload;

  Axios.post("/cart", item)
    .then(function (res) {
      //item or response.data both are same
      // console.log("item in add to cart", item);
      dispatch(addToCartSuccess(res.data));
      // console.log("added cart item", res.data);
    })
    .catch(function (error) {
      dispatch(addToCartFailure(error));
      console.log(error);
    });
};

export const fetchCartItemByUserId = (payload) => {
  let userId = payload;
  return (dispatch) => {
    dispatch(fetchCartItemRequest());
    Axios.get("/cart", {
      // params: {
      //   ...payload,
      // },
    }) //--> Check index.js for remaining url or check package.json just after name at top you will found proxy
      .then((res) => {
        // console.log(res.data);
        dispatch(fetchCartItemSuccess(res.data));
      })
      .catch((err) => {
        console.log("err in fetch cart by userid", err);
        dispatch(fetchCartItemFailure(err));
      });
  };
};

export const updateCartItemQuantity = (payload) => (dispatch) => {
  let updatedItem = payload;

  Axios.patch(`/cart/${updatedItem.id}`, updatedItem, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (res) {
      dispatch(updateCartItemQuantitySuccess(res.data));
      // console.log("in update cart", res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const deleteItemInCart = (payload) => (dispatch) => {
  let itemToDelete = payload;

  Axios.delete(`/cart/${itemToDelete.id}`)
    .then(function (res) {
      dispatch(deleteItemInCartSuccess(itemToDelete));
      console.log("item deleted", res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const clearCart = (payload) => (dispatch) => {
  // let userId = payload;
  // console.log("user id", userId);
  Axios.get("/cart")
    .then((res) => {
      const items = res.data;

      // console.log("item", items);
      for (let i = 0; i < items.length; i++) {
        Axios.delete(`/cart/${items[i].id}`)
          .then(function (res) {
            // console.log("item deleted", res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      console.log("cart cleared");

      dispatch(clearCartSuccess([]));
    })
    .catch((err) => {
      console.log("err in fetch cart by userid", err);
    });
};
