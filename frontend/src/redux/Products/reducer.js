import * as Types from "./actionTypes";

const initState = {
  products: [],
  totalCount: 0,
  brands: "",
  categories: "",
  selectedProduct: null,
  reviews: [],
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
    case Types.FETCH_PRODUCT_BY_ID_SUCCESS: {
      return {
        ...state,
        selectedProduct: payload,
        loading: false,
        error: "",
      };
    }
    case Types.CREATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        products: [...state.products, payload],
        loading: false,
        error: "",
      };
    }

    case Types.UPDATE_PRODUCT_SUCCESS: {
      const newItem = payload;
      //.find() method will return the product that matches the id else it return undefined
      const isItemPresentInTheProduts = state?.products.find(
        (x) => x.id === newItem.id
      );
      // console.log('inCartReducer', isItemPresentInTheCart);

      const productsData = isItemPresentInTheProduts
        ? state.products.map((prod) =>
            prod.id === isItemPresentInTheProduts.id ? newItem : prod
          )
        : [...state.products, newItem];
      return {
        ...state,
        products: productsData,
        selectedProduct: newItem,
        loading: false,
        error: "",
      };
    }
    case Types.FETCH_REVIEWS_SUCCESS: {
      return {
        ...state,
        reviews: payload,
        loading: false,
        error: "",
      };
    }
    case Types.CREATE_REVIEWS_SUCCESS: {
      return {
        ...state,
        reviews: [...state.reviews, payload],
        loading: false,
        error: "",
      };
    }
    default: {
      return state;
    }
  }
};
