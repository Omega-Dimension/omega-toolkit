import { Box, List, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
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
  const theme = useTheme();

  return (
    <List
      component="nav"
      sx={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        p: collapsed ? 2 : 2.5,
        "&::-webkit-scrollbar": {
          width: 6,
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: alpha(theme.palette.text.primary, 0.2),
          borderRadius: 3,
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: alpha(theme.palette.text.primary, 0.3),
        },
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
