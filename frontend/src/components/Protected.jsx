import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Protected = ({ children }) => {
  const user = useSelector((store) => store.auth.userInfo);
  //   console.log("user data", user);
  // This if statement will not work here because this is jsx file,
  // if you want to use like this make js file like Protected.js.
//   if (!user) {
//     <Navigate to="/login" replace={true}></Navigate>;
//   }
//   if (user && user.role !== "admin") {
//     <Navigate to="/" replace={true}></Navigate>;
//   }
  //   console.log("outside if");
  return <>{!user ? <Navigate to="/login" replace={true} /> : children}</>;
};
