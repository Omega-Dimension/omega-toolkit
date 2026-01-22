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
        justifyContent: "center",
        px: collapsed ? 0 : 2,
        position: "relative",
        ...theme.mixins.toolbar,
        minHeight: 64,
      }}
    >
      {/* Logo and Title */}
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

      {/* Toggle Arrow - Positioned on the sidebar edge */}
      {onToggleCollapse && !isMobile && (
        <IconButton
          size="small"
          onClick={onToggleCollapse}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translate(50%, -50%)",
            zIndex: theme.zIndex.drawer + 2,
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
            width: 24,
            height: 24,
            minWidth: 24,
            minHeight: 24,
            p: 0.5,
            boxShadow: 1,
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          {collapsed ? (
            <ChevronRight fontSize="small" sx={{ width: 16, height: 16 }} />
          ) : (
            <ChevronLeft fontSize="small" sx={{ width: 16, height: 16 }} />
          )}
        </IconButton>
      )}
    </Box>
  );
}