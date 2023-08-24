import React, { useContext } from "react";
import { userContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  if (user) {
    navigate("/");
  }
  return children;
};

export default PublicRoutes;
