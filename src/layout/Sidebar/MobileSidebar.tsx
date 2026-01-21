import { Drawer, Box } from "@mui/material";
import SidebarHeader from "./SidebarHeader";
import MenuList from "./MenuList";
import { sidebarMenuItems } from "../../data/menuItems";

interface MobileSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({
  mobileOpen,
  onClose,
}: MobileSidebarProps) {
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          overflow: "visible",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <SidebarHeader collapsed={false} />

        <MenuList
          items={sidebarMenuItems}
          collapsed={false}
          isMobile
          onClose={onClose}
          onItemHover={() => {}}
          onItemLeave={() => {}}
        />
      </Box>
    </Drawer>
  );
}
