import React from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";
import { Divider, Grid } from "@mui/material";
import { EditDetails } from "../../services/authService";
import styles from "../../styles/AddTeacherModal.module.css";

function EditTeacherModal(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const teacherData = {
      name: data.name,
      email: data.email,
      contact: data.contact,
      profile: data.profile,
      subject:
        typeof data.subject == "string"
          ? data.subject.split(",")
          : data.subject,
      image: image,
    };
    setLoading(true);
    let message = "Teacher info successfully edited";
    let severity = "success";
    const resp = await EditDetails(`teacher/${data._id}`, teacherData);
    if (resp.status == 200) {
      props.handleReRender();
      reset();
    } else {
      message = "Error editing teacher details.";
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

  const handleLogoUpload = (event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  React.useEffect(() => {
    reset(props.data);
    setImage(props.data.image);
  }, [props.data]);

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Edit Teacher Details</DialogTitle>
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
                  id="subject"
                  label="Subject"
                  placeholder="Separate subjects with comas"
                  name="contact"
                  fullWidth
                  variant="outlined"
                  {...register("subject", { required: true })}
                  error={errors.contact && true}
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
              {" "}
              {loading && (
                <CircularProgress
                  color="secondary"
                  className={styles.loading}
                  size={20}
                />
              )}
              Edit Teacher
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default EditTeacherModal;
