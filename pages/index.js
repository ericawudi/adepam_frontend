import React from "react";
import { Divider, Grid, useMediaQuery } from "@mui/material";
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
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const getData = async (route) => {
    const resp = await GetList(route);
    console.log({ resp });
    if (resp.status === 200) {
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
      console.log(`Error fetching ${route} data`);
    }
  };

  React.useEffect(() => {
    getData("student");
    getData("teacher");
    getData("procure");
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Adepam Dashboard</h1>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        className={styles.grid}
      >
        {[
          {
            data: teacherData,
            label: "Teachers",
            icon: AdminPanelSettingsIcon,
            className: styles.teacherCard,
          },
          {
            data: studentData,
            label: "Students",
            icon: GroupsIcon,
            className: styles.studentCard,
          },
          {
            data: procurementData,
            label: "Procurement",
            icon: PrecisionManufacturingIcon,
            className: styles.procurementCard,
          },
        ].map(({ data, label, icon: Icon, className }, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={10}
              className={className}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 2,
              }}
            >
              <CardContent className={styles.numbers}>
                <Typography variant="h5" component="div">
                  <CountUp end={data?.length || 0} duration={1} />
                </Typography>
                <Typography variant="h5" component="div">
                  No. of {label}
                </Typography>
              </CardContent>
              <Icon sx={{ fontSize: 80, color: "#ffffff" }} />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} justifyContent="center" mt={4}>
        {[
          { title: "Latest Teachers", data: teacherData },
          { title: "Newest Students", data: studentData },
          { title: "Procurement", data: procurementData },
        ].map(({ title, data }, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Typography variant="subtitle1" color="text.secondary">
              {title}
            </Typography>
            <Paper elevation={2}>
              {data?.slice(0, 5).map((item) => (
                <div key={item._id}>
                  <CustomCard
                    name={item.name || item.model}
                    picture={item.image}
                    profile={item.profile || item.description}
                    dateEmployed={item.createdAt.slice(0, 10)}
                    dateDesc={
                      title.includes("Procurement")
                        ? "Date Procured"
                        : "Date Enrolled"
                    }
                  />
                  <Divider />
                </div>
              ))}
              <Divider />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
