import React from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
// import MUIDataTable from "mui-datatables";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import styles from "../styles/Student.module.css";
import { GetList } from "../services/authService";
import DeleteModal from "../component/Modal/DeleteModal";
import Notification from "../component/Notification";
import EditProcurementModal from "../component/Modal/EditProcurement";
import AddItemModal from "../component/Modal/AddItemModal";
import DataTable from "../component/DataTable";
import Loading from "../component/Modal/Loading";

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
          return (
            <div style={{ display: "flex" }}>
              <EditProcurementModal
                data={tableMeta}
                handleReRender={handleReRender}
                handleNotification={handleNotification}
              />
              <DeleteModal
                data={tableMeta}
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
    if (resp.status == 200) {
      setItems(resp.data);
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
        <Grid item sm={12}>
          {loading && <Loading />}
          {items.length > 0 ? (
            <DataTable
              data={items}
              columns={columns}
              options={options}
              component={
                <AddItemModal
                  handleReRender={handleReRender}
                  handleNotification={handleNotification}
                />
              }
            />
          ) : (
            !loading && (
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
                  Looks like we do not have any procured item
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Click the New Item button to create a item
                </Typography>
                <br />
                <AddItemModal
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

export default Procurement;
