import { CircularProgress, Dialog, Grid } from "@mui/material";
import styles from "../../styles/Loading.module.css";

function Loading({ data = "page loading..." }) {
  return (
    <div>
      <Dialog open={true} className={styles.main}>
        <Grid container className={styles.container}>
          <CircularProgress className={styles.loading} size={30} />
          <div className={styles.content}>{data}</div>
        </Grid>
      </Dialog>
    </div>
  );
}

export default Loading;
