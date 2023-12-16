import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardMovie from "./CardMovie";
import "../styles/card.scss";

const Slick = ({ items }) => {
  console.log("ITEM QUE SE ENVIAN A LA CARDDDDDD", items);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 6000,
    pasuseOnHover: true,
  };
  return (
    <>
      <Slider {...settings} className="movieCard">
        {items.map((item) => (
          <div className="gridCard" key={item.id}>
            <div>
              <CardMovie item={item} />
              <br />
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Slick;
