import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Notification(props) {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.open}
        autoHideDuration={3000}
        onClose={props.handleClose}
        key={Math.random()}
      >
        <Alert
          onClose={props.handleClose}
          severity={props.severity}
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default Notification;
