import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const CustomButton = styled(Button)(() => ({
  width: "481px",
  height: "55px",
  textTransform: "none",
  borderRadius: "13px",
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "700",
  lineHeight: "36px",
  letterSpacing: "0.01rem",
  fontFamily: "DM Sans",
  // backgroundImage:
  //   "linear-gradient(to left, #42ca7f, #6CE1A1, #42ca7f, #2EE881, #42ca7f)",
  backgroundColor: "#6DD071",
  "&:hover": {
    // backgroundImage:
    //   "linear-gradient(to left, #42ca7f, #6CE1A1, #42ca7f, #2EE881, #42ca7f)",
    backgroundColor: "#6DD071",
  },
}));

export default CustomButton;
