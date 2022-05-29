import React from "react";
import { Divider, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupsIcon from "@mui/icons-material/Groups";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CountUp from "react-countup";
import CustomCard from "../component/CustomCard";
import styles from "../styles/Home.module.css";
import { GetList } from "../services/authService";

export default function Home() {
  const [studentData, setStudentData] = React.useState(null);
  const [teacherData, setTeacherData] = React.useState(null);
  const [procurementData, setProcurementData] = React.useState(null);

  const getData = async (route) => {
    const resp = await GetList(route);
    console.log({ resp });
    if (resp.status == 200) {
      switch (route) {
        case "student":
          setStudentData(resp.data);
          break;
        case "teacher":
          setTeacherData(resp.data);
          break;
        case "procure":
          setProcurementData(resp.data);
          break;
        default:
          break;
      }
    } else {
      console.log(`Errow fetching ${route} data`);
    }
  };
  React.useEffect(() => {
    getData("student");
  }, []);
  React.useEffect(() => {
    getData("teacher");
  }, []);
  React.useEffect(() => {
    getData("procure");
  }, []);

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
                <CountUp end={teacherData && teacherData.length} duration={1} />
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
                <CountUp end={studentData && studentData.length} duration={1} />
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
            className={styles.procurementCard}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <CardContent className={styles.numbers}>
              <Typography variant="h5" component="div">
                <CountUp
                  end={procurementData && procurementData.length}
                  duration={1}
                />
              </Typography>
              <Typography variant="h5" component="div">
                Procurement
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
            {teacherData &&
              teacherData.map((teacher, index) => {
                if (index < 5) {
                  return (
                    <div key={teacher._id}>
                      <CustomCard
                        name={teacher.name}
                        picture={teacher.image}
                        profile={teacher.profile}
                        dateEmployed={teacher.createdAt.slice(0, 10)}
                        dateDesc="Date Employed"
                      />
                      <Divider />
                    </div>
                  );
                }
              })}
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
            {studentData &&
              studentData.map((student, index) => {
                if (index < 5) {
                  return (
                    <div key={student._id}>
                      <CustomCard
                        name={student.name}
                        picture={student.image}
                        profile={student.name}
                        dateEmployed={student.createdAt.slice(0, 10)}
                        dateDesc="Date Enrolled"
                      />
                      <Divider />
                    </div>
                  );
                }
              })}
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Procurement
          </Typography>
          <Paper elevation={2}>
            {procurementData &&
              procurementData.map((item, index) => {
                if (index < 5) {
                  return (
                    <div key={item._id}>
                      <CustomCard
                        key={item._id}
                        name={item.model}
                        picture={item.image}
                        profile={item.description}
                        dateEmployed={item.createdAt.slice(0, 10)}
                        dateDesc="Date Procured"
                      />
                      <Divider />
                    </div>
                  );
                }
              })}
            <Divider />
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
}
