import { ChangeEvent } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Modal, Box } from "@mui/material";
import "@styles/scss/layouts/modal.scss";
import CircularProgressWithLabel from "@components/circularprogressbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ModalComponent = ({
  open,
  handleFileChange,
  setOpen,
  loading,
  progress,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  progress: number;
}): JSX.Element => {
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    await handleFileChange(event);
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: 700,
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <CircularProgressWithLabel loading={loading} progress={progress} />
        ) : (
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            className="upload-buttonmatters"
            sx={{ padding: 12, width: 600 }}
          >
            Upload Documents
            <input type="file" hidden multiple onChange={handleFileUpload} />
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
