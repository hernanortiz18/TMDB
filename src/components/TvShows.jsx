import { useEffect, useState } from "react";
import axios from "axios";
import Grill from "../commons/Grill";
import Navbar from "./Navbar";
import "../styles/general.scss";

const TvShows = () => {
  const [data, setData] = useState([]);
  const type = "tv";

  const options = {
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmY4NGI2M2NjOGVhMWMxZDE1YTRhNjU0NzVmMmE0YyIsInN1YiI6IjY1M2ZmMTM3NTA3MzNjMDBmZjRiNzYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.szjOC0tJo_5aYEAxLYxvvJHY8s7M-RhHR_2rMkJzNUY",
    },
  };

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/tv/popular", options)
      .then(function (response) {
        setData(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <Grill data={data} type={type} />
    </div>
  );
};

export default TvShows;
