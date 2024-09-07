import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AdminProtected = ({ children }) => {
  const user = useSelector((store) => store.auth.userInfo);
  //   if js file then use this
  //   if (!user) {
  //     <Navigate to="/login" replace={true}></Navigate>;
  //   }
  //   if (user && user.role !== "admin") {
  //     <Navigate to="/" replace={true}></Navigate>;
  //   }
  return (
    <>
      {!user ? (
        <Navigate to="/login" replace={true} />
      ) : user.role !== "admin" ? (
        <Navigate to="/" replace={true} />
      ) : (
        children
      )}
    </>
  );
};
