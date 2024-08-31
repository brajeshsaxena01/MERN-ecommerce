import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProductList } from "../pages/ProductList";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { ProductDetails } from "../pages/ProductDetails";
import { Protected } from "./Protected";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/cart"
        element={
          <Protected>
            <Cart />
          </Protected>
        }
      />
      <Route
        path="/checkout"
        element={
          <Protected>
            <Checkout />
          </Protected>
        }
      />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      {/* <Route
        path="/set-custom-claim"
        element={is_admin ? <MakeAdmin /> : <NotAdmin />}
      ></Route> */}
    </Routes>
  );
};
