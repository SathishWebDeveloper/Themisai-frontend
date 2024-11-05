/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "@styles/scss/layouts/dashboard.scss";
import { DataTableProps } from "src/types/dashboard";

export default function DataTable({
  tableData,
  columns,
  className,
}: DataTableProps) {
  return (
    <div
      className={className ? className : "table-main"}
      style={{ height: "50vh", overflow: "auto" }}
    >
      <DataGrid
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        slots={{ toolbar: className === "matters-table" ? GridToolbar : null }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            disabletoolbarbutton: true,
          },
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  );
}
