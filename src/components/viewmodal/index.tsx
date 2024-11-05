/* eslint-disable @typescript-eslint/prefer-as-const */
import AISummary from "@container/AIsummary";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC, Fragment, useEffect, useRef, useState } from "react";

export interface ViewModalProps {
  open: boolean;
  handleClose: () => void;
  summaryContent: string;
}

const ViewModal: FC<ViewModalProps> = ({
  open,
  handleClose,
  summaryContent,
}) => {
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
  console.log(setScroll);

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            width: "45%",
            maxWidth: "45%",
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title">Workflow Summary</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <AISummary summaryContent={summaryContent} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ViewModal;
