import { Divider, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupsIcon from "@mui/icons-material/Groups";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CountUp from "react-countup";
import TeacherCard from "../component/teacherCard";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Adepam Dashboard</h1>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Paper
            elevation={10}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            className={styles.teacherCard}
          >
            <CardContent className={styles.numbers}>
              <Typography variant="h5" component="div">
                <CountUp end={100} duration={3} />
              </Typography>
              <Typography variant="h5" component="div">
                Number of Teachers
              </Typography>
            </CardContent>
            <AdminPanelSettingsIcon
              sx={{ fontSize: 100, color: "#7c43bda0" }}
            />
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper
            elevation={10}
            className={styles.studentCard}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <CardContent className={styles.numbers}>
              <Typography variant="h5" component="div">
                <CountUp end={100} duration={3} />
              </Typography>
              <Typography variant="h5" component="div">
                Number of Student
              </Typography>
            </CardContent>
            <GroupsIcon sx={{ fontSize: 100, color: "#bcbcbc" }} />
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper
            elevation={10}
            className={styles.machineCard}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <CardContent className={styles.numbers}>
              <Typography variant="h5" component="div">
                Fit: <CountUp end={100} duration={3} /> | Faulty:{" "}
                <CountUp end={10} duration={1} />
              </Typography>
              <Typography variant="h5" component="div">
                Machines
              </Typography>
            </CardContent>
            <PrecisionManufacturingIcon
              sx={{ fontSize: 100, color: "#7c43bda0" }}
            />
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Latest Teachers
          </Typography>
          <Paper elevation={2}>
            <TeacherCard
              name="Eric Awudi"
              picture="logo.png"
              profile="This is our best techer. dkjfhgdnfnkdlsmfdlsjf"
              dateEmployed="12/12/12"
            />
            <Divider />
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Newest Students
          </Typography>
          <Paper elevation={2}>
            <TeacherCard
              name="Eric Awudi"
              picture="logo.png"
              profile="This is our best techer. dkjfhgdnfnkdlsmfdlsjf"
              dateEmployed="12/12/12"
            />
            <Divider />
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Machines
          </Typography>
          <Paper elevation={2}>
            <TeacherCard
              name="Eric Awudi"
              picture="logo.png"
              profile="This is our best techer. dkjfhgdnfnkdlsmfdlsjf"
              dateEmployed="12/12/12"
            />
            <Divider />
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
}
