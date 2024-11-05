import CircularProgressWithLabel from "@components/circularprogressbar";
import { CustomButton } from "@components/styled-components";
import WorkflowModal from "@components/worklflowmodal";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import "@styles/scss/layouts/create-matter.scss";
import "@styles/scss/layouts/dashboard.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasicPie from "../charts";

export interface CartData {
  value: string;
  label: string;
  buttonValue: string;
  imageSrc: string;
}
export interface ChartData {
  id: number;
  value: number;
  label: string;
}
export interface FileUploadedData {
  file: string;
  date: string;
  link: URL | string;
  icon: React.ElementType;
}
interface IBoxValuesProps {
  width: string;
  minHeight: string;
  paddingBottom?: string;
  gap?: string;
  isValue?: boolean;
  data: CartData[];
  chartData?: ChartData[];
  fileData?: FileUploadedData[];
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  alertMessage?: string | null;
  setAlertMessage?: (message: string | null) => void;
  loading: boolean;
  progress: number;
}

const BoxContainer = ({
  width,
  minHeight,
  paddingBottom,
  gap,
  data,
  isValue,
  chartData,
  fileData,
  handleFileChange,
  loading,
  progress,
}: IBoxValuesProps) => {
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [isopenWorkflow, setIsOpenWorkflow] = useState<boolean>(false);
  const handleOpen = () => setIsOpenWorkflow(true);
  const handleClose = () => setIsOpenWorkflow(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowProgress(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  // const VisuallyHiddenInput = styled("input")({
  //   clip: "rect(0 0 0 0)",
  //   clipPath: "inset(50%)",
  //   height: 1,
  //   overflow: "hidden",
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: "nowrap",
  //   width: 1,
  // });
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    await handleFileChange(event);
  };

  return (
    <Grid>
      {/* {alertMessage && (
        <Box
          className="login-server-side-error"
          style={{
            position: "absolute",
            top: 120,
            right: 250,
          }}
        >
          <AlertBox successMessage={alertMessage} />
        </Box>
      )} */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: 2,
          gap: gap,
          "& > :not(style)": {
            m: 1,
            minHeight: minHeight,
            paddingBottom: paddingBottom,
          },
        }}
      >
        {data.map((item, index) => (
          <Paper
            sx={{
              width: isValue
                ? width
                : index === 2 || index === 3
                ? "100%"
                : "46%",
              boxShadow: item.label === "Workflow" ? "none" : "",
            }}
            key={`cart-${index}`}
            elevation={3}
            className={isValue ? "paper-Container" : "matter-Container"}
          >
            <Grid>
              {isValue ? (
                <>
                  <Grid className="paper-value">{item.value}</Grid>
                  <Grid className="paper-label">{item.label}</Grid>
                </>
              ) : (
                <>
                  <Grid className="paper-value">
                    {item.label === "Workflow" ? "" : item.label}
                  </Grid>
                </>
              )}
            </Grid>
            {isValue ? (
              <Grid>
                <img
                  className="paper-image"
                  src={item.imageSrc}
                  alt="Your GIF"
                />
              </Grid>
            ) : (
              <Grid
                className={
                  item.label === "Workflow" ? " " : "matter-view-container"
                }
              >
                {item.label === "File Import" ? (
                  <>
                    <Box>
                      <Grid
                        sx={{
                          height: "100px",
                          width: "77vw",
                          border: "2px dashed #DBDBDA",
                          backgroundColor: "#FAFAF9",
                          borderRadius: "7px",
                        }}
                      >
                        {/* <Box> */}
                        {loading ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              margin: "25px",
                            }}
                          >
                            <CircularProgressWithLabel
                              loading={loading}
                              progress={progress}
                            />
                          </Box>
                        ) : (
                          <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            className="upload-button"
                          >
                            Upload Documents
                            {/* <VisuallyHiddenInput type="file" /> */}
                            <input
                              type="file"
                              hidden
                              multiple
                              onChange={handleFileUpload}
                            />
                          </Button>
                        )}
                        {/* </Box> */}
                      </Grid>
                      <Box
                        sx={{
                          border: "1px solid #EAEAEA",
                          marginTop: "10px",
                          borderRadius: "7px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              fontSize: "18px",
                              fontWeight: 600,
                              display: "flex",
                              color: "#2C2C2C",
                              padding: "10px",
                              marginLeft: "6px",
                            }}
                          >
                            Uploaded Files
                            <Box sx={{ color: "#5995F7" }}>
                              ({fileData?.length})
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              padding: "10px",
                            }}
                          >
                            <CustomButton
                              variant="contained"
                              onClick={handleOpen}
                              className="workflow-button"
                              // style={{width:'165px !important'}}
                              sx={{
                                width: "165px !important",
                              }}
                            >
                              Make Workflow
                            </CustomButton>
                          </Box>
                          <WorkflowModal
                            isopenWorkflow={isopenWorkflow}
                            handleClose={handleClose}
                            fileData={fileData}
                          />
                        </Box>
                        <Box
                          sx={{
                            maxHeight: "400px",
                            overflowY:
                              fileData?.length && fileData.length > 6
                                ? "auto"
                                : "unset",
                            scrollbarWidth: "none",
                          }}
                        >
                          {fileData?.map((file, index) => {
                            return (
                              <Grid key={`file-${index}`}>
                                <Box
                                  sx={{
                                    width: "75vw",
                                    backgroundColor: "#f1f1f1",
                                    marginTop: "8px",
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px",
                                    border: "1px solid #F1F1F1",
                                    borderRadius: "5px",
                                    marginLeft: "12px",
                                    marginRight: "10px",
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      marginRight: "10px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {file.icon === PictureAsPdfOutlinedIcon && (
                                      <PictureAsPdfOutlinedIcon />
                                    )}
                                    {file.icon === ArticleOutlinedIcon && (
                                      <ArticleOutlinedIcon />
                                    )}
                                  </Box>
                                  <Link
                                    to={file.link}
                                    style={{
                                      color: "black",
                                      textDecoration: "none",
                                    }}
                                    target="_blank"
                                  >
                                    {file.file}
                                  </Link>
                                </Box>
                              </Grid>
                            );
                          })}
                        </Box>
                      </Box>
                    </Box>
                  </>
                ) : item.label === "Workflow" ? (
                  <>
                    <Box>
                      {/* <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      ></Grid> */}
                      <Box>{item.value}</Box>
                    </Box>
                  </>
                ) : item.label === "Status" ? (
                  <Box sx={{ position: "relative" }}>
                    <CircularProgress
                      variant="determinate"
                      value={showProgress ? 65 : 0}
                      size={180}
                      thickness={4}
                      style={{
                        color: "#2FC685",
                        boxShadow: "inset 0 0 0 16px #d1d1d1",
                        borderRadius: "50%",
                        strokeLinecap: "round",
                        transition: "all 2s ease-in-out",
                      }}
                    />
                    <Typography
                      variant="caption"
                      component="div"
                      color="textSecondary"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        fontSize: "14px",
                        fontWeight: 600,
                        transform: "translate(-50%, -50%)",
                        opacity: showProgress ? 1 : 0,
                        transition: "opacity 2s ease-in-out",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ) : (
                  <BasicPie chartData={chartData} />
                )}
                <Grid
                  style={{ position: "absolute", top: -67, right: 10 }}
                ></Grid>
              </Grid>
            )}
          </Paper>
        ))}
      </Box>
    </Grid>
  );
};

export default BoxContainer;
