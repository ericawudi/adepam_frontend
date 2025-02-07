import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { Divider, Grid, CircularProgress } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DeleteRecord } from "../../services/authService";
import styles from "../../styles/GeneralModal.module.css";

function DeleteModal(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    let message = "Record successfully deleted";
    let severity = "success";
    const resp = await DeleteRecord(props.route, props.data._id);
    if (resp.status == 200) {
      props.handleReRender();
    } else {
      message = "Error deleting record.";
      severity = "error";
    }
    props.handleNotification({
      message,
      open: true,
      severity,
    });
    setOpen(false);
    setLoading(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Delete {props.route.charAt(0).toUpperCase() + props.route.slice(1)}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              item
              sm={12}
              justifyContent="center"
              style={{ display: "flex" }}
            >
              <WarningIcon style={{ fontSize: 80, color: "#ffcc00" }} />
            </Grid>
            <Grid
              item
              sm={12}
              justifyContent="center"
              style={{ display: "flex" }}
            >
              Are You Sure You Want to Delete{" "}
              {props.route.charAt(0).toUpperCase() + props.route.slice(1)}{" "}
              Record?
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDelete} disabled={loading}>
            {" "}
            {loading && (
              <CircularProgress
                color="secondary"
                className={styles.loading}
                size={20}
              />
            )}
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteModal;
