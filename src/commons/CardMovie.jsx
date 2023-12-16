import React from "react";
import "../styles/card.scss";

const CardMovie = ({ item }) => {
  return (
    <div className="card-container">
      <img
        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
        alt={item.title}
        className="card-image"
      />
      <p>{item.title ? item.title : item.name}</p>
    </div>
  );
};

export default CardMovie;
