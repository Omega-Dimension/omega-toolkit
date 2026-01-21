import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Collapse,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  styled,
  alpha,
  Stack,
  type Theme,
} from "@mui/material";
import { ExpandMore, ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  sidebarMenuItems,
  drawerWidth,
  collapsedDrawerWidth,
} from "../data/menuItems";
import type { MenuItem } from "../data/menuItems";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// =====================
// Type Definitions
// =====================

interface UseHoverCardProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose?: () => void;
}

interface CollapsedMenuItemProps {
  item: MenuItem;
  onClose?: () => void;
  onHover?: (e: React.MouseEvent<HTMLElement>) => void;
  onLeave?: () => void;
}

interface ExpandedMenuItemProps {
  item: MenuItem;
  level?: number;
  onClose?: () => void;
}

interface HoverCardContentProps {
  item: MenuItem;
  onClose?: () => void;
  anchorEl: HTMLElement | null;
}

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  isMobile: boolean;
}

interface MenuListProps {
  items: MenuItem[];
  collapsed: boolean;
  isMobile: boolean;
  onClose?: () => void;
  onItemHover: (item: MenuItem, element: HTMLElement) => void;
  onItemLeave: () => void;
}

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

// =====================
// Styled Components

// =====================
const HoverCard = styled(Paper)(({ theme }) => ({
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

const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const MenuItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

const MenuLink = styled(RouterLink)({
  textDecoration: "none",
  color: "inherit",
  display: "block",
  width: "100%",
});

// =====================
// Custom Hooks
// =====================

const useHoverCard = ({ collapsed, isMobile, onClose }: UseHoverCardProps) => {
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const hoverTimer = useRef<number | null>(null);

  const handleItemHover = useCallback(
    (item: MenuItem, element: HTMLElement) => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);

      hoverTimer.current = window.setTimeout(() => {
        if (item.children?.length && collapsed && !isMobile) {
          setHoveredItem(item);
          setAnchorEl(element);
        }
      }, 100);
    },
    [collapsed, isMobile],
  );

  const handleItemLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);

    hoverTimer.current = window.setTimeout(() => {
      setHoveredItem(null);
      setAnchorEl(null);
    }, 150);
  }, []);

  const handleCardEnter = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  const handleCardLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);

    hoverTimer.current = window.setTimeout(() => {
      setHoveredItem(null);
      setAnchorEl(null);
    }, 150);
  }, []);

  return {
    hoveredItem,
    anchorEl,
    handleItemHover,
    handleItemLeave,
    handleCardEnter,
    handleCardLeave,
  };
};

