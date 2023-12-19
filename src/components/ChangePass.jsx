import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { setRecover } from "../redux/recover";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const styles = (theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
});

const ChangePass = ({ classes }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recover = useSelector((state) => state.recover);

  const [passUpdate, setPassUpdate] = useState({
    password: "",
    passwordRepeat: "",
  });

  const handleChange = (e) => {
    setPassUpdate({
      ...passUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passUpdate.password !== passUpdate.passwordRepeat) {
      console.log("Error password");
    } else {
      axios
        .put(
          "http://localhost:8080/api/users/updatePass",
          {
            params: { email: recover },
          },
          {
            password: passUpdate.password,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => navigate("/login"))
        .catch((error) => console.log(error));
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
              id="standar-basic-new-pass"
              label="Enter new password"
              type="password"
              name="password"
              value={passUpdate.password}
              onChange={handleChange}
            />
            <TextField
              id="standar-basic-new-pass-repeat"
              label="Repeat new password"
              type="password"
              name="passwordRepeat"
              value={passUpdate.passwordRepeat}
              onChange={handleChange}
            />
            <Button variant="outlined" className="registerButton" type="submit">
              UPDATE PASSWORD
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(ChangePass);
