import React, { useRef } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import type { MenuItem } from "../../data/menuItems";
import { getIconButtonStyle } from "./styles";
import { Link as RouterLink } from "react-router-dom";
import { useMenuItemState } from "../../hooks/useMenuItemState";


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
  const hoverTimer = useRef<number | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!hasChildren) return;
    hoverTimer.current = window.setTimeout(() => {
      onHover?.(e);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    onLeave?.();
  };

  const handleClick = () => {
    if (!hasChildren && onClose) {
      onClose();
    }
  };

  const iconButton = (
    <IconButton
      onClick={handleClick}
      sx={getIconButtonStyle(theme, isActive)}
      title={item.label}
      component={hasChildren ? "button" : RouterLink}
      {...(!hasChildren && { to: item.path || "#" })}
    >
      {item.icon}
    </IconButton>
  );

  return (
    <Box
      sx={{
        position: "relative",
        mb: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {iconButton}
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.7rem",
          textAlign: "center",
          color: isActive ? "primary.main" : "text.secondary",
          fontWeight: isActive ? 600 : 400,
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          lineHeight: 1.2,
          px: 0.5,
        }}
      >
        {item.label}
      </Typography>
    </Box>
  );
}
