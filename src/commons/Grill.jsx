import { Grid } from "@material-ui/core";
import CardMovie from "./CardMovie";
import "../styles/card.scss";

const Grill = ({ data, type }) => {
  return (
    <div className="grill-container">
      <Grid container spacing={4}>
        {data.length &&
          data.map((item, i) => (
            <Grid item xs={3} key={i}>
              <CardMovie item={item} type={type} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Grill;
