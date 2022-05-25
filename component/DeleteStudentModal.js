import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import { Divider, Grid } from "@mui/material";
import { DeleteRecord } from "../services/authService";
import { Delete } from "@mui/icons-material";

function DeleteStudentModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    console.log(props.data);
    const resp = await DeleteRecord("student", props.data[0]);
    if (resp.status == 200) {
      props.handleReRender();
      setOpen(false);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Student</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              item
              sm={12}
              justifyContent="center"
              style={{ display: "flex" }}
            >
              <FmdBadIcon style={{ fontSize: 80, color: "#ffcc00" }} />
            </Grid>
            <Grid
              item
              sm={12}
              justifyContent="center"
              style={{ display: "flex" }}
            >
              Are You Sure You Want to Delete Student Record?
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteStudentModal;
