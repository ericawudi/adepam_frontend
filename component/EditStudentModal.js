import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { Divider, Grid, MenuItem } from "@mui/material";
import { EditDetails } from "../services/authService";

function EditStudentModal(props) {
  const [open, setOpen] = React.useState(false);
  const [level] = React.useState([
    { value: 100, label: "Level 100" },
    { value: 200, label: "Level 200" },
    { value: 300, label: "Level 300" },
  ]);
  const [selectedLevel, setSelectLevel] = React.useState(100);
  const [completionStatus] = React.useState([
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
    { value: "stopped", label: "Stopped" },
  ]);
  const [selectedStatus, setSelectedStatus] = React.useState("active");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSelectLevel(event.target.value);
  };

  const handleCompletionChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const resp = await EditDetails(`student/${props.data.id}`, data);
    if (resp.status === 200) {
      props.handleReRender();
      setOpen(false);
    }
  };

  React.useEffect(() => {
    reset(props.data);
  }, [props.data]);

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Student</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item sm={4}>
                <TextField
                  id="fullname"
                  label="Enter fullname"
                  variant="outlined"
                  name="name"
                  {...register("name", { required: true })}
                  error={errors.fullname && true}
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  id="gardian"
                  label="Gardian Name"
                  variant="outlined"
                  name="gardian"
                  {...register("gardian", { required: true })}
                  error={errors.gardian && true}
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  id="email"
                  label="Enter Email"
                  variant="outlined"
                  name="email"
                  type="email"
                  {...register("email", { required: true })}
                  error={errors.email && true}
                  fullWidth
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  id="contact"
                  label="Contact No."
                  name="contact"
                  type="number"
                  fullWidth
                  variant="outlined"
                  {...register("contact", { required: true })}
                  error={errors.contact && true}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  select
                  label="Select Level"
                  {...register("level", { required: true })}
                  value={selectedLevel}
                  fullWidth
                  onChange={handleChange}
                >
                  {level.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={4}>
                <TextField
                  select
                  label="Completion Status"
                  {...register("completionStatus", { required: true })}
                  value={selectedStatus}
                  fullWidth
                  onChange={handleCompletionChange}
                >
                  {completionStatus.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit(onSubmit)}>Edit Student</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default EditStudentModal;
