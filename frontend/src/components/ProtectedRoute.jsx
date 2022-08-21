import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate()

  return (
   props.loggedIn ? props.children : navigate("/sign-in")
  );
};

export default ProtectedRoute; 