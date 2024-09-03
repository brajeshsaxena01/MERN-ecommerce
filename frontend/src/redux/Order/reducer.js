import * as Types from "./actionTypes";

const initState = {
  orders: [],
  currentOrder: null,
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
    case Types.ADD_ORDER_SUCCESS: {
      return {
        ...state,
        currentOrder: null,
        loading: false,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};
