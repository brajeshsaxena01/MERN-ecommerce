import * as Types from "./actionTypes";

const initState = {
  products: [],
  totalCount: 0,
  brands: "",
  categories: "",
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
    case Types.FETCH_BRANDS_SUCCESS: {
      return {
        ...state,
        brands: payload,
        loading: false,
        error: "",
      };
    }
    case Types.FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: payload,
        loading: false,
        error: "",
      };
    }
    default: {
      return state;
    }
  }
};
