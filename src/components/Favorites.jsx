import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Grill from "../commons/Grill";
import { useState } from "react";
import { useSelector } from "react-redux";
import { setReady } from "../redux/ready";
import { useDispatch } from "react-redux";
import axios from "axios";

const Favorites = ({ type }) => {
  const dispatch = useDispatch();
  const [myFavs, setMyFavs] = useState([]);
  const user = useSelector((state) => state.user);
  const ready = useSelector((state) => state.ready);

  useEffect(() => {
    dispatch(setReady(false));
    axios
      .get("http://localhost:8080/api/favs/all", {
        params: { authorUserId: user.id, type: type },
      })
      .then((res) => {
        setMyFavs(res.data);
      })
      .then(() => dispatch(setReady(true)));
  }, []);

  return (
    <>
      {ready ? (
        <div className="home-container">
          <Navbar />
          <Grill data={myFavs} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Favorites;
