import { Box, Typography } from "@mui/material";
import React from "react";
import { IFeatureCardData } from "src/types/dashboard";

const FeaturesCard: React.FC<IFeatureCardData> = ({ title, content, icons, rating }) => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box
        sx={{
          padding: 2,
          borderRadius: 3,
          border: "1px solid #e6e6e6",
          backgroundColor: "#817e7e00",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: "18px", padding: "10px" }}>
          <Box>
            <img
              src={icons}
              style={{ height: "35px", width: "35px" }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  flexBasis: "75%",
                  height: "50px",
                  overflow: "hidden",
                //   textOverflow: "ellipsis",
                }}
              >
                {title}
              </Typography>
              <Typography sx={{marginBottom:"20px"}}>
                <span style={{ fontWeight: "bold" }}>{rating} </span>/ 10
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "14px", flex: 1, overflow: "auto",marginTop: "15px"  }}>
              {content}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturesCard;
