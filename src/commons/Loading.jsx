import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  loading: {
    "& > *": {
      display: "block",
      position: "fixed",
      width: "50px",
      heigth: "50px",
    },
  },
});
const Loading = ({ classes }) => {
  return <CircularProgress color="inherit" className={classes.loading} />;
};

export default withStyles(styles)(Loading);
