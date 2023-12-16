import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../styles/general.scss";
import Slick from "../commons/Slick";
import { setReady } from "../redux/ready";
import Loading from "../commons/Loading";
import { Typography } from "@material-ui/core";

const Home = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [allTv, setAllTv] = useState([]);
  const [moviesTrending, setMoviesTrending] = useState([]);
  const [tvShowTrending, setTvShowTrending] = useState([]);
  const dispatch = useDispatch();
  const ready = useSelector((state) => state.ready);

  useEffect(() => {
    dispatch(setReady(false));
    axios
      .get("http://localhost:8080/api/movies")
      .then((res) => setAllMovies(res.data))
      .then(() => {
        axios
          .get("http://localhost:8080/api/tv")
          .then((res) => setAllTv(res.data))
          .then(() => {
            axios
              .get("http://localhost:8080/api/movies/trending")
              .then((res) => setMoviesTrending(res.data))
              .then(() => {
                axios
                  .get("http://localhost:8080/api/tv/trending")
                  .then((res) => setTvShowTrending(res.data))
                  .then(() => dispatch(setReady(true)))
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        <Navbar />
        {ready ? (
          <div className="home-container">
            <Typography variant="h3">MOVIES</Typography>
            <Slick items={allMovies} />
            <Typography variant="h3">TV SHOWS</Typography>
            <Slick items={allTv} />
            <Typography variant="h3">TRENDING MOVIES</Typography>
            <Slick items={moviesTrending} />
            <Typography variant="h3">TRENDING TV SHOWS</Typography>
            <Slick items={tvShowTrending} />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Home;
