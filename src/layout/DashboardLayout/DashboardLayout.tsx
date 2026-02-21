import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Right Side */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <DashboardHeader />

        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}