import React from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import MUIDataTable from "mui-datatables";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import styles from "../styles/Student.module.css";
import { GetList } from "../services/authService";
import DeleteModal from "../component/Modal/DeleteModal";
import Notification from "../component/Notification";
import EditProcurementModal from "../component/Modal/EditProcurement";
import AddItemModal from "../component/Modal/AddItemModal";

function Procurement() {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
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
      name: "model",
      label: "Model",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "condition",
      label: "Condition",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return <div>{value ? "Active" : "Faulty"}</div>;
        },
      },
    },
    {
      name: "description",
      label: "Item description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "createdAt",
      label: "Entry Date",
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
      name: "action",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          const dataToEdit = items.filter(
            (item) => item._id == tableMeta.rowData[0]
          );

          return (
            <div style={{ display: "flex" }}>
              <EditProcurementModal
                data={dataToEdit[0]}
                handleReRender={handleReRender}
                handleNotification={handleNotification}
              />
              <DeleteModal
                data={tableMeta.rowData}
                route="procure"
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
    getData("procure");
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
    console.log({ resp });
    if (resp.status == 200) {
      setItems(resp.data);
    } else {
      handleNotification({
        message: "Error in fetching data",
        severity: "error",
        open: true,
      });
      console.log(`Errow fetching ${route} data`);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getData("procure");
  }, []);

  const handleSearch = () => {
    if (search.length > 0) {
      getData(`procure/${search}`);
    }
  };

  const handleSelect = () => {
    getData("procure");
  };

  const options = {
    filterType: "dropdown",
    selectableRows: false,
    responsive: "standard",
    selectableRows: "none",
    viewColumns: true,
    downloadOptions: {
      filename: "procure_info_list.csv",
      separator: ",",
    },
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Procurement Management</h1>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item md={8}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                id="search-procure"
                label="Enter item name to search"
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
                All Items
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} justifyContent="flex-end" style={{ display: "flex" }}>
          <AddItemModal
            handleReRender={handleReRender}
            handleNotification={handleNotification}
          />
        </Grid>
        <Grid item sm={12}>
          {items.length > 0 ? (
            <MUIDataTable
              title={"Adepam Procurement List"}
              data={items}
              columns={columns}
              options={options}
            />
          ) : (
            <div className={styles.noContent}>
              <PrecisionManufacturingIcon
                sx={{ fontSize: 200, color: "rgba(0, 0, 0, 0.1)" }}
              />
              <Typography variant="h5" color="text.secondary" component="div">
                Search for an item
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Search for an item by model or &quot;See All Items&quot;
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Click the New Item button to create a item
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

export default Procurement;
