import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DashboardSidebar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "grey.900",
        color: "#fff",
        p: 2,
      }}
    >
      <List>
        <ListItemButton onClick={() => navigate("/dashboard")}>
          <ListItemText primary="Overview" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/dev/json-formatter")}>
          <ListItemText primary="JSON Formatter" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/image/resize-image")}>
          <ListItemText primary="Image Resize" />
        </ListItemButton>
      </List>
    </Box>
  );
}