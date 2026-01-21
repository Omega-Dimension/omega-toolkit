import type { MenuItem } from "../../data/menuItems";
import { useMenuItemState } from "../../hooks/useMenuItemState";
import { Box, IconButton, useTheme, alpha, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface CollapsedMenuItemProps {
  item: MenuItem;
  onClose?: () => void;
  onHover?: (e: React.MouseEvent<HTMLElement>) => void;
  onLeave?: () => void;
}

export default function CollapsedMenuItem({
  item,
  onClose,
  onHover,
  onLeave,
}: CollapsedMenuItemProps) {
  const theme = useTheme();
  const { hasChildren, isActive } = useMenuItemState(item, true);

  function handleClick() {
    if (!hasChildren && onClose) onClose();
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {hasChildren ? (
        <IconButton
          onClick={handleClick}
          sx={{
            width: 44,
            height: 44,
            mb: 0.5,
            backgroundColor: isActive
              ? alpha(theme.palette.primary.main, 0.12)
              : "transparent",
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
          }}
        >
          {item.icon}
        </IconButton>
      ) : (
        <IconButton
          component={RouterLink}
          to={item.path || "#"}
          onClick={handleClick}
          sx={{
            width: 44,
            height: 44,
            mb: 0.5,
            backgroundColor: isActive
              ? alpha(theme.palette.primary.main, 0.12)
              : "transparent",
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
          }}
        >
          {item.icon}
        </IconButton>
      )}

      <Typography
        variant="caption"
        sx={{ fontSize: "0.7rem", textAlign: "center" }}
      >
        {item.label}
      </Typography>
    </Box>
  );
}
