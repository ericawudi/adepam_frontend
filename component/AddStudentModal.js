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
import { Divider, Grid, MenuItem } from "@mui/material";
import styles from "../styles/AddStudentModal.module.css";
import Image from "next/image";
import { CreateUser } from "../services/authService";

function AddStudentModal() {
  const [open, setOpen] = React.useState(false);
  const [level] = React.useState([
    { value: 100, label: "Level 100" },
    { value: 200, label: "Level 200" },
    { value: 300, label: "Level 300" },
  ]);
  const [selectedLevel, setSelectLevel] = React.useState(100);
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

  const handleLogoUpload = (event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  React.useEffect(() => {
    console.log(image);
  }, [image]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const studentData = { ...data, image: image };
    const resp = await CreateUser(studentData, "student");
    console.log({ resp });
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
              <Grid item sm={4}>
                <TextField
                  id="fullname"
                  label="Enter fullname"
                  variant="outlined"
                  name="fullname"
                  {...register("fullname", { required: true })}
                  error={errors.fullname && true}
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  id="gardianName"
                  label="Gardian Name"
                  variant="outlined"
                  name="gardianName"
                  {...register("gardianName", { required: true })}
                  error={errors.gardianName && true}
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  id="email"
                  label="Enter fullname"
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
                  {...register("number", { required: true })}
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
              <Grid item xs={4}>
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit(onSubmit)}>Create Student</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddStudentModal;
