import { Box, List } from "@mui/material";
import type { MenuItem } from "../../data/menuItems";
import CollapsedMenuItem from "./CollapsedMenuItem";
import ExpandedMenuItem from "./ExpandedMenuItem";

interface MenuListProps {
  items: MenuItem[];
  collapsed: boolean;
  isMobile: boolean;
  onClose?: () => void;
  onItemHover: (item: MenuItem, element: HTMLElement) => void;
  onItemLeave: () => void;
}

export default function ({
  items,
  collapsed,
  isMobile,
  onClose,
  onItemHover,
  onItemLeave,
}: MenuListProps) {
  return (
    <List
      component="nav"
      sx={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        p: collapsed ? 2 : 2.5,
      }}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{ position: "relative" }}
          onMouseEnter={(e) => collapsed && onItemHover(item, e.currentTarget)}
          onMouseLeave={onItemLeave}
        >
          {collapsed ? (
            <CollapsedMenuItem
              item={item}
              onClose={isMobile ? onClose : undefined}
              onHover={(e) => onItemHover(item, e.currentTarget)}
              onLeave={onItemLeave}
            />
          ) : (
            <ExpandedMenuItem
              item={item}
              onClose={isMobile ? onClose : undefined}
            />
          )}
        </Box>
      ))}
    </List>
  );
}
