import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ textAlign: "center", py: 2, opacity: 0.6 }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} HelperHub
      </Typography>
    </Box>
  );
}
