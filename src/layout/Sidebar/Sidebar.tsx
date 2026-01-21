import { useTheme, useMediaQuery } from "@mui/material";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

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


  return (
    <div>
      {isMobile ? (
        <MobileSidebar mobileOpen={mobileOpen} onClose={onClose} />
      ) : (
        <DesktopSidebar
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
          onClose={onClose}
        />
      )}
    </div>
  );
}
