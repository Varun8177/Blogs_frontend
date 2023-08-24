import React, { useContext } from "react";
import { userContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }
  return children;
};

export default PrivateRoutes;
