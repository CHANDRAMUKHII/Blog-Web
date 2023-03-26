import { Outlet } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Login from "./user/Login";

const useAuth = () => {
  const [user, setuser] = useState();

  const accessToken = localStorage.getItem("access_token");
  // console.log(accessToken);
  axios
    .get("http://localhost:3000/newpost", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => setuser(res.data))
    .catch((err) => console.log(err));
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Login />;
};
export default ProtectedRoutes;
