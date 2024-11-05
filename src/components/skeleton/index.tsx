import { Skeleton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

export const DataTableSkeleton: React.FC<{ columns: GridColDef[] }> = ({
  columns,
}) => {
  const skeletonRows = () => {
    return [...Array(5)].map((_, rowIndex) => (
      <tr key={rowIndex}>
        {columns.map((column) => (
          <td key={`${column.field}-${rowIndex}`}>
            <Skeleton variant="text" animation="wave" />
          </td>
        ))}
      </tr>
    ));
  };

  return <tbody>{skeletonRows()}</tbody>;
};
