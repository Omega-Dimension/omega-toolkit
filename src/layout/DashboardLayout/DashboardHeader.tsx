import { Box, Typography } from "@mui/material";

export default function DashboardHeader() {
  return (
    <Box
      sx={{
        height: 64,
        display: "flex",
        alignItems: "center",
        px: 3,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6">Dashboard</Typography>
    </Box>
  );
}
