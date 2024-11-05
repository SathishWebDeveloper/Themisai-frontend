/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import docs from "@assets/images/matters/documents-svgrepo-com.svg";
import Case from "@assets/images/matters/file-search-svgrepo-com.svg";
import clients from "@assets/images/matters/users-svgrepo-com.svg";
import Loader from "@components/loader";
import ModalComponent from "@components/uploadmodal";
import DataTable from "@components/table";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { Button, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import "@styles/scss/layouts/dashboard.scss";
import axios from "axios";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import BoxContainer from "src/components/cardbox";
import { fetchMattersForUser } from "src/redux/service/mattersService";
import { reset } from "src/redux/slice/mattersSlice";
import { AppDispatch } from "src/redux/store/store";
import { APP_CONFIG } from "src/utils/config";
const { API_BASE_URL } = APP_CONFIG;

const Matters = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const user = useSelector((state: any) => state.login.userInfo);
  const { id: userId } = user?.userInfo;
  const mattersInfo = useSelector((state: any) => state.matters.mattersInfo);
  const isFetching = useSelector((state: any) => state.matters.loading);
  const [open, setOpen] = useState<boolean>(false);
  const [matterId, setMatterId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleFileUpload = async (userId: string, files: any) => {
    if (!files || files?.length === 0) return;
    const fileUploadEndpoint = `${API_BASE_URL}/upload/${userId}/${matterId}`;
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
        setOpen(false);
        dispatch(fetchMattersForUser(userId));
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: any) => {
    const selectedFiles = Array.from(event.target.files);
    handleFileUpload(userId, selectedFiles);
  };

  const handleOpen = (matterId: string) => {
    setMatterId(matterId);
    setOpen(!open);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchMattersForUser(userId));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, userId]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 0 : prevProgress + 10
  //     );
  //   }, 800);
  //   return () => clearInterval(timer);
  // }, []);

  useEffect(() => {
    if (progress >= 100) {
      setLoading(false);
    }
  }, [progress]);

  const actionsData = [
    {
      id: 1,
      icon: CloudUploadOutlinedIcon,
      toolTip: "Upload",
      handleClick: (param: any) => handleOpen(param.row.id),
    },
    {
      id: 2,
      icon: LaunchOutlinedIcon,
      toolTip: "View",
      handleClick: (param: any) => navigate(param.row.id),
    },
    {
      id: 3,
      icon: SmartToyOutlinedIcon,
      toolTip: "AI",
      handleClick: (param: any) => alert(param.row.id),
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "id",
      renderHeader: () => <strong>S.No</strong>,
      width: 130,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "clientName",
      renderHeader: () => <strong>Client</strong>,
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "subjectName",
      renderHeader: () => <strong>Subject</strong>,
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams) => params.row.subject,
    },
    {
      field: "createdAt",
      renderHeader: () => <strong>Date</strong>,
      headerAlign: "center",
      width: 195,
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        const date = new Date(params.value);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "resourcesLength",
      renderHeader: () => <strong>Documents</strong>,
      headerAlign: "center",
      width: 195,
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <span>
            {params.row.resources
              ? Object.keys(params.row.resources).length
              : 0}
          </span>
        );
      },
    },
    {
      field: "Action",
      renderHeader: () => <strong>Action</strong>,
      headerAlign: "center",
      width: 365,
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "25px",
                marginTop: "10px",
              }}
            >
              {actionsData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Fragment key={`actions-${index}`}>
                    <Tooltip title={item.toolTip}>
                      <Icon
                        sx={{ cursor: "pointer" }}
                        onClick={() => item.handleClick(params)}
                      />
                    </Tooltip>
                  </Fragment>
                );
              })}
            </div>
          </>
        );
      },
    },
  ];

  const data: any = useMemo(() => {
    if (mattersInfo?.data) {
      return [
        {
          value: mattersInfo.data.totalMatters ?? 0,
          label: "Total Matters",
          imageSrc: Case,
        },
        {
          value: mattersInfo.data.totalClients ?? 0,
          label: "Total Clients",
          imageSrc: clients,
        },
        {
          value: mattersInfo.data.totalDocuments ?? 0,
          label: "Total Documents",
          imageSrc: docs,
        },
      ];
    }
    return [];
  }, [mattersInfo?.data]);

  return (
    <>
      <Grid container sx={{ display: "flex" }}>
        {isFetching && <Loader />}
        <Grid item xs={12}>
          <div>
            {/* BoxContainer */}
            <BoxContainer
              width={"360px"}
              minHeight={"152px"}
              data={data}
              isValue={true}
              handleFileChange={handleFileChange}
              loading={loading}
              progress={progress}
            />
          </div>
          <div style={{ textAlign: "right", marginRight: "3%", padding: 15 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              style={{ backgroundColor: "#212B36" }}
              onClick={() => navigate("/matters/new")}
            >
              New Matters
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {mattersInfo && mattersInfo.data && mattersInfo.data.matters && (
              <DataTable
                tableData={mattersInfo.data.matters}
                columns={columns}
                className={"matters-table"}
              />
            )}
          </div>
        </Grid>
      </Grid>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        handleFileChange={handleFileChange}
        loading={loading}
        progress={progress}
      />
    </>
  );
};

export default Matters;
