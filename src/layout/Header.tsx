import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

interface HeaderProps {
  onMenuClick: () => void;
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export default function Header({
  onMenuClick,
  sidebarCollapsed = false,
  onToggleSidebar,
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        transition: theme.transitions.create(["margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "var(--background)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Sidebar Collapse/Expand Button */}
        {!isMobile && onToggleSidebar && (
          <IconButton color={"primary"} onClick={onToggleSidebar}>
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}

        {/* Page Title */}
        <Typography
          variant="h6"
          noWrap
          sx={{
            flexGrow: 1,
            color: "var(--foreground)",
            fontWeight: 600,
          }}
        >
          Dashboard
        </Typography>

        {/* Right side items */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Add your right side items here */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
