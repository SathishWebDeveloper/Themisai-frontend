import { CustomPrimaryButton } from "@components/styled-components";
import { Box, Grid, Paper } from "@mui/material";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { FC } from "react";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import DashboardLoader from "../dashboard/dashboardleader";
import User from "@assets/images/dashboard/user-action.png";
import Aua from "@assets/images/dashboard/aua.png";
import Client from "@assets/images/dashboard/client.png";
import Revenue from "@assets/images/dashboard/revenue123.png";
import {
  IDashboardCardData,
  IDashboardData,
  IDashboardDownloadReport,
  IDashboardQuicklinks,
  IDashboardsize,
} from "src/types/dashboard";

const cardData: IDashboardCardData[] = [
  {
    value: "Total Matters",
    imagesrc: <EqualizerIcon />,
    count: 7,
    color: "#3a67e2",
    backgroundColor: "#dee7ff",
  },
  {
    value: "Total Clients",
    imagesrc: <InsertDriveFileIcon />,
    count: 7,
    color: "#0ec9c2",
    backgroundColor: "#ccf4f1",
  },
  {
    value: "AUM",
    imagesrc: <DonutSmallIcon />,
    count: <DashboardLoader />,
    color: "#ef365c",
    backgroundColor: "#fcdbe2",
  },
];

const downloadReport: IDashboardDownloadReport[] = [
  {
    icons: Client,
    value: "Clients",
    subtext: "Report",
    Downloadicon: <DownloadIcon />,
  },
  {
    icons: Aua,
    value: "Invesment",
    subtext: "Report",
    Downloadicon: <DownloadIcon />,
  },
  {
    icons: User,
    value: "Subscription",
    subtext: "Report",
    Downloadicon: <DownloadIcon />,
  },
];

const Quicklinks: IDashboardQuicklinks[] = [
  { value: "Create Portfolio" },
  { value: "Pricing" },
  { value: "Reblance" },
  { value: "Portfolio History" },
  { value: "Factsheet" },
];

const data: IDashboardData[] = [
  { value: 10, label: "Criminal Case" },
  { value: 15, label: "Civil Case" },
  { value: 20, label: "Family Case" },
];

const size: IDashboardsize = {
  width: 400,
  height: 200,
};
const Report: FC = () => {
  // return <h1>Report Page</h1>;
  return (
    <Box sx={{ flexGrow: 1, padding: 8 }}>
      <Grid container spacing={2}>
        <Grid container item xs={8} spacing={2}>
          {cardData.map((item, index) => {
            return (
              <Grid item xs={4} key={index}>
                <Paper elevation={10} sx={{ borderRadius: 3, padding: 2 }}>
                  <div
                    style={{
                      color: "#ef365c",
                      fontSize: 18,
                      fontFamily: "Manrope",
                    }}
                  >
                    {item.value}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    {index === 2 ? (
                      <div
                        style={{
                          fontSize: 30,
                          fontWeight: "normal",
                          minHeight: "5.2vh",
                        }}
                      >
                        {item.count}
                      </div>
                    ) : (
                      <div style={{ fontSize: 30, fontWeight: "normal" }}>
                        {item.count}
                      </div>
                    )}
                    <div
                      style={{
                        color: item.color,
                        backgroundColor: item.backgroundColor,
                        borderRadius: "50%",
                        width: "35px",
                        height: "35px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {item.imagesrc}
                    </div>
                  </div>
                </Paper>
              </Grid>
            );
          })}

          <Grid item xs={6}>
            <Paper elevation={10} sx={{ padding: 2, borderRadius: 3 }}>
              <div
                style={{
                  fontSize: 18,
                  fontFamily: "Manrope",
                  fontWeight: "bold",
                }}
              >
                Title Two
              </div>
              <PieChart
                series={[
                  {
                    arcLabelMinAngle: 45,
                    data,
                  },
                ]}
                slotProps={{ legend: { hidden: true } }}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: "white",
                    fontWeight: "bold",
                  },
                }}
                {...size}
              />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper
              elevation={10}
              sx={{
                padding: 2,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 18,
                    fontFamily: "Manrope",
                    fontWeight: "bold",
                  }}
                >
                  Title Three
                </div>
                <div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {Quicklinks.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              lineHeight: 1,
                              border: "1px solid rgba(247,247,252,255)",
                              backgroundColor: "rgba(247,247,252,255)",
                              borderRadius: 7,
                              margin: 3,
                              padding: 8,
                              width: "70%",
                              color: "#9c9ea3",
                            }}
                          >
                            {item.value}
                          </div>
                          <div
                            style={{
                              backgroundColor: "rgba(247,247,252,255)",
                              borderRadius: "50%",
                              width: "35px",
                              height: "35px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            +
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>

        <Grid container item xs={4} rowSpacing={2} sx={{ maxHeight: "58vh" }}>
          <Grid item xs={12}>
            <Paper elevation={10} sx={{ padding: 2, borderRadius: 3 }}>
              <div
                style={{
                  fontSize: 18,
                  fontFamily: "Manrope",
                  fontWeight: "bold",
                }}
              >
                Title One
              </div>
              {downloadReport.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "0.5px solid #D3D3D3",
                      }}
                    >
                      <img
                        style={{ marginRight: 10 }}
                        src={item.icons}
                        alt="Your GIF"
                      />
                      <div style={{ marginBottom: 10 }}>
                        <div>{item.value}</div>
                        <div style={{ color: "#8a8c8e" }}>{item.subtext}</div>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          marginLeft: "auto",
                          color: "#3d9c7d",
                          backgroundColor: "#e2f6f0",
                          borderRadius: "50%",
                          width: "35px",
                          height: "35px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {item.Downloadicon}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={10} sx={{ padding: 2, borderRadius: 3 }}>
              <div
                style={{
                  fontSize: 18,
                  fontFamily: "Manrope",
                  fontWeight: "bold",
                }}
              >
                Title Four
              </div>
              <div style={{ textAlign: "right", marginLeft: "auto" }}>
                <img
                  style={{ height: "10%", width: "28%" }}
                  src={Revenue}
                  alt="Your GIF"
                />
              </div>
              <CustomPrimaryButton variant="contained">
                ClickHere
              </CustomPrimaryButton>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Report;
