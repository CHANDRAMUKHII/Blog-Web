import React from "react";
import "../styles/Login.css";
import { Fragment, useRef } from "react";
import axios from "axios";
import Nav from "../Nav";
const Login = () => {
  const nameRef = useRef();
  const passwordRef = useRef();
  async function submitHandler(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    const password = passwordRef.current.value;

    await axios
      .post("http://localhost:3000/login", { name, password })
      .then((res) => localStorage.setItem("access_token", res.data.accessToken))
      .catch((err) => console.log(err));
  }

  return (
    <Fragment>
      <Nav />
      <div className="login-container">
        <h1>Login</h1>
        <form id="formw" onSubmit={submitHandler}>
          <label>Username</label>
          <input type="text" id="usern" ref={nameRef} required />

          <label>Password</label>
          <input type="password" id="pass" ref={passwordRef} required />

          <input type="submit" />
        </form>
      </div>
    </Fragment>
  );
};
export default Login;
