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
import { CircularProgress, Divider, Grid } from "@mui/material";
import styles from "../../styles/AddTeacherModal.module.css";
import Image from "next/image";
import { CreateUser } from "../../services/authService";

function AddTeacherModal(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    const teacherData = {
      ...data,
      subject: data.subject.split(","),
      image: image,
    };
    setLoading(true);
    let message = "Teacher successfully created";
    let severity = "success";
    const resp = await CreateUser(teacherData, "teacher");
    if (resp.status == 200) {
      props.handleReRender();
      reset();
    } else {
      message = "Error creating teacher.";
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
        New Teacher
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Teacher</DialogTitle>
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
                  error={errors.name && true}
                  autoFocus
                  fullWidth
                  helperText={"full name is required"}
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
                  helperText={errors.email?.message}
                  fullWidth
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  id="contact"
                  label="Contact No."
                  name="contact"
                  type="tel"
                  fullWidth
                  variant="outlined"
                  {...register("contact", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9]{10}$/, // Adjust length if needed
                      message: "Enter a valid 10-digit mobile number",
                    },
                  })}
                  error={Boolean(errors.contact)}
                  helperText={errors.contact?.message}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  id="subject"
                  label="Subject(s)"
                  placeholder="Separate subjects with comas"
                  name="contact"
                  fullWidth
                  variant="outlined"
                  {...register("subject", { required: true })}
                  error={errors.subject && true}
                  helperText={"subject is required"}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  id="profile"
                  label="Profile"
                  multiline={true}
                  rows={3}
                  placeholder="Teacher's Bio"
                  name="profile"
                  fullWidth
                  variant="outlined"
                  {...register("profile", { required: true })}
                  error={errors.profile && true}
                />
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="upload-teacher-image">
                  <input
                    accept="image/*"
                    className={styles.input}
                    id="upload-teacher-image"
                    type="file"
                    onChange={handleLogoUpload}
                  />
                  {/* Teacher Image Display */}
                  {image && (
                    <Image
                      src={image}
                      width={200}
                      height={200}
                      className={styles.image}
                      layout="responsive"
                    />
                  )}
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
              )}
              Create Teacher
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddTeacherModal;
