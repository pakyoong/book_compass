// ProtectedRoute.js
import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? (
    <Route element={element} {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
