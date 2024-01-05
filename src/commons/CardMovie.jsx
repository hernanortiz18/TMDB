import React from "react";
import "../styles/card.scss";
import { useNavigate } from "react-router-dom";

const CardMovie = ({ item, type }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/${type}/${item.id}`);
  };

  return (
    <div className="card-container">
      <img
        src={`https://image.tmdb.org/t/p/original/${
          item.poster_path ? item.poster_path : item.backdrop_path
        }`}
        alt={item.title}
        className="card-image"
        onClick={handleClick}
      />

      <p>{item.title ? item.title : item.name}</p>
    </div>
  );
};

export default CardMovie;
