import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/reducer";
import { productReducer } from "./Products/reducer";
import { cartReducer } from "./Cart/reducer";
import { orderReducer } from "./Order/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  ecommerceData: productReducer,
  cartItem: cartReducer,
  orderData: orderReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
