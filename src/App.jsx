import "./App.scss";
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import Login from "./components/Login";
import Home from "./components/Home";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/users";
import { setLoading } from "./redux/loading";
import Detail from "./commons/Detail";
import RecoverPass from "./components/RecoverPass";
import ChangePass from "./components/ChangePass";
import SearchResult from "./components/SearchResult";
import Favorites from "./components/Favorites";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setLoading(false));
    axios
      .get("http://localhost:8080/api/users/me", { withCredentials: true })
      .then((res) => dispatch(setUser(res.data)))
      .then(() => dispatch(setLoading(true)))
      .catch(() => {
        dispatch(setLoading(true));
        console.log("Please log in with user acount");
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        {user.id ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:type/:id" element={<Detail />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TvShows />} />
            <Route path="/search" element={<SearchResult />} />
            <Route
              path="/favorites/shows"
              element={<Favorites type={"tv"} />}
            />
            <Route
              path="/favorites/movies"
              element={<Favorites type={"movie"} />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recoverpass" element={<RecoverPass />} />
            <Route path="/change-pass" element={<ChangePass />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
