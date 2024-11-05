/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ConfirmDialog from "@components/deletemodal";
import DataTable from "@components/table";
import ViewModal from "@components/viewmodal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import { Box, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteWorkflowRequest,
  fetchMattersWorkFlow,
} from "src/redux/service/workflowServices";
import { AppDispatch } from "src/redux/store/store";

const WorkflowList = ({ setAlertMessage }: any) => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const workflowList = useSelector((state: any) => state.workflow.workflowInfo);

  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<any>(null);
  const [summaryContent, setSummaryContent] = useState<string>("");

  const fetchWorkFlowData = (id: any) => {
    dispatch(fetchMattersWorkFlow(id));
  };

  useEffect(() => {
    if (id) {
      fetchWorkFlowData(id);
    }
  }, [dispatch, id]);

  const handleClickCloseDelete = () => {
    setSelectedWorkflowId(null);
    setOpenDeleteDialog(false);
  };

  const handleClickOpenView = (summary: string) => {
    setSummaryContent(summary);
    setOpenViewModal(true);
  };

  const handleClickCloseView = () => {
    setOpenViewModal(false);
    setSummaryContent("");
  };

  const handleClickOpenDelete = (workflowId: any) => {
    setSelectedWorkflowId(workflowId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(
      deleteWorkflowRequest({
        id: selectedWorkflowId,
        callback: () => {
          fetchWorkFlowData(id);
          setAlertMessage("Workflow Successfully Deleted");
        },
      })
    );
    handleClickCloseDelete();
  };

  const actionsData = [
    {
      id: 1,
      icon: LaunchOutlinedIcon,
      toolTip: "Edit",
      handleClick: (param: any) =>
        handleClickOpenView(param.row.summary.content),
    },
    {
      id: 2,
      icon: DeleteOutlineIcon,
      toolTip: "Delete",
      handleClick: (param: any) => handleClickOpenDelete(param.row.id),
      // handleClick: (param: any) =>
      //   handleClickOpenView(param.row.summary.content),
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "id",
      renderHeader: () => <strong>S.No</strong>,
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        workflowList.findIndex((item: any) => item.id === params.id) + 1,
    },
    {
      field: "title",
      renderHeader: () => <strong>Workflow Title</strong>,
      width: 190,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdAt",
      renderHeader: () => <strong>Date of Creation</strong>,
      headerAlign: "center",
      width: 190,
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
      field: "resources",
      renderHeader: () => <strong>Total Documents</strong>,
      headerAlign: "center",
      width: 190,
      align: "center",
    },
    {
      field: "resources",
      renderHeader: () => <strong>Workflow Documents</strong>,
      headerAlign: "center",
      width: 190,
      align: "center",
    },
    {
      field: "Action",
      renderHeader: () => <strong>Action</strong>,
      headerAlign: "center",
      width: 290,
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
              marginTop: "10px",
              "& .css-18jtgnf .MuiDataGrid-columnHeader:focus, .css-18jtgnf .MuiDataGrid-cell:focus ":
                {
                  outline: "transparent !important",
                },
              "& .css-qcqlck-MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                border: "1px solid transparent !important",
              },
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
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <ViewModal
        open={openViewModal}
        handleClose={handleClickCloseView}
        summaryContent={summaryContent}
      />
      <ConfirmDialog
        open={openDeleteDialog}
        handleClose={handleClickCloseDelete}
        handleConfirm={handleConfirmDelete}
      />
      <Box
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          display: "flex",
          color: "#2C2C2C",
          padding: "10px",
          marginLeft: "6px",
        }}
      >
        Work Flow
      </Box>
      {workflowList && (
        <DataTable
          tableData={workflowList}
          columns={columns}
          className={"workflow-table"}
        />
      )}
    </>
  );
};

export default WorkflowList;