const useMenuItemState = (item: MenuItem, collapsed?: boolean) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const arrowRef = useRef<HTMLSpanElement>(null);

  const hasChildren = Boolean(item.children?.length);
  const isActive = Boolean(
    item.path === location.pathname ||
    item.children?.some((child) => child.path === location.pathname),
  );

  // Auto-expand parent if child is active
  useEffect(() => {
    if (hasChildren && isActive && !open && !collapsed) {
      setOpen(true);
    }
  }, [hasChildren, isActive, open, collapsed]);

  // Animate arrow rotation
  useGSAP(() => {
    if (!arrowRef.current) return;

    gsap.to(arrowRef.current, {
      rotate: open ? 180 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [open]);

  return {
    open,
    setOpen,
    arrowRef,
    hasChildren,
    isActive,
  };
};

// =====================
// Helper Functions
// =====================

const getIconButtonStyle = (theme: Theme, isActive: boolean) => ({
  width: 44,
  height: 44,
  mb: 0.5,
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

const getMenuItemStyle = (
  theme: Theme,
  isActive: boolean,
  level: number = 0,
) => ({
  pl: 2 + level * 2,
  py: 1.5,
  mx: 1,
  mb: 0.5,
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

// =====================
// Components
// =====================

function CollapsedMenuItem({
  item,
  onClose,
  onHover,
  onLeave,
}: CollapsedMenuItemProps) {
  const theme = useTheme();
  const { hasChildren, isActive } = useMenuItemState(item, true);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (hasChildren) {
      hoverTimer.current = window.setTimeout(() => {
        onHover?.(e);
      }, 150);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    onLeave?.();
  };

  const handleClick = () => {
    if (!hasChildren && onClose) onClose();
  };

  return (
    <Box
      ref={buttonContainerRef}
      sx={{
        position: "relative",
        mb: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hasChildren ? (
        <IconButton
          onClick={handleClick}
          sx={getIconButtonStyle(theme, isActive)}
          title={item.label}
        >
          {item.icon}
        </IconButton>
      ) : (
        <IconButton
          component={RouterLink}
          to={item.path || "#"}
          onClick={handleClick}
          sx={getIconButtonStyle(theme, isActive)}
          title={item.label}
        >
          {item.icon}
        </IconButton>
      )}

      <Typography
        variant="caption"
        sx={{
          fontSize: "0.7rem",
          textAlign: "center",
          color: isActive ? "primary.main" : "text.secondary",
          fontWeight: isActive ? 600 : 400,
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          lineHeight: 1.2,
          px: 0.5,
        }}
      >
        {item.label}
      </Typography>
    </Box>
  );
}

function ExpandedMenuItem({ item, level = 0, onClose }: ExpandedMenuItemProps) {
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

  if (hasChildren) {
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
            primaryTypographyProps={{
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
              const childIsActive = Boolean(child.path === location.pathname);
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

  return (
    <MenuLink to={item.path || "#"} onClick={onClose}>
      <MenuItemButton sx={getMenuItemStyle(theme, isActive, level)}>
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
      </MenuItemButton>
    </MenuLink>
  );
}

function HoverCardContent({ item, onClose, anchorEl }: HoverCardContentProps) {
  const location = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useGSAP(() => {
    if (!cardRef.current || !anchorEl) return;

    const rect = anchorEl.getBoundingClientRect();

    gsap.set(cardRef.current, {
      x: -10,
      opacity: 0,
    });

    gsap.to(cardRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
    });

    cardRef.current.style.top = `${rect.top}px`;
    cardRef.current.style.left = `${rect.right + 8}px`;
  }, [anchorEl]);

  return (
    <HoverCard ref={cardRef}>
      <CardContent>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: "text.primary",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {item.icon}
          {item.label}
        </Typography>
        <Stack spacing={0.5}>
          {item.children!.map((child, index) => {
            const isChildActive = Boolean(child.path === location.pathname);
            return (
              <MenuLink key={index} to={child.path || "#"} onClick={onClose}>
                <MenuItemButton
                  sx={{
                    px: 2,
                    py: 1.5,
                    backgroundColor: isChildActive
                      ? alpha(theme.palette.primary.main, 0.08)
                      : "transparent",
                    color: isChildActive
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                    border: `1px solid ${
                      isChildActive ? theme.palette.primary.main : "transparent"
                    }`,
                    "&:hover": {
                      backgroundColor: isChildActive
                        ? alpha(theme.palette.primary.main, 0.12)
                        : alpha(theme.palette.action.hover, 0.04),
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isChildActive
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                    }}
                  >
                    {child.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={child.label}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: isChildActive ? 600 : 400,
                    }}
                  />
                </MenuItemButton>
              </MenuLink>
            );
          })}
        </Stack>
      </CardContent>
    </HoverCard>
  );
}

function SidebarHeader({
  collapsed,
  onToggleCollapse,
  isMobile,
}: SidebarHeaderProps) {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: collapsed ? 2 : 3,
        py: 2.5,
        minHeight: 64,
      }}
    >
      {!collapsed ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            component="img"
            src="/logo.svg"
            alt="Logo"
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              bgcolor: "primary.main",
              p: 0.5,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              letterSpacing: "-0.5px",
            }}
          >
            DevTools
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Box
            component="img"
            src="/logo.svg"
            alt="Logo"
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1,
              bgcolor: "primary.main",
              p: 0.5,
            }}
          />
        </Box>
      )}

      {onToggleCollapse && !isMobile && (
        <IconButton
          onClick={onToggleCollapse}
          size="small"
          sx={{
            color: "text.secondary",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight fontSize="small" />
          ) : (
            <ChevronLeft fontSize="small" />
          )}
        </IconButton>
      )}
    </Box>
  );
}

function MenuList({
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

function Sidebar({
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

  const renderDrawerContent = () => (
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

      {!collapsed && (
        <Box sx={{ p: 2.5, borderTop: 1, borderColor: "divider" }}>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              textAlign: "center",
              fontSize: "0.75rem",
            }}
          >
            v1.0.0
          </Typography>
        </Box>
      )}

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
            boxSizing: "border-box",
            width: drawerWidth,
            border: "none",
            bgcolor: "background.default",
            overflow: "visible",
            zIndex: theme.zIndex.drawer + 1,
          },
        }}
      >
        {renderDrawerContent()}
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
          boxSizing: "border-box",
          border: "none",
          bgcolor: "background.default",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflow: "visible",
          zIndex: theme.zIndex.drawer,
        },
      }}
      open
    >
      {renderDrawerContent()}
    </Drawer>
  );
}

export default Sidebar;
