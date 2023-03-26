import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DisplayPost from "./DisplayPost";
import NewPost from "./NewPost";
import Posts from "./Posts";
import Login from "./user/Login";
import Register from "./user/Register";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/path/:id" element={<DisplayPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/newpost" element={<NewPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
