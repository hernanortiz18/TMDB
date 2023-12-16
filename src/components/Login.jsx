import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import "../styles/forms.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setUser } from "../redux/users";
import Loading from "../commons/Loading";

const styles = (theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
});

const Login = ({ classes }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/users/login", loginData, {
        withCredentials: true,
      })
      .then((res) => dispatch(setUser(res.data)))
      .then(() => navigate("/home"));
  };

  return (
    <>
      {loading ? (
        <>
          <Navbar />
          <div className="vista-register">
            <div className="form-container">
              <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <TextField
                  id="standar-basic-email"
                  label="E-Mail"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                />
                <TextField
                  id="standar-basic-email"
                  type="password"
                  label="Password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                />
                <Button
                  variant="outlined"
                  className="registerButton"
                  type="submit"
                >
                  LOG IN
                </Button>
                <Link to="/recoverPass" className="recover-pass">
                  <span>I forgot my password</span>
                </Link>
              </form>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default withStyles(styles)(Login);
