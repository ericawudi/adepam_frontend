import React from "react";
import TextField from "@mui/material/TextField";
import GroupsIcon from "@mui/icons-material/Groups";
import { Button, CircularProgress, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import MUIDataTable from "mui-datatables";
import styles from "../styles/Student.module.css";
import { GetList } from "../services/authService";
import DeleteModal from "../component/Modal/DeleteModal";
import EditTeacherModal from "../component/Modal/EditTeacherModal";
import AddTeacherModal from "../component/Modal/AddTeacherModal";
import Notification from "../component/Notification";

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
          const dataToEdit = teachers.filter(
            (teacher) => teacher._id == tableMeta.rowData[0]
          );

          return (
            <div style={{ display: "flex" }}>
              <EditTeacherModal
                data={dataToEdit[0]}
                handleReRender={handleReRender}
                handleNotification={handleNotification}
              />
              <DeleteModal
                data={tableMeta.rowData}
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

  const handleChange = (event) => {
    setSearch(event.target.value);
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

  const handleSearch = () => {
    if (search.length > 0) {
      getData(`teacher/${search}`);
    }
  };

  const handleSelect = () => {
    getData("teacher");
  };

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
        <Grid item md={8}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                id="search-teacher"
                label="Enter teacher name to search"
                variant="outlined"
                onChange={handleChange}
                fullWidth
              />
              {loading && (
                <CircularProgress
                  color="secondary"
                  className={styles.loading}
                  size={20}
                />
              )}
            </Grid>
            <Grid item md={3}>
              <Button
                fullWidth
                variant="outlined"
                disabled={loading}
                className={styles.button}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Grid>
            <Grid item md={3}>
              <Button
                fullWidth
                variant="outlined"
                disabled={loading}
                className={styles.button}
                onClick={handleSelect}
              >
                All
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} justifyContent="flex-end" style={{ display: "flex" }}>
          <AddTeacherModal
            handleReRender={handleReRender}
            handleNotification={handleNotification}
          />
        </Grid>
        <Grid item sm={12}>
          {teachers.length > 0 ? (
            <MUIDataTable
              title={"Adepam Teacher List"}
              data={teachers}
              columns={columns}
              options={options}
            />
          ) : (
            <div className={styles.noContent}>
              <GroupsIcon sx={{ fontSize: 200, color: "rgba(0, 0, 0, 0.1)" }} />
              <Typography variant="h5" color="text.secondary" component="div">
                Search for teacher
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Search for teacher by username or &quot;See All Teachers&quot;
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Click the New Teacher button to create a teacher
              </Typography>
            </div>
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
