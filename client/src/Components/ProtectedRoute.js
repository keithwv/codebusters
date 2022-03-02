import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = (props) => {
  const { children } = props;
  const { currentUser } = useAuth();
  const location = useLocation();
  let output = currentUser ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );

  return output;
};

export default ProtectedRoute;
