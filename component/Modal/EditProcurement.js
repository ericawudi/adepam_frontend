import React from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  CircularProgress,
  IconButton,
  Divider,
  Grid,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";
import { EditDetails } from "../../services/authService";
import styles from "../../styles/AddTeacherModal.module.css";

function EditProcurementModal(props) {
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleConditionChange = (event) => {
    setConditon(event.target.value);
  };

  const onSubmit = async (data) => {
    const teacherData = {
      model: data.model,
      description: data.description,
      condition: data.condition,
      image: image,
    };
    setLoading(true);
    let message = "Item info successfully edited";
    let severity = "success";
    const resp = await EditDetails(`procure/${data._id}`, teacherData);
    if (resp.status == 200) {
      props.handleReRender();
      reset();
    } else {
      message = "Error editing item details.";
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
    setConditon(props.data.condition);
  }, [props.data]);

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Edit Item Details</DialogTitle>
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
                  id="description"
                  label="Item description"
                  variant="outlined"
                  name="description"
                  type="description"
                  {...register("description", {
                    required: true,
                  })}
                  error={errors.description && true}
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
              <Grid item xs={6}>
                <label htmlFor="upload-procurement-image">
                  <input
                    accept="image/*"
                    className={styles.input}
                    id="upload-procurement-image"
                    type="file"
                    onChange={handleLogoUpload}
                  />
                  {/* Procurement Image Display */}
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
              Edit Item
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default EditProcurementModal;
