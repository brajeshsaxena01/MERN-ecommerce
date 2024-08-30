import * as Types from "./actionTypes";

const initState = {
  products: [],
  totalCount: 0,
  loading: false,
  error: "",
};
export const productReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.FETCH_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case Types.FETCH_DATA_SUCCESS: {
      return {
        ...state,
        products: payload.products,
        totalCount: payload.totalCount,
        loading: false,
        error: "",
      };
    }
    case Types.FETCH_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default: {
      return state;
    }
  }
};
