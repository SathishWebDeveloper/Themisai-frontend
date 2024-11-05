import { Button, styled } from "@mui/material";

export const CustomPrimaryButton = styled(Button)`
  && {
    color: white; /* Set text color to black */
    background-color: #303030 !important;
    border-radius: 5px !important;
    width: 120px !important;
    height: 40px !important;
  }
`;

export const CustomSecondaryButton = styled(Button)`
  && {
    color: #232323 !important;
    border: 1px solid #232323;
    border-radius: 5px !important;
    width: 100px !important;
    height: 40px !important;
    &:hover {
      color: white !important;
      background-color: #303030;
    }
  }
`;

export const CustomButton = styled(Button)`
  && {
    color: white; /* Set text color to black */
    background-color: #303030 !important;
    border-radius: 5px !important;
    width: 165px !important;
    height: 40px !important;
  }
`;