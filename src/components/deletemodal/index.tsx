/* eslint-disable @typescript-eslint/prefer-as-const */
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC, Fragment } from "react";
import "@styles/scss/layouts/modal.scss";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

export interface deleteModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmDialog: FC<deleteModalProps> = ({
  open,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            width: "30%",
            maxWidth: "30%",
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title" style={{ textAlign: "center" }}>
          <DeleteTwoToneIcon sx={{ fontSize: 40 }} />
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={handleClose} >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
            style={{ textAlign: "center", fontSize: "20px", fontWeight: 600 }}
          >
            Sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              backgroundColor: "gray",
            }}
            className="delete-modal-button"
          >
            Cancel
          </Button>
          <Button variant="outlined" color="error" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ConfirmDialog;
