import { Box, Typography, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
}

export default function SidebarHeader({
  collapsed,
  onToggleCollapse,
}: SidebarHeaderProps) {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: collapsed ? 2 : 3,
        py: 2.5,
        minHeight: 64,
      }}
    >
      {!collapsed ? (
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Omega Toolkit
        </Typography>
      ) : (
        <Box sx={{ width: 36, height: 36, bgcolor: "primary.main" }} />
      )}

      {onToggleCollapse && (
        <IconButton onClick={onToggleCollapse} size="small">
          {collapsed ? (
            <ChevronRight fontSize="small" />
          ) : (
            <ChevronLeft fontSize="small" />
          )}
        </IconButton>
      )}
    </Box>
  );
}
