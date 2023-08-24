import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/UserContext";

const links = [
  {
    path: "/?q=art",
    text: "art",
  },
  {
    path: "/?q=science",
    text: "science",
  },
  {
    path: "/?q=technology",
    text: "technology",
  },
  {
    path: "/?q=cinema",
    text: "cinema",
  },
  {
    path: "/?q=design",
    text: "design",
  },
  {
    path: "/?q=food",
    text: "food",
  },
];

const publicLinks = [
  {
    path: "/login",
    text: "login",
  },
  {
    path: "/register",
    text: "register",
  },
];

const privateLinks = [
  {
    path: "/profile",
    text: "profile",
  },
  {
    path: "/createblog",
    text: "write",
  },
];

const Navbar = () => {
  const { user } = useContext(userContext);
  console.log(user);
  return (
    <div className="sticky top-0 z-10 m-auto flex w-[80%] items-center justify-around gap-2 bg-white">
      <Link to={"/"}>
        <img src="/devblog_logo.png" alt="devblog-logo" className="w-[170px]" />
      </Link>
      <div className="grow justify-evenly gap-3 base:hidden md:flex ">
        {links.map((item) => (
          <Link
            to={item.path}
            key={item}
            className="text-sm font-semibold uppercase"
          >
            {item.text}
          </Link>
        ))}
        {!user
          ? publicLinks.map((item) => (
              <Link
                to={item.path}
                key={item}
                className="text-sm font-semibold uppercase"
              >
                {item.text}
              </Link>
            ))
          : privateLinks.map((item) => (
              <Link
                to={item.path}
                key={item}
                className="text-sm font-semibold uppercase"
              >
                {item.text}
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Navbar;
