import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Blog from "../Pages/Blog";
import CreateBlog from "../Pages/CreateBlog";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Profile from "../Pages/Profile";

const Router = () => {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/blog/:id",
      element: <Blog />,
    },
    {
      path: "/createblog",
      element: (
        <PrivateRoutes>
          <CreateBlog />
        </PrivateRoutes>
      ),
    },
    {
      path: "/profile",
      element: (
        <PrivateRoutes>
          <Profile />
        </PrivateRoutes>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoutes>
          <Login />
        </PublicRoutes>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoutes>
          <Register />
        </PublicRoutes>
      ),
    },
  ];
  return (
    <Routes>
      {routes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Router;
