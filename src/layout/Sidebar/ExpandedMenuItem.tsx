import type { MenuItem } from "../../data/menuItems";
import { useMenuItemState } from "../../hooks/useMenuItemState";
import { Link as RouterLink } from "react-router-dom";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

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
  const { open, setOpen, arrowRef, hasChildren } = useMenuItemState(item);

  function handleClick() {
    if (hasChildren) setOpen(!open);
    else if (onClose) onClose();
  }

  if (hasChildren) {
    return (
      <>
        <ListItemButton onClick={handleClick} sx={{ pl: 2 + level * 2 }}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />

          <span ref={arrowRef} />
        </ListItemButton>

        <Collapse in={open}>
          {item.children!.map((child, idx) => (
            <RouterLink key={idx} to={child.path || "#"} onClick={onClose}>
              <ListItemButton sx={{ pl: 2 + (level + 1) * 2 }}>
                <ListItemIcon>{child.icon}</ListItemIcon>
                <ListItemText primary={child.label} />
              </ListItemButton>
            </RouterLink>
          ))}
        </Collapse>
      </>
    );
  }
  return (
    <RouterLink to={item.path || "#"} onClick={onClose}>
      <ListItemButton sx={{ pl: 2 + level * 2 }}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItemButton>
    </RouterLink>
  );
}
