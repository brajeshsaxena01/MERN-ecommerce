import * as Types from "./actionTypes";

const initState = {
  orders: [],
  // userDetails: [],
  currentOrder: null,
  totalOrder: 0,
  loading: false,
  error: null,
};

export const orderReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.ADD_ORDER_SUCCESS: {
      return {
        ...state,
        orders: [...state.orders, payload],
        currentOrder: payload,
        loading: false,
        error: null,
      };
    }
    case Types.CLEAR_CURRENT_ORDER_SUCCESS: {
      return {
        ...state,
        currentOrder: null,
        loading: false,
        error: null,
      };
    }
    case Types.FETCH_ORDER_BY_USER_ID_SUCCESS: {
      return {
        ...state,
        orders: payload,
        loading: false,
        error: null,
      };
    }
    case Types.FETCH_ALL_ORDERS_SUCCESS: {
      return {
        ...state,
        orders: payload.orders,
        totalOrder: payload.totalOrder,
        loading: false,
        error: null,
      };
    }
    case Types.UPDATE_ORDER_SUCCESS: {
      const newOrder = payload;
      //.find() method will return the product that matches the id else it return undefined
      const isItemPresentInTheCart = state?.orders.find(
        (x) => x.id === newOrder.id
      );
      // console.log('inCartReducer', isItemPresentInTheCart);

      const orderData = isItemPresentInTheCart
        ? state.orders.map((order) =>
            order.id === isItemPresentInTheCart.id ? newOrder : order
          )
        : [...state.orders, newOrder];
      return {
        ...state,
        orders: orderData,
        loading: false,
        error: "",
      };
    }
    default: {
      return state;
    }
  }
};
