// components/sidebar/styles.ts
import { alpha, styled, type Theme } from "@mui/material/styles";
import { ListItemButton, Paper, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const HoverCardRoot = styled(Paper)(({ theme }) => ({
  position: "fixed",
  left: "100%",
  top: 0,
  pointerEvents: "auto",
  marginLeft: theme.spacing(1),
  minWidth: 200,
  maxWidth: 280,
  padding: 0,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  zIndex: theme.zIndex.drawer + 2,
  overflow: "hidden",
  transformOrigin: "left center",
}));

export const HoverCardContentRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const MenuItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

export const MenuLink = styled(RouterLink)({
  textDecoration: "none",
  color: "inherit",
  display: "block",
  width: "100%",
});

export const getIconButtonStyle = (theme: Theme, isActive: boolean) => ({
  width: 44,
  height: 44,
  marginBottom: theme.spacing(0.5),
  backgroundColor: isActive
    ? alpha(theme.palette.primary.main, 0.12)
    : "transparent",
  color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
  border: `1px solid ${
    isActive ? theme.palette.primary.main : theme.palette.divider
  }`,
  "&:hover": {
    backgroundColor: isActive
      ? alpha(theme.palette.primary.main, 0.16)
      : alpha(theme.palette.action.hover, 0.04),
    borderColor: isActive
      ? theme.palette.primary.main
      : theme.palette.action.hover,
  },
});

export const getMenuItemStyle = (
  theme: Theme,
  isActive: boolean,
  level: number = 0,
) => ({
  paddingLeft: 2 + level * 2,
  paddingY: 1.5,
  marginX: 1,
  marginBottom: 0.5,
  backgroundColor: isActive
    ? alpha(theme.palette.primary.main, 0.08)
    : "transparent",
  border: `1px solid ${isActive ? theme.palette.primary.main : "transparent"}`,
  "&:hover": {
    backgroundColor: isActive
      ? alpha(theme.palette.primary.main, 0.12)
      : alpha(theme.palette.action.hover, 0.04),
  },
});
