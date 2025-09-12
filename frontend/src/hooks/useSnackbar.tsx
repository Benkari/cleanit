import { Alert, Snackbar } from "@mui/material";
import React from "react";

const useSnackbar = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const showError = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  const SnackbarElement = (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    >
      <Alert severity="error">{message}</Alert>
    </Snackbar>
  );

  return { showError, SnackbarElement };
};

export default useSnackbar;
