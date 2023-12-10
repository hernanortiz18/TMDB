import "./App.scss";
import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

import Home from "./components/Home";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/users";
import { setLoading } from "./redux/loading";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/me", { withCredentials: true })
      .then((res) => dispatch(setUser(res.data)))
      .then(() => dispatch(setLoading(true)))
      .catch(() => console.log("Please log in with user acount"));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TvShows />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
