import { TextField, styled } from "@mui/material";

const InputTextField = styled(TextField)(({ error }) => ({
  "& .css-1wc848c-MuiFormHelperText-root ": {
    color: "red !important",
    fontSize: "13px !important",
    marginTop: "-5px !important",

  },

  "& label.Mui-focused": {
    color: `${error ? "red" : "black"} !important`, // Change label color to red if there is an error
    fontSize: "17px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: error ? "red" : "black", // Change underline color to red if there is an error
  },
  "& label": {
    // fontSize: "14px",
    alignItems: "center",
    color: `${error ? "red" : "black"} !important`,
    fontSize: "16.5px",
    // padding: "10px",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover": {
      "& fieldset": {
        borderColor: `${error ? "red" : "black"} !important`, // Change border color to red if there is an error
        fontSize: "15.9px",
        padding: "10px",
      },
    },
    "& fieldset": {
      borderColor: `${error ? "red" : "#5c5c5c"} !important`, // Change border color to red if there is an error
      height: "55px",
      borderRadius: "5px",
      width: '30rem',
      fontSize: "15.9px",
      padding: "10px",

    },
    "&.Mui-focused fieldset": {
      borderColor: `${error ? "red" : "#5c5c5c"} !important`, // Change border color to red if there is an error   
      width: '30rem',
      fontSize: "15.9px",
      padding: "10px",

    },
  },
}));

export default InputTextField;
