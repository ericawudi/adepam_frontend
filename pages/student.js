import React from "react";
import TextField from "@mui/material/TextField";
import GroupsIcon from "@mui/icons-material/Groups";
import { Button, CircularProgress, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import styles from "../styles/Student.module.css";
import { GetList } from "../services/authService";
import AddStudentModal from "../component/Modal/AddStudentModal";
import EditStudentModal from "../component/Modal/EditStudentModal";
import DeleteModal from "../component/Modal/DeleteModal";
import Notification from "../component/Notification";
import DataTable from "../component/DataTable";
import Loading from "../component/Modal/Loading";

function Student() {
  const [loading, setLoading] = React.useState(false);
  const [students, setStudent] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [notif, setNotif] = React.useState({
    message: "This is an information message!",
    severity: "info",
    open: false,
  });
  // const columns = [
  //   {
  //     name: "_id",
  //     label: "ID",
  //     options: {
  //       filter: false,
  //       sort: false,
  //       display: false,
  //     },
  //   },
  //   {
  //     name: "name",
  //     label: "Name",
  //     options: {
  //       filter: true,
  //       sort: true,
  //     },
  //   },
  //   {
  //     name: "contact",
  //     label: "Contact No.",
  //     options: {
  //       filter: true,
  //       sort: true,
  //     },
  //   },
  //   {
  //     name: "level",
  //     label: "Level",
  //     options: {
  //       filter: true,
  //       sort: true,
  //     },
  //   },
  //   {
  //     name: "gardian",
  //     label: "Gardian",
  //     options: {
  //       filter: true,
  //       sort: true,
  //     },
  //   },
  //   {
  //     name: "createdAt",
  //     label: "Enrolled On",
  //     options: {
  //       filter: true,
  //       sort: true,
  //     },
  //   },
  //   {
  //     name: "completionStatus",
  //     label: "completionStatus",
  //     options: {
  //       filter: true,
  //       sort: true,
  //       display: true,
  //     },
  //   },
  //   {
  //     name: "email",
  //     label: "Email",
  //     options: {
  //       filter: true,
  //       sort: true,
  //     },
  //   },
  //   {
  //     name: "createdAt",
  //     label: "Creation Date",
  //     options: {
  //       filter: true,
  //       sort: true,
  //     },
  //   },
  //   {
  //     name: "action",
  //     label: "Action",
  //     options: {
  //       filter: false,
  //       customBodyRender: (value, tableMeta) => {
  //         // this is being used and not tableMeta 'cos of the base64 image
  //         // It's not part of the table but want to make it editable
  //         const dataToEdit = students.filter(
  //           (student) => student._id == tableMeta.rowData[0]
  //         );

  //         return (
  //           <div style={{ display: "flex" }}>
  //             <EditStudentModal
  //               data={dataToEdit[0]}
  //               handleReRender={handleReRender}
  //               handleNotification={handleNotification}
  //             />
  //             <DeleteModal
  //               data={tableMeta.rowData}
  //               route="student"
  //               handleReRender={handleReRender}
  //               handleNotification={handleNotification}
  //             />
  //           </div>
  //         );
  //       },
  //     },
  //   },
  // ];
  const columns = [
    { name: "name", label: "Name", options: { filter: true, sort: true } },
    {
      name: "contact",
      label: "Contact No.",
      options: { filter: true, sort: true },
    },
    { name: "level", label: "Level", options: { filter: true, sort: true } },
    {
      name: "gardian",
      label: "Guardian",
      options: { filter: true, sort: true },
    },
    {
      name: "createdAt",
      label: "Enrolled On",
      options: { filter: true, sort: true },
    },
    {
      name: "completionStatus",
      label: "Completion Status",
      options: { filter: true, sort: true },
    },
    { name: "email", label: "Email", options: { filter: true, sort: true } },
    {
      name: "createdAt",
      label: "Creation Date",
      options: { filter: true, sort: true },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div style={{ display: "flex" }}>
              <EditStudentModal
                data={tableMeta}
                handleReRender={handleReRender}
                handleNotification={handleNotification}
              />
              <DeleteModal
                data={tableMeta}
                route="student"
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
    getData("student");
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
      setStudent(resp.data);
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
    getData("student");
  }, []);

  const options = {
    filterType: "dropdown",
    selectableRows: "none",
    downloadOptions: { filename: "student_info_list.csv", separator: "," },
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Student Management</h1>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item sm={12}>
          {loading && <Loading />}
          {students.length > 0 ? (
            <DataTable
              data={students}
              columns={columns}
              options={options}
              component={
                <AddStudentModal
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
                  Search for students
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Looks like no student has been enrolled
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Click the New Student button to create a student
                </Typography>
                <br />
                <AddStudentModal
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

export default Student;
