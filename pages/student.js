import React from "react";
import TextField from "@mui/material/TextField";
import GroupsIcon from "@mui/icons-material/Groups";
import { Button, CircularProgress, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import MUIDataTable from "mui-datatables";
import AddStudentModal from "../component/AddStudentModal";
import styles from "../styles/Student.module.css";
const columns = ["Name", "Company", "City", "State"];

const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  filterType: "checkbox",
};

function Student() {
  const [loading, setLoading] = React.useState(false);
  const [loadAll, setLoadAll] = React.useState(false);
  const [students, setStudent] = React.useState([]);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleSelect = () => {
    setLoadAll(true);
    setTimeout(() => {
      setLoadAll(false);
    }, 2000);
  };

  const addStudent = () => {};

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Student Management</h1>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item md={8}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                id="outlined-basic"
                label="Enter stuident name to search"
                variant="outlined"
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
        <Grid item sm={12}>
          {students.length > -0 ? (
            <MUIDataTable
              title={"Employee List"}
              data={data}
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
                Search for student by username or "See All Students"
              </Typography>
            </div>
          )}
        </Grid>
      </Grid>
    </main>
  );
}

export default Student;
