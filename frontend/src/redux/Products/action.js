import { toast } from "react-toastify";
import * as types from "./actionTypes";
import Axios from "axios";
import { getError } from "../../components/utils";
const fetchDataRequest = (payload) => {
  return {
    type: types.FETCH_DATA_REQUEST,
    payload,
  };
};
const fetchDataSuccess = (payload) => {
  return {
    type: types.FETCH_DATA_SUCCESS,
    payload,
  };
};
const fetchDataFailure = (payload) => {
  return {
    type: types.FETCH_DATA_FAILURE,
    payload,
  };
};

const fetchBrandSuccess = (payload) => {
  return {
    type: types.FETCH_BRANDS_SUCCESS,
    payload,
  };
};
const fetchCategoriesSuccess = (payload) => {
  return {
    type: types.FETCH_CATEGORIES_SUCCESS,
    payload,
  };
};
const fetchProductByIdSuccess = (payload) => {
  return {
    type: types.FETCH_PRODUCT_BY_ID_SUCCESS,
    payload,
  };
};
const createProductSuccess = (payload) => {
  return {
    type: types.CREATE_PRODUCT_SUCCESS,
    payload,
  };
};
const updateProductSuccess = (payload) => {
  return {
    type: types.UPDATE_PRODUCT_SUCCESS,
    payload,
  };
};
const fetchReviewsSuccess = (payload) => {
  return {
    type: types.FETCH_REVIEWS_SUCCESS,
    payload,
  };
};
const createReviewsSuccess = (payload) => {
  return {
    type: types.CREATE_REVIEWS_SUCCESS,
    payload,
  };
};

//fetching data request-->
export const fetchData = (payload) => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    Axios.get("/api/products", {
      // params: {
      //   ...payload,
      // },
    }) //--> Check index.js for remaining url or check package.json just after name at top you will found proxy
      .then((res) => {
        // console.log(res.data);

        dispatch(fetchDataSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchDataFailure(err.data));
      });
  };
};
export const fetchProductBYFilterSortPagination = ({
  filter,
  sort,
  pagination,
  admin,
}) => {
  //   console.log("payload is", payload);

  //filter = {"category:["smartphone","laptops"]"}
  //sort = {_sort:"price",_order="desc"}
  //pagination = {_page=1&_limit=10}

  //TODO: server will filter the deleted product in for non admin

  let queryString = "";
  for (let key in filter) {
    const categoryValuesArray = filter[key];
    if (categoryValuesArray.length > 0) {
      const lastCategoryValue =
        categoryValuesArray[categoryValuesArray.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += "admin=true";
  }
  // console.log("queryString", queryString);

  return (dispatch) => {
    dispatch(fetchDataRequest());
    Axios.get("/api/products?" + queryString, {
      // params: {
      //   ...payload,
      // },
    }) //--> Check index.js for remaining url or check package.json just after name at top you will found proxy
      .then((res) => {
        // console.log(res.data);
        const totalCount = res.headers["x-total-count"];
        // console.log("totalcount in sort is", totalCount);
        dispatch(
          fetchDataSuccess({ products: res.data, totalCount: +totalCount })
        );
      })
      .catch((err) => {
        dispatch(fetchDataFailure(err.data));
      });
  };
};

export const fetchBrands = (payload) => {
  return (dispatch) => {
    Axios.get("/api/brands", {
      // params: {
      //   ...payload,
      // },
    }) //--> Check index.js for remaining url or check package.json just after name at top you will found proxy
      .then((res) => {
        // console.log(res.data);

        dispatch(fetchBrandSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.message);
        // dispatch(fetchDataFailure(err.data));
      });
  };
};
export const fetchCategories = (payload) => {
  return (dispatch) => {
    Axios.get("/api/categories", {
      // params: {
      //   ...payload,
      // },
    }) //--> Check index.js for remaining url or check package.json just after name at top you will found proxy
      .then((res) => {
        // console.log(res.data);

        dispatch(fetchCategoriesSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.message);
        // dispatch(fetchDataFailure(err.data));
      });
  };
};
export const fetchProductById = (id) => {
  return (dispatch) => {
    Axios.get(`/api/products/${id}`, {
      // params: {
      //   ...payload,
      // },
    }) //--> Check index.js for remaining url or check package.json just after name at top you will found proxy
      .then((res) => {
        // console.log(res.data);

        dispatch(fetchProductByIdSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.message);
        // dispatch(fetchDataFailure(err.data));
      });
  };
};

export const createProduct = (payload) => (dispatch) => {
  let product = payload;
  Axios.post("/api/products", product)
    .then(function (res) {
      dispatch(createProductSuccess(res.data));
      toast.success("Product added successfully!");
      console.log(res.data);
    })
    .catch(function (error) {
      // console.log(error);
      toast.error(getError(error));
    });
};
export const updateProduct = (payload) => (dispatch) => {
  let product = payload;
  Axios.patch(`/api/products/${product.id}`, product)
    .then(function (res) {
      dispatch(updateProductSuccess(res.data));
      // console.log(res.data);
      // toast.success("Product updated successfully!");
    })
    .catch(function (error) {
      // console.log(error);
      toast.error(getError(error));
    });
};

export const fetchReviewsByProductId = (payload) => {
  const productId = payload.id;
  console.log("productId", productId);
  return (dispatch) => {
    Axios.get(`/api/reviews/${productId}`) //--> Check index.js for remaining url or check package.json just after name at top you will found proxy
      .then((res) => {
        dispatch(fetchReviewsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

//Try to make seperate collection for reviews think how?
export const createReviews = (payload) => (dispatch) => {
  let { id, rating, comment } = payload;
  let productId = id;
  Axios.post(`/api/reviews/${productId}`, { rating, comment })
    .then(function (res) {
      dispatch(createReviewsSuccess(res.data));
      // console.log(res.data);
      if (res.data.message) {
        toast.warning(res.data.message);
      }
      toast.success("Thanks for your reviews!");
    })
    .catch(function (error) {
      // console.log(error);
      toast.error(getError(error));
    });
};
