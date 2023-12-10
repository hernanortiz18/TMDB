import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  loading: {
    "& > *": {
      display: "flex",
      justifyContent: "center",
      margin: "auto",
      width: "70px",
      heigth: "70px",
    },
  },
});
const Loading = ({ classes }) => {
  return <CircularProgress color="inherit" className={classes.loading} />;
};

export default withStyles(styles)(Loading);
