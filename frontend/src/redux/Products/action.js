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
export const fetchFilterData = (payload) => {
  //   console.log("payload is", payload);
  let queryString = "";
  for (let key in payload) {
    queryString = `${key}=${payload[key]}`;
  }

  return (dispatch) => {
    dispatch(fetchDataRequest());
    Axios.get("/products?" + queryString, {
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
