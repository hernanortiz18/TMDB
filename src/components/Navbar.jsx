import { Link } from "react-router-dom";
import { AppBar, Typography, Toolbar, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
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
}));
const Navbar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);

  return (
    <AppBar className={classes.navbar}>
      <Toolbar className={classes.toolbar}>
        <Link to="/home">
          <img src="../assets/Logo.png" alt="LOGO" className={classes.logo} />
        </Link>
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
                <Link to="/logout" className={classes.linkContainer}>
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
  );
};

export default Navbar;
