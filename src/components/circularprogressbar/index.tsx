import { Box, CircularProgress, Typography } from "@mui/material";
import { CircularProgressProps } from '@mui/material/CircularProgress';

function CircularProgressWithLabel(
  props: CircularProgressProps & { loading: boolean; progress: number }
) {
  const { loading, progress, ...rest } = props;

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {loading && (
        <CircularProgress variant="determinate" value={progress} {...rest} />
      )}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {loading ? `${Math.round(progress)}%` : ""}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;