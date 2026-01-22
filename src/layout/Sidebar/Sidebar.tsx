import { useRef } from "react";
import { Box, Drawer, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  sidebarMenuItems,
  drawerWidth,
  collapsedDrawerWidth,
} from "../../data/menuItems";
import SidebarHeader from "./SidebarHeader";
import MenuList from "./MenuList";
import HoverCardContent from "./HoverCardContent";
import { useHoverCard } from "../../hooks/useHoverCard";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  mobileOpen,
  onClose,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const sidebarRef = useRef<HTMLDivElement>(null);

  const {
    hoveredItem,
    anchorEl,
    handleItemHover,
    handleItemLeave,
    handleCardEnter,
    handleCardLeave,
  } = useHoverCard({ collapsed, isMobile, onClose });

  const drawerContent = (
    <Box
      ref={sidebarRef}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        borderRight: 1,
        borderColor: "divider",
        position: "relative",
        overflow: "visible",
      }}
      onMouseLeave={handleItemLeave}
    >
      <SidebarHeader
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
        isMobile={isMobile}
      />

      <MenuList
        items={sidebarMenuItems}
        collapsed={collapsed}
        isMobile={isMobile}
        onClose={onClose}
        onItemHover={handleItemHover}
        onItemLeave={handleItemLeave}
      />

  

      {hoveredItem && collapsed && !isMobile && (
        <Box
          onMouseEnter={handleCardEnter}
          onMouseLeave={handleCardLeave}
          sx={{
            position: "fixed",
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <HoverCardContent
            item={hoveredItem}
            onClose={onClose}
            anchorEl={anchorEl}
          />
        </Box>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
           
            width: drawerWidth,
            border: "none",
            bgcolor: "background.default",
            overflow: "visible",
            zIndex: theme.zIndex.drawer + 1,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        width: collapsed ? collapsedDrawerWidth : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedDrawerWidth : drawerWidth,
          border: "none",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflow: "visible",
          zIndex: theme.zIndex.drawer,
          position:"relative"
        },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
}
