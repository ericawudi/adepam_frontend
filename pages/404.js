import { Button } from "@mui/material";
import router from "next/router";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import styles from "../styles/Home.module.css";

function Custom404() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>404 | Page Not Found </h1>
        <Button
          variant="outlined"
          startIcon={<ArrowLeftIcon />}
          onClick={() => router.replace("/")}
        >
          Back to Home
        </Button>
      </main>
    </div>
  );
}
export default Custom404;
