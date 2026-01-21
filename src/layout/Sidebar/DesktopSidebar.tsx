import { Drawer, Box } from "@mui/material";
import { useHoverCard } from "../../hooks/useHoverCard";
import SidebarHeader from "./SidebarHeader";
import MenuList from "./MenuList";
import { sidebarMenuItems } from "../../data/menuItems";
import HoverCard from "./HoverCard";

interface DesktopSidebarProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  onClose?: () => void;
}

export default function DesktopSidebar({
  collapsed,
  onToggleCollapse,
  onClose,
}: DesktopSidebarProps) {
  const {
    hoveredItem,
    anchorEl,
    handleItemHover,
    handleItemLeave,
    handleCardEnter,
    handleCardLeave,
  } = useHoverCard({ collapsed, isMobile: false });

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: collapsed ? 64 : 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? 64 : 240,
          overflow: "visible",
        },
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        onMouseLeave={handleItemLeave}
      >
        <SidebarHeader
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
        />

        <MenuList
          items={sidebarMenuItems}
          collapsed={collapsed}
          isMobile={false}
          onClose={onClose}
          onItemHover={handleItemHover}
          onItemLeave={handleItemLeave}
        />

        {hoveredItem && (
          <Box
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
            sx={{ position: "fixed", zIndex: 1300 }}
          >
            <HoverCard
              item={hoveredItem}
              anchorEl={anchorEl}
              onClose={onClose}
            />
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
