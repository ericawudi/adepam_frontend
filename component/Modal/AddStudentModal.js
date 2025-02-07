import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";
import { CircularProgress, Divider, Grid, MenuItem } from "@mui/material";
import styles from "../../styles/AddStudentModal.module.css";
import Image from "next/image";
import { CreateUser } from "../../services/authService";

function AddStudentModal(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
  const [image, setImage] = React.useState(null);
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

  const handleLogoUpload = (event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const studentData = { ...data, image: image };
    setLoading(true);
    let message = "Student successfully created";
    let severity = "success";
    const resp = await CreateUser(studentData, "student");
    if (resp.status == 200) {
      props.handleReRender();
      reset();
      setImage(null);
      setSelectLevel(100);
      setSelectedStatus("active");
    } else {
      message = "Error creating student.";
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
      <Button
        startIcon={<PersonAddAltIcon />}
        variant="contained"
        className={styles.button}
        onClick={handleClickOpen}
      >
        New Student
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Student</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <TextField
                  id="name"
                  label="Enter fullname"
                  variant="outlined"
                  name="name"
                  {...register("name", { required: true })}
                  error={errors.fullname && true}
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item sm={6}>
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
              <Grid item sm={6}>
                <TextField
                  id="email"
                  label="Enter Email"
                  variant="outlined"
                  name="email"
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  })}
                  error={errors.email && true}
                  fullWidth
                />
              </Grid>
              <Grid item sm={6}>
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
              <Grid item sm={6}>
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
              <Grid item sm={6}>
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
              <Grid item xs={6}>
                <label htmlFor="upload-student-image">
                  <input
                    accept="image/*"
                    className={styles.input}
                    id="upload-student-image"
                    type="file"
                    onChange={handleLogoUpload}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    component="span"
                    className={styles.button2}
                    endIcon={<CloudUploadIcon />}
                  >
                    Choose Image
                  </Button>
                </label>
              </Grid>
              {/* Student Image Display */}
              <Grid item xs={12}>
                {image && (
                  <Image
                    src={image}
                    width={200}
                    height={200}
                    className={styles.image}
                    layout="intrinsic"
                  />
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
              {loading && (
                <CircularProgress
                  color="secondary"
                  className={styles.loading}
                  size={20}
                />
              )}{" "}
              Create Student
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddStudentModal;
