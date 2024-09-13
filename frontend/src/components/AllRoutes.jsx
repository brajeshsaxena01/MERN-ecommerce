import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProductList } from "../pages/ProductList";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { ProductDetails } from "../pages/ProductDetails";
import { Protected } from "./Protected";
import { PageNotFound } from "../pages/PageNotFound";
import { OrderSuccess } from "../pages/OrderSuccess";
import { MyOrders } from "../pages/MyOrders";
import { MyProfile } from "../pages/MyProfile";
import { LogOut } from "./LogOut";
import { ForgotPassword } from "../pages/ForgotPassword";
import { AdminProtected } from "./AdminProtected";
import { AdminProductList } from "../pages/Admin/AdminProductList";
import { AdminProductDetails } from "../pages/Admin/AdminProductDetails";
import { AdminProductForm } from "../pages/Admin/AdminProductForm";
import { AdminOrder } from "../pages/Admin/AdminOrder";
import { StripeCheckout } from "../pages/StripeCheckout";
import { StripePaymentComplete } from "../pages/StripePaymentComplete";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <AdminProtected>
            <AdminProductList />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/product-details/:id"
        element={
          <AdminProtected>
            <AdminProductDetails />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/product-form"
        element={
          <AdminProtected>
            <AdminProductForm />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/product-form/edit/:id"
        element={
          <AdminProtected>
            <AdminProductForm />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/orderS"
        element={
          <AdminProtected>
            <AdminOrder />
          </AdminProtected>
        }
      />

      <Route path="/" element={<ProductList />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<LogOut />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
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
      <Route
        path="/stripe-checkout"
        element={
          <Protected>
            <StripeCheckout />
          </Protected>
        }
      />
      <Route
        path="/complete"
        element={
          <Protected>
            <StripePaymentComplete />
          </Protected>
        }
      />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      {/* <Route
        path="/set-custom-claim"
        element={is_admin ? <MakeAdmin /> : <NotAdmin />}
      ></Route> */}
      <Route path="/order-success/:id" element={<OrderSuccess />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
