import { ModalDialog } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/material";
import loaderImage from "@assets/images/loader.gif";
import "@styles/scss/components/loader.scss";

const Loader = () => {
  return (
    <>
      <Modal
        open={true}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalDialog
          color="neutral"
          className="loaderModal"
          variant="solid"
          sx={{
            width: "251px",
            height: "296px",
            Top: "252px",
            Left: "514.5px",
            Radius: "16px",
            background: "#151515",
          }}
        >
          <img
            style={{
              height: "120px",
              width: "120px",
              justifyContent: "center",
            }}
            src={loaderImage}
            alt="Your GIF"
          />
          <Box sx={{ height: "48px", width: "123px", alignItems: "center" }}>
            <Box className="modal-loaderBox">
              <Typography
                id="modal-desc"
                textColor="text.tertiary"
                className="modal-loaderText"
                style={{ height: "24px" }}
              >
                Loading.
              </Typography>
            </Box>
            <Box className="modal-loaderBox">
              <Typography
                id="modal-desc"
                textColor="text.tertiary"
                className="modal-loaderText2"
                style={{ height: "24px" }}
              >
                Please wait a moment
              </Typography>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default Loader;
