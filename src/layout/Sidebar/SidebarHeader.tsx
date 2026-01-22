import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  isMobile: boolean;
}

export default function SidebarHeader({
  collapsed,
  onToggleCollapse,
  isMobile,
}: SidebarHeaderProps) {

  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom : 1,
        justifyContent: collapsed ? "center" : "space-between",
        px:2,
        ...theme.mixins.toolbar,
        minHeight: 64,
      }}
    >
      {!collapsed ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            component="img"
            src="/logo.svg"
            alt="Logo"
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              bgcolor: "primary.main",
              p: 0.5,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              letterSpacing: "-0.5px",
            }}
          >
            DevTools
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Box
            component="img"
            src="/logo.svg"
            alt="Logo"
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1,
              bgcolor: "primary.main",
              p: 0.5,
            }}
          />
        </Box>
      )}

      {onToggleCollapse && !isMobile && !collapsed && (
        <IconButton size="small" onClick={onToggleCollapse}>
          <ChevronLeft fontSize="small" />
        </IconButton>
      )}

      {onToggleCollapse && !isMobile && collapsed && (
        <IconButton size="small" onClick={onToggleCollapse}>
          <ChevronRight fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
