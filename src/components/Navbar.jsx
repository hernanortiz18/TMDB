import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  AppBar,
  Typography,
  Toolbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import axios from "axios";
import { setSearchResult } from "../redux/search";
import { setLoading } from "../redux/loading";

const styles = (theme) => ({
  searchYear: {
    color: "#DFC9F5",
    width: "100px",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  searchTitle: {
    color: "#DFC9F5",
    width: "200px",
    marginBottom: theme.spacing(2),
  },
  logo: {
    width: "120px",
    height: "60px",
  },
  navbar: {
    backgroundColor: "#95000e",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#6D00C8",
  },
  linkContainer: {
    display: "flex",
    gap: theme.spacing(2),
    textDecoration: "none",
    color: "#DFC9F5",
  },
});
const Navbar = ({ classes }) => {
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);
  const searchResult = useSelector((state) => state.search);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [filter, setFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFilter = (e) => {
    e.preventDefault();
    setFilter(!filter);
  };

  const handleYear = (e) => {
    e.preventDefault();
    setYear(e.target.value);
    if (e.target.value !== "") {
      const params = new URLSearchParams(searchParams);
      params.set(e.target.name, e.target.value);
      setSearchParams(params);
    } else {
      const params = new URLSearchParams(searchParams);
      params.delete(e.target.name);
      setSearchParams(params);
    }
  };

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
    if (e.target.value !== "") {
      const params = new URLSearchParams(searchParams);
      params.set(e.target.name, e.target.value);
      setSearchParams(params);
    } else {
      const params = new URLSearchParams(searchParams);
      params.delete(e.target.name);
      setSearchParams(params);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/users/logout",
        { name: user },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .then(() => {
        navigate("/login");
      });
    dispatch(setUser({}));
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setLoading(false);
    axios
      .get(`http://localhost:8080/api/search?${searchParams}`)
      .then((result) => dispatch(setSearchResult(result.data)))
      .then(() => setLoading(true))
      .then(() => navigate(`/search/${searchParams}`));
  };

  return (
    <>
      <AppBar className={classes.navbar}>
        <Toolbar className={classes.toolbar}>
          <Link to="/home">
            <img src="../assets/Logo.png" alt="LOGO" className={classes.logo} />
          </Link>
          <form onSubmit={submitSearch}>
            <TextField
              id="standar-basic-seach"
              label="TITLE"
              autoComplete="off"
              className={classes.searchTitle}
              type="text"
              value={title}
              name="title"
              onChange={handleTitle}
            />
            <TextField
              id="standar-basic-seach"
              label="YEAR"
              autoComplete="off"
              className={classes.searchYear}
              type="text"
              value={year}
              name="year"
              onChange={handleYear}
              InputProps={{
                endAdornment: (
                  <>
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  </>
                ),
              }}
            />
          </form>
          <div className={classes.linkContainer}>
            {user.email ? (
              <>
                <Typography variant="h6">
                  <Link to="/all" className={classes.linkContainer}>
                    All
                  </Link>
                </Typography>

                <Typography variant="h6">
                  <Link to="/movies" className={classes.linkContainer}>
                    Movies
                  </Link>
                </Typography>

                <Typography variant="h6">
                  <Link to="/tv-shows" className={classes.linkContainer}>
                    TV Shows
                  </Link>
                </Typography>

                <Typography variant="h6">
                  <Link to="/profile" className={classes.linkContainer}>
                    Profile
                  </Link>
                </Typography>

                <Typography variant="h6">
                  <Link
                    className={classes.linkContainer}
                    onClick={handleLogout}
                  >
                    Log Out
                  </Link>
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h6">
                  <Link to="/register" className={classes.linkContainer}>
                    Register
                  </Link>
                </Typography>

                <Typography variant="h6">
                  <Link to="/login" className={classes.linkContainer}>
                    Log In
                  </Link>
                </Typography>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {/* <AppBar>
        <Toolbar></Toolbar>
      </AppBar>
      {filter ? <></> : <></>} */}
    </>
  );
};

export default withStyles(styles)(Navbar);
