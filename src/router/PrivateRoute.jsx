import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
