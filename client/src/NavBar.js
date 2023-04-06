import React, { useEffect, useState } from "react";
import "./styles/BlogCard.css";
import { useNavigate } from "react-router-dom";
const NavBar = (props) => {
  const navigate = useNavigate();
  const [toggle, settoggle] = useState(true);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  function filterChange(event) {
    event.preventDefault();
    setSearch(event.target.value);
    props.onChildData(event.target.value);
  }
  function showposts(event) {
    event.preventDefault();
    navigate("/");
  }
  function newPostHandler(event) {
    event.preventDefault();
    navigate("/newpost");
  }
  function loginHandler(event){
    event.preventDefault();
    setLoggedIn(false);
}
  return (
    <div className="NavBar">
      <div className="leftside">
        <div className="links" id={toggle ? "hidden" : ""}>
          <a href="#">Home</a>
          <a href="#" onClick={showposts}>
            Posts
          </a>
          <a href="#" onClick={newPostHandler}>
            New Post
          </a>
          {isLoggedIn ? (<a href="#" onClick={loginHandler}>
            Logout
          </a>):(<a href="#" onClick={loginHandler}>
            Login
          </a>)}
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
      <div className="rightside">
        <input type="text" placeholder="search" onChange={filterChange} />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
