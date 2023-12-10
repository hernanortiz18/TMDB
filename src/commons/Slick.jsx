import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Slick = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 6000,
    pasuseOnHover: true,
  };
  return (
    <Slider {...settings}>
      {items.map((item) => (
        <div className="gridCard" key={item.id}>
          <div className="movieCard">
            <img
              src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
              alt={item.title}
            />
            <h3>{item.title}</h3>
            <br />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Slick;
