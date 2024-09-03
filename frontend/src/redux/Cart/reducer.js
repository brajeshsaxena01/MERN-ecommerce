import * as Types from "./actionTypes";

const initState = {
  cart: {
    cartItems: localStorage.getItem("cartData")
      ? JSON.parse(localStorage.getItem("cartData"))
      : [],
  },
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  loading: false,
  error: "",
};
export const cartReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.ADD_TO_CART_SUCCESS: {
      // const newItem = payload;
      // //.find() method will return the product that matches the id else it return undefined
      // const isItemPresentInTheCart = state?.cart.cartItems.find(
      //   (x) => x._id === newItem._id
      // );
      // // console.log('inCartReducer', isItemPresentInTheCart);

      // const cartData = isItemPresentInTheCart
      //   ? state.cart.cartItems.map((prod) =>
      //       prod._id === isItemPresentInTheCart._id ? newItem : prod
      //     )
      //   : [...state.cart.cartItems, newItem];
      // return {
      //   ...state,
      //   cart: { ...state.cart, cartItems: cartData },
      //   loading: false,
      //   error: "",
      // };
      return {
        ...state, // Spread the current state
        cart: {
          ...state.cart, // Spread the current cart state
          cartItems: [
            ...state.cart.cartItems, // Spread the current cart items
            action.payload, // Add the new item to the cart
          ],
        },
        loading: false,
        error: "",
      };
    }
    case Types.ADD_TO_CART_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case Types.FETCH_CART_ITEM_REQUEST: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case Types.FETCH_CART_ITEM_SUCCESS: {
      return {
        ...state,
        cart: { ...state.cart, cartItems: payload },
        loading: false,
        error: "",
      };
    }
    case Types.FETCH_CART_ITEM_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case Types.UPDATE_CART_ITEM_QTY_SUCCESS: {
      const newItem = payload;
      //.find() method will return the product that matches the id else it return undefined
      const isItemPresentInTheCart = state?.cart.cartItems.find(
        (x) => x.id === newItem.id
      );
      // console.log('inCartReducer', isItemPresentInTheCart);

      const cartData = isItemPresentInTheCart
        ? state.cart.cartItems.map((prod) =>
            prod.id === isItemPresentInTheCart.id ? newItem : prod
          )
        : [...state.cart.cartItems, newItem];
      return {
        ...state,
        cart: { ...state.cart, cartItems: cartData },
        loading: false,
        error: "",
      };
    }
    case Types.DELETE_ITEM_IN_CART_SUCCESS: {
      const cartData = state.cart.cartItems.filter(
        (item) => item.id !== payload.id
      );
      // localStorage.setItem('cartData', JSON.stringify(cartData));

      return {
        ...state,
        cart: { ...state.cart, cartItems: cartData },
        loading: false,
        error: null,
      };
    }
    case Types.CLEAR_CART_SUCCESS: {
      return {
        ...state,
        cart: { ...state.cart, cartItems: payload },
        loading: false,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
};
