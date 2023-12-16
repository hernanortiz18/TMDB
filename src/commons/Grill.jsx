import { Grid } from "@material-ui/core";
import CardMovie from "./CardMovie";
import "../styles/card.scss";

const Grill = ({ data }) => {
  return (
    <div className="grill-container">
      <Grid container spacing={4}>
        {data.length &&
          data.map((item, i) => (
            <Grid item xs={3} key={i}>
              <CardMovie item={item} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Grill;
