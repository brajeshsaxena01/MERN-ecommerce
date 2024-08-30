import * as types from "./actionTypes";
import Axios from "axios";
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

//fetching data request-->
export const fetchData = (payload) => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    Axios.get("/products", {
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
export const fetchFilterSortPaginationData = (filter, sort, pagination) => {
  //   console.log("payload is", payload);

  //filter = {"category:["smartphone","laptops"]"}
  //sort = {_sort:"price",_order="desc"}
  //pagination = {_page=1&_limit=10}
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

  console.log("queryString", queryString);

  return (dispatch) => {
    dispatch(fetchDataRequest());
    Axios.get("/products?" + queryString, {
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
