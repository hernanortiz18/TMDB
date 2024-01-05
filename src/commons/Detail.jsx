import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setReady } from "../redux/ready";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/detail.scss";
import image from "../assets/support-image.jpg";

const Detail = () => {
  const { id, type } = useParams();
  const [selected, setSelected] = useState({});
  const [ranked, setRating] = useState("0");
  const [audiovisual_production_Id, setAudiovisual_production_Id] = useState(0);
  const dispatch = useDispatch();
  const ready = useSelector((state) => state.ready);
  const [fav, setFav] = useState(false);
  const user = useSelector((state) => state.user);
  const userId = user.id;

  useEffect(() => {
    dispatch(setReady(false));
    axios
      .get(`http://localhost:8080/api/${type}/${id}`)
      .then((res) => {
        setSelected(res.data);
        return res.data.id;
      })

      .then((avID) => {
        setAudiovisual_production_Id(avID);
        return axios
          .get("http://localhost:8080/api/rating", {
            params: {
              userId: userId,
              audiovisual_production_Id: avID,
              ranked: ranked,
            },
          })
          .then((res) => setRating(res.data.ranked))
          .then(() => dispatch(setReady(true)));
      })
      .catch(() => {
        axios
          .get(`http://localhost:8080/api/favs/${id}`, {
            authorUserId: user.id,
          })
          .then((res) => (res ? setFav(true) : setFav(false)));
      });
  }, []);

  const handleRating = (e) => {
    e.preventDefault();
    const ranked = e.target.value;
    setRating(ranked);
    axios
      .post("http://localhost:8080/api/rating/update", {
        ranked: ranked,
        userId: user.id,
        audiovisual_production_Id: selected.id,
      })
      .then(setReady(false))
      .then(setReady(true))
      .then(() => console.log("actualizado"));
  };

  const handleFav = (e) => {
    e.preventDefault();
    if (!fav) {
      axios
        .post("http://localhost:8080/api/favRegister", {
          authorUserId: user.id,
          selectedFavId: id,
          type: type,
        })
        .then(() => setFav(!fav));
    } else {
      axios
        .delete("http://localhost:8080/api/favDelete", {
          params: {
            authorUserId: user.id,
            selectedFavId: id,
          },
        })
        .then(() => setFav(!fav));
    }
  };

  return (
    <>
      <Navbar />
      {ready ? (
        <div className="selected">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              selected.backdrop_path
                ? selected.backdrop_path
                : selected.poster_path
            }? || ${image}
            }`}
            alt={selected.title}
            className="detail-image"
          />
          <div className="selected-info">
            <h1>{selected.title ? selected.title : selected.name}</h1>
            <h4>Description</h4>
            <p>{selected.overview}</p>
            <br />
            <p>{selected.release_date ? "RELEASE DATE" : ""}</p>
            <p>{selected?.release_date}</p>
            <div className="rating">
              <input
                value={"5"}
                name="rating-5"
                id="star5"
                type="radio"
                className={ranked >= 5 ? "checked" : ""}
                onClick={handleRating}
              />
              <label htmlFor="star5"></label>
              <input
                value={"4"}
                name="rating-4"
                id="star4"
                type="radio"
                className={ranked >= 4 ? "checked" : ""}
                onClick={handleRating}
              />
              <label htmlFor="star4"></label>
              <input
                value={"3"}
                name="rating-3"
                id="star3"
                type="radio"
                className={ranked >= 3 ? "checked" : ""}
                onClick={handleRating}
              />
              <label htmlFor="star3"></label>
              <input
                value={"2"}
                name="rating-2"
                id="star2"
                type="radio"
                className={ranked >= 2 ? "checked" : ""}
                onClick={handleRating}
              />
              <label htmlFor="star2"></label>
              <input
                value={"1"}
                name="rating-1"
                id="star1"
                type="radio"
                className={ranked >= 1 ? "checked" : ""}
                onClick={handleRating}
              />
              <label htmlFor="star1"></label>
            </div>
            <div className="fav-button">
              <button onClick={handleFav}>
                {fav ? "QUITAR DE FAVORITOS" : "AGREGAR A FAVORITOS"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default Detail;
