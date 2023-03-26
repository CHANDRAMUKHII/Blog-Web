import React from "react";
import "../styles/Login.css";
import { Fragment, useRef } from "react";
import axios from "axios";
import Nav from "../Nav";
const Register = () => {
  const nameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:3000/register", { name, email, password })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  return (
    <Fragment>
      <Nav />
      <div className="login-container1">
        <h1>Register</h1>
        <form id="formw" onSubmit={submitHandler}>
          <label>Username</label>
          <input type="text" id="usern" ref={nameRef} required />

          <label>Password</label>
          <input type="password" id="pass" ref={passwordRef} required />

          <label>Email</label>
          <input type="email" id="email" ref={emailRef} required />

          <input type="submit" />
        </form>
      </div>
    </Fragment>
  );
};
export default Register;
