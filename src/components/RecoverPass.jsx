import React from "react";
import Navbar from "./Navbar";
import { withStyles } from "@material-ui/core";
import "../styles/forms.scss";
import axios from "axios";
import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setRecover } from "../redux/recover";

const styles = (theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
});

const RecoverPass = ({ classes }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const recover = useSelector((state) => state.recover);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8080/api/users/emailValidate", {
        params: { email },
      })
      .then((result) => {
        if (!result) return "E-Mail no corresponde a un usuario activo";
        else {
          dispatch(setRecover(email));
        }
      })
      .catch((error) => console.log(error));
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
              id="standar-basic-recover"
              label="Enter e-mail to recover your account"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <Button variant="outlined" className="registerButton" type="submit">
              Send e-mail
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(RecoverPass);
