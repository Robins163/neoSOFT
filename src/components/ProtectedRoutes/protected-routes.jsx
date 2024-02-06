import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ outlet }) => {
  const auth = useSelector((state) => state.auth) || {};
  const location = useLocation();

  if (auth.isLoggedIn) {
    return outlet ? <>{outlet}</> : null;
  } else {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
};
