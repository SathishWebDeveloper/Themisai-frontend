import { AlertBox } from "@components/alertbox";
import BoxContainer from "@components/cardbox";
import { CustomPrimaryButton } from "@components/styled-components";
import WorkflowList from "@container/workflowlist";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { fetchMattersDetails } from "src/redux/service/mattersService";
import { AppDispatch } from "src/redux/store/store";
import { APP_CONFIG } from "src/utils/config";
const { API_BASE_URL } = APP_CONFIG;

const ViewMatter = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { id } = useParams();

  const mattersInfo = useSelector(
    (state: any) => state.matters.mattersDetailInfo
  );
  const user = useSelector((state: any) => state.login.userInfo);
  const { id: userId } = user?.userInfo;

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchMattersDetails(id));
    }
  }, [id, dispatch]);

  const data: any = [
    { label: "Status", value: mattersInfo?.status },
    { label: "Documents", value: "NewStatus" },
    {
      label: "File Import",
      value: "NewStatus",
    },
    {
      label: "Workflow",
      value: <WorkflowList setAlertMessage={setAlertMessage} />, 
    },
  ];

  const chartData: any = [
    { id: 0, value: 10, label: "pdf", color: "#15CF4E" },
    { id: 1, value: 15, label: "word", color: "#2223BC" },
    { id: 2, value: 20, label: "excel", color: "#DE65E3" },
  ];

  const fileData = Object.entries(
    mattersInfo?.resources ? mattersInfo.resources : 0
  ).map(([_, value]: [string, any]) => {
    return {
      file: value.split("/").pop(),
      date: "",
      icon: value.endsWith(".pdf")
        ? PictureAsPdfOutlinedIcon
        : ArticleOutlinedIcon,
      link: value,
    };
  });

  const handleFileUpload = async (userId: string, files: any) => {
    if (!files || files?.length === 0) return;
    const fileUploadEndpoint = `${API_BASE_URL}/upload/${userId}/${id}`;
    try {
      setLoading(true);
      const formData: FormData = new FormData();
      for (const file of files) {
        formData.append("files", file);
      }
      const response = await axios.post(fileUploadEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data: any) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      });
      if (response.status === 201) {
        dispatch(fetchMattersDetails(id));
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: any) => {
    const selectedFiles = Array.from(event.target.files);
    handleFileUpload(userId, selectedFiles);
  };

  useEffect(() => {
    if (progress >= 100) {
      setLoading(false);
    }
  }, [progress]);

  return (
    <>
      <Grid container spacing={0}>
        {alertMessage && (
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
        )}
        <Grid
          item
          xs={8}
          sm={8}
          md={12}
          lg={12}
          xl={12}
          style={{
            boxShadow:
              "box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
            padding: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "30px",
            }}
          >
            <CustomPrimaryButton
              variant="contained"
              onClick={() => navigate("/matters")}
            >
              back
            </CustomPrimaryButton>
          </div>
          <div>
            <BoxContainer
              width={"100%"}
              minHeight={"100px"}
              paddingBottom={"10px"}
              gap={"50px"}
              data={data}
              chartData={chartData}
              fileData={fileData}
              handleFileChange={handleFileChange}
              alertMessage={alertMessage}
              loading={loading}
              progress={progress}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewMatter;
