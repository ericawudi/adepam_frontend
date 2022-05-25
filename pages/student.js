import React from "react";
import TextField from "@mui/material/TextField";
import GroupsIcon from "@mui/icons-material/Groups";
import { Button, CircularProgress, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import MUIDataTable from "mui-datatables";
import AddStudentModal from "../component/AddStudentModal";
import styles from "../styles/Student.module.css";
import { GetList } from "../services/authService";
import EditStudentModal from "../component/EditStudentModal";
import DeleteStudentModal from "../component/DeleteStudentModal";

function Student() {
  const [loading, setLoading] = React.useState(false);
  const [loadAll, setLoadAll] = React.useState(false);
  const [students, setStudent] = React.useState([]);
  const [rerender, setRerender] = React.useState(false);
  const [search, setSearch] = React.useState("");

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
      name: "gardian",
      label: "Gardian",
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
      label: "Enrolled On",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "completionStatus",
      label: "completionStatus",
      options: {
        filter: true,
        sort: true,
        display: false,
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
      name: "createdAt",
      label: "Creation Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value, tabeMetha) => {
          let fieldData = {
            id: tabeMetha.rowData[0],
            name: tabeMetha.rowData[1],
            gardian: tabeMetha.rowData[2],
            contact: tabeMetha.rowData[3],
            completionStatus: tabeMetha.rowData[5],
            email: tabeMetha.rowData[6],
          };
          return (
            <div style={{ display: "flex" }}>
              <EditStudentModal
                data={fieldData}
                handleReRender={handleReRender}
              />
              <DeleteStudentModal
                data={tabeMetha.rowData}
                handleReRender={handleReRender}
              />
            </div>
          );
        },
      },
    },
  ];

  const handleReRender = () => {
    setRerender(!rerender);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const getData = async (route) => {
    const resp = await GetList(route);
    console.log({ resp });
    if (resp.status == 200) {
      setStudent(resp.data);
    } else {
      console.log(`Errow fetching ${route} data`);
    }
  };

  React.useEffect(() => {
    getData("student");
  }, [rerender]);

  const handleSearch = () => {
    setLoading(true);
    getData(`student/${search}`);
    setLoading(false);
  };

  const handleSelect = () => {
    setLoadAll(true);
    getData("student");
    setLoadAll(false);
  };

  const options = {
    filterType: "dropdown",
    selectableRows: false,
    responsive: "standard",
    selectableRows: "none",
    viewColumns: true,
    downloadOptions: {
      filename: "student_info_list.csv",
      separator: ",",
    },
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Student Management</h1>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item md={8}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                id="search-student"
                label="Enter stuident name to search"
                variant="outlined"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item md={3}>
              <Button
                fullWidth
                variant="outlined"
                disabled={loading || loadAll}
                className={styles.button}
                onClick={handleSearch}
              >
                {loading && (
                  <CircularProgress
                    color="secondary"
                    className={styles.loading}
                    size={20}
                  />
                )}
                {loading ? "Searching..." : "Search"}
              </Button>
            </Grid>
            <Grid item md={3}>
              <Button
                fullWidth
                variant="outlined"
                disabled={loading || loadAll}
                className={styles.button}
                onClick={handleSelect}
              >
                {loadAll && (
                  <CircularProgress
                    color="secondary"
                    className={styles.loading}
                    size={20}
                  />
                )}
                {loadAll ? "Searching..." : "All Students"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} justifyContent="flex-end" style={{ display: "flex" }}>
          <AddStudentModal />
        </Grid>
        {/* from here */}
        <Grid item sm={12}>
          {students.length > 0 ? (
            <MUIDataTable
              title={"Adepam Student List"}
              data={students}
              columns={columns}
              options={options}
            />
          ) : (
            <div className={styles.noContent}>
              <GroupsIcon sx={{ fontSize: 200, color: "rgba(0, 0, 0, 0.1)" }} />
              <Typography variant="h5" color="text.secondary" component="div">
                Search for students
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Search for student by username or &quot;See All Students&quot;
              </Typography>
            </div>
          )}
        </Grid>
        {/* to here */}
      </Grid>
    </main>
  );
}

export default Student;
