import { CircularProgress, Dialog, Grid } from "@mui/material";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "../styles/Loading.module.css";

function Loading({ modelState = true }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={modelState} className={styles.main}>
        <Grid container className={styles.container}>
          <CircularProgress className={styles.loading} size={30} />
          <div className={styles.content}> page loading...</div>
        </Grid>
      </Dialog>
    </div>
  );
}

export default Loading;
