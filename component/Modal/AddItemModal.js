import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";
import { CircularProgress, Divider, Grid, MenuItem } from "@mui/material";
import styles from "../../styles/AddTeacherModal.module.css";
import Image from "next/image";
import { CreateUser } from "../../services/authService";

function AddTeacherModal(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [conditions] = React.useState([
    { value: true, label: "Active" },
    { value: false, label: "Faulty" },
  ]);
  const [condition, setConditon] = React.useState(true);

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

  //   handleConditionChange
  const handleConditionChange = (event) => {
    setConditon(event.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const itemData = {
      ...data,
      image: image,
    };
    setLoading(true);
    let message = "Item successfully created";
    let severity = "success";
    const resp = await CreateUser(itemData, "procure");
    if (resp.status == 200) {
      props.handleReRender();
      reset();
    } else {
      message = "Error creating item.";
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
        startIcon={<AddCircleIcon />}
        variant="contained"
        className={styles.button}
        onClick={handleClickOpen}
      >
        New Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Item</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <TextField
                  id="model"
                  label="Enter name (include model)"
                  variant="outlined"
                  name="model"
                  {...register("model", { required: true })}
                  error={errors.model && true}
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  select
                  label="Item Condition"
                  {...register("condition")}
                  value={condition}
                  fullWidth
                  onChange={handleConditionChange}
                  error={errors.condition && true}
                >
                  {conditions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  id="description"
                  label="Item description"
                  variant="outlined"
                  multiline={true}
                  rows={3}
                  name="description"
                  type="description"
                  {...register("description", {
                    required: true,
                  })}
                  error={errors.description && true}
                  fullWidth
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
              Create Item
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddTeacherModal;
