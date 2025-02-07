import React from "react";
import TextField from "@mui/material/TextField";
import GroupsIcon from "@mui/icons-material/Groups";
import { Button, CircularProgress, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
// import MUIDataTable from "mui-datatables";
import styles from "../styles/Student.module.css";
import { GetList } from "../services/authService";
import DeleteModal from "../component/Modal/DeleteModal";
import EditTeacherModal from "../component/Modal/EditTeacherModal";
import AddTeacherModal from "../component/Modal/AddTeacherModal";
import Notification from "../component/Notification";
import DataTable from "../component/DataTable";
import Loading from "../component/Modal/Loading";

function Teacher() {
  const [loading, setLoading] = React.useState(false);
  const [loadAll, setLoadAll] = React.useState(false);
  const [teachers, setTeachers] = React.useState([]);
  const [rerender, setRerender] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [notif, setNotif] = React.useState({
    message: "This is an information message!",
    severity: "info",
    open: false,
  });

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "contact",
      label: "Contact No.",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "createdAt",
      label: "Employment Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "updatedAt",
      label: "Last Edited Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "subject",
      label: "Subject",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "profile",
      label: "Profile",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div style={{ display: "flex" }}>
              <EditTeacherModal
                data={tableMeta}
                handleReRender={handleReRender}
                handleNotification={handleNotification}
              />
              <DeleteModal
                data={tableMeta}
                route="teacher"
                handleReRender={handleReRender}
                handleNotification={handleNotification}
              />
            </div>
          );
        },
      },
    },
  ];

  const handleReRender = () => {
    getData("teacher");
  };

  const handleNotifClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotif({
      open: false,
    });
  };

  const handleNotification = (details) => {
    setNotif(details);
  };

  const getData = async (route) => {
    setLoading(true);
    const resp = await GetList(route);
    if (resp.status == 200) {
      setTeachers(resp.data);
    } else {
      handleNotification({
        message: "Error in fetching data",
        severity: "error",
        open: true,
      });
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getData("teacher");
  }, []);

  const options = {
    filterType: "dropdown",
    selectableRows: false,
    responsive: "standard",
    selectableRows: "none",
    viewColumns: true,
    downloadOptions: {
      filename: "teacher_info_list.csv",
      separator: ",",
    },
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Teacher Management</h1>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item sm={12}>
          {loading && <Loading data="loading teachers data... " />}
          {teachers.length > 0 ? (
            <DataTable
              data={teachers}
              columns={columns}
              options={options}
              component={
                <AddTeacherModal
                  handleReRender={handleReRender}
                  handleNotification={handleNotification}
                />
              }
            />
          ) : (
            !loading && (
              <div className={styles.noContent}>
                <GroupsIcon
                  sx={{ fontSize: 200, color: "rgba(0, 0, 0, 0.1)" }}
                />
                <Typography variant="h5" color="text.secondary" component="div">
                  Search for teacher
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Looks like we do not have teachings yet
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Click the New Teacher button to create a teacher
                </Typography>
                <br />
                <AddTeacherModal
                  handleReRender={handleReRender}
                  handleNotification={handleNotification}
                />
              </div>
            )
          )}
        </Grid>
      </Grid>
      <Notification
        severity={notif.severity}
        message={notif.message}
        open={notif.open}
        handleClose={handleNotifClose}
      />
    </main>
  );
}

export default Teacher;
