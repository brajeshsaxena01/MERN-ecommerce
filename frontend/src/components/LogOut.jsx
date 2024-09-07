import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignOut } from "../redux/Auth/action";
import { Navigate } from "react-router-dom";

export const LogOut = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.userInfo);

  useEffect(() => {
    dispatch(userSignOut());
  }, []);

  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
};
