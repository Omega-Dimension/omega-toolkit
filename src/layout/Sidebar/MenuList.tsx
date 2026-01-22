import { Box, List } from "@mui/material";
import type { MenuItem } from "../../data/menuItems";
import ExpandedMenuItem from "./ExpandedMenuItem";
import CollapsedMenuItem from "./CollapsedMenuItem";

interface MenuListProps {
  items: MenuItem[];
  collapsed: boolean;
  isMobile: boolean;
  onClose?: () => void;
  onItemHover: (item: MenuItem, element: HTMLElement) => void;
  onItemLeave: () => void;
}

export default function MenuList({
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
      sx={{ flex: 1, overflowY: "auto", p: collapsed ? 2 : 2.5 }}
    >
      <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
        {items.map((item, index) => (
          <Box
            component="li"
            key={index}
            onMouseEnter={(e) =>
              collapsed && onItemHover(item, e.currentTarget)
            }
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
      </Box>
    </List>
  );
}
