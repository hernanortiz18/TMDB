import axios from "axios";
import { useEffect, useState } from "react";

import Slick from "../commons/Slick";

const Lastest = () => {
  const [items, setItems] = useState([]);

  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmY4NGI2M2NjOGVhMWMxZDE1YTRhNjU0NzVmMmE0YyIsInN1YiI6IjY1M2ZmMTM3NTA3MzNjMDBmZjRiNzYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.szjOC0tJo_5aYEAxLYxvvJHY8s7M-RhHR_2rMkJzNUY",
    },
  };

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/top_rated", options)
      .then((response) => {
        console.log(response.data.results);
        setItems(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <Slick items={items} />;
};

export default Lastest;
