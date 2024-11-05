export const customTextFieldStyles = {
  width: "481px",
  borderRadius: "18px",
  height: "55px",
  fontFamily: "DM Sans",
  "& .MuiOutlinedInput-root": {
    borderRadius: "18px",
    "& fieldset": {
      border: "1px solid #D7D7D7 !important",
      borderRadius: "18px",
    },
    "&:hover fieldset": {
      border: "1px solid #D7D7D7 !important",
      borderRadius: "18px",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #D7D7D7 !important",
      borderRadius: "18px",
      // color: "red",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline , &:hover .Mui-error .MuiOutlinedInput-notchedOutline":
      {
        border: "1px solid #FF0000 !important",
      },
  },
  "& .MuiInputBase-input": {
    color: "#ffffff !important",
    padding: "0px 10px !important",
    height: "53px",
    fontSize: "14px",
    fontFamily: "DM Sans",
  },
  "& ::placeholder": {
    color: "#A5A5A5 !important",
    fontSize: "24px",
  },
  "& .MuiOutlinedInput-input": {
    "&:-webkit-autofill": {},
  },
  "& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root": {
    padding: "0 !important",
  },
  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
    color: "#42ca7f !important",
  },
  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root": {
    color: "#42ca7f ",
  },
  " & .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
    color: "#A5A5A5 !important",
    fontSize: "14px",
  },
  "& .MuiIconButton-sizeMedium":{
    outline:"none !important"
  }
};
