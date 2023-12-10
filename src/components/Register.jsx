import React, { useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import "../styles/forms.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = (theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
});

const Register = ({ classes }) => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [ocultPass, setOcultPass] = useState(true);
  const [ocultPassRepeat, setOcultPassRepeat] = useState(true);

  const handlePasswordVisibility = () => {
    setOcultPass(!ocultPass);
  };

  const handlePasswordVisibilityRepeat = () => {
    setOcultPassRepeat(!ocultPassRepeat);
  };

  const handleRegister = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerData.passwordRepeat === registerData.password) {
      axios
        .post("http://localhost:8080/api/users/register", {
          name: registerData.name,
          lastName: registerData.lastName,
          email: registerData.email,
          password: registerData.password,
        })
        .then(() => navigate("/login"));
    } else {
      console.log("La contraseña no coincide");
    }
  };

  return (
    <>
      <Navbar />
      <div className="vista-register">
        <div className="form-container">
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standar-basic-name"
              label="Name"
              name="name"
              value={registerData.name}
              onChange={handleRegister}
            />
            <TextField
              id="standar-basic-lastName"
              label="Last Name"
              name="lastName"
              value={registerData.lastName}
              onChange={handleRegister}
            />
            <TextField
              id="standar-basic-email"
              label="E-Mail"
              name="email"
              value={registerData.email}
              onChange={handleRegister}
            />
            <TextField
              id="standar-basic-password"
              label="Password"
              name="password"
              type={ocultPass ? "password" : "text"}
              value={registerData.password}
              onChange={handleRegister}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordVisibility}>
                      {ocultPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="standar-basic-passwordRepeat"
              label="Repeat password"
              name="passwordRepeat"
              type={ocultPassRepeat ? "password" : "text"}
              value={registerData.passwordRepeat}
              onChange={handleRegister}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordVisibilityRepeat}>
                      {ocultPassRepeat ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="outlined" className="registerButton" type="submit">
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(Register);
