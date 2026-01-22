import {
  Collapse,
  List,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import type { MenuItem } from "../../data/menuItems";
import { MenuItemButton, MenuLink, getMenuItemStyle } from "./styles";
import { useMenuItemState } from "../../hooks/useMenuItemState";

interface ExpandedMenuItemProps {
  item: MenuItem;
  level?: number;
  onClose?: () => void;
}

export default function ExpandedMenuItem({
  item,
  level = 0,
  onClose,
}: ExpandedMenuItemProps) {
  const theme = useTheme();
  const location = useLocation();
  const { open, setOpen, arrowRef, hasChildren, isActive } = useMenuItemState(
    item,
    false,
  );

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    } else if (onClose) {
      onClose();
    }
  };

  if (!hasChildren) {
    const isItemActive = isActive;
    return (
      <MenuLink to={item.path || "#"} onClick={onClose}>
        <MenuItemButton sx={getMenuItemStyle(theme, isItemActive, level)}>
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: isItemActive
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            sx={{
              fontWeight: isItemActive ? 600 : 400,
              color: isItemActive
                ? theme.palette.primary.main
                : theme.palette.text.primary,
            }}
          />
        </MenuItemButton>
      </MenuLink>
    );
  }

  return (
    <>
      <MenuItemButton
        onClick={handleClick}
        sx={getMenuItemStyle(theme, isActive, level)}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          sx={{
            fontWeight: isActive ? 600 : 400,
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.primary,
          }}
        />
        <span ref={arrowRef} style={{ display: "flex" }}>
          <ExpandMore />
        </span>
      </MenuItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children!.map((child, index) => {
            const childIsActive = child.path === location.pathname;
            return (
              <MenuLink key={index} to={child.path || "#"} onClick={onClose}>
                <MenuItemButton
                  sx={getMenuItemStyle(theme, childIsActive, level + 1)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: childIsActive
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                    }}
                  >
                    {child.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={child.label}
                    sx={{
                      fontWeight: childIsActive ? 600 : 400,
                      color: childIsActive
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                    }}
                  />
                </MenuItemButton>
              </MenuLink>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
