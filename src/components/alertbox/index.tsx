import { useEffect, useState } from "react";
import { Alert, IconButton, Slide } from "@mui/material";
import "@styles/scss/components/alertbox.scss";

interface IError {
  successMessage?: string;
  errorMsg?: string;
}

export const AlertBox = ({ errorMsg, successMessage }: IError) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <div className="alert-box">
        <Alert variant="filled" severity={errorMsg ? "error" : "success"}>
          {errorMsg || successMessage}
        </Alert>
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={handleClose}
        ></IconButton>
      </div>
    </Slide>
  );
};
