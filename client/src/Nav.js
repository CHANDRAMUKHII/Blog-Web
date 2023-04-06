import React, { useState, useEffect } from "react";
import "./styles/BlogCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [toggle, settoggle] = useState(true);

  useEffect(() => {
    const isLogged = localStorage.getItem("access_token");

    if (isLogged === null) setLoggedIn(false);
    else setLoggedIn(true);
  }, []);

  function showposts(event) {
    event.preventDefault();
    navigate("/");
  }

  function newpostHandler(event) {
    event.preventDefault();
    navigate("/newpost");
  }
  function loginHandler(event) {
    event.preventDefault();
    navigate("/login");
  }
  function logoutHandler(event) {
    event.preventDefault();
    localStorage.removeItem("access_token");

    window.location.reload();
  }
  return (
    <div className="NavBar">
      <div className="leftside">
        <div className="links" id={toggle ? "hidden" : ""}>
          <a>Home</a>
          <a href="#" onClick={showposts}>
            Posts
          </a>
          <a href="#" onClick={newpostHandler}>
            New Post
          </a>
          {isLoggedIn ? (
            <a href="#" onClick={logoutHandler}>
              Logout
            </a>
          ) : (
            <a href="#" onClick={loginHandler}>
              Login
            </a>
          )}
        </div>
        <button onClick={() => settoggle(!toggle)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Nav;
