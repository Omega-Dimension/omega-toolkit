import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { ExpandMore, ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  sidebarMenuItems,
  drawerWidth,
  collapsedDrawerWidth,
} from "../data/menuItems";
import type { MenuItem } from "../data/menuItems";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Styled components
const HoverCard = styled(Paper)(({ theme }) => ({
  position: "fixed",
  left: "100%",
  top: 0,
  pointerEvents: "auto",
  marginLeft: theme.spacing(1),
  minWidth: 200,
  maxWidth: 280,
  padding: theme.spacing(0),
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.background.paper
      : theme.palette.background.paper,
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

const MenuLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  display: "block",
  width: "100%",
}));

interface SidebarItemProps {
  item: MenuItem;
  level?: number;
  onClose?: () => void;
  collapsed?: boolean;
  isHovered?: boolean;
  onHover?: (e: React.MouseEvent<HTMLElement>) => void;
  onLeave?: () => void;
}

function SidebarItem({
  item,
  level = 0,
  onClose,
  collapsed,
  isHovered,
  onHover,
  onLeave,
}: SidebarItemProps) {
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<number | null>(null);
  const location = useLocation();
  const theme = useTheme();
  const arrowRef = useRef<HTMLSpanElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const isActive =
    item.path === location.pathname ||
    item.children?.some((child) => child.path === location.pathname);
  const hasChildren = item.children && item.children.length > 0;

  useGSAP(() => {
    if (!arrowRef.current) return;
    
    gsap.to(arrowRef.current, {
      rotate: open ? 180 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [open]);

  // Auto-expand parent if child is active
  useEffect(() => {
    if (hasChildren && isActive && !open) {
      setOpen(true);
    }
  }, [hasChildren, isActive, open]);

  const handleClick = () => {
    if (hasChildren) {
      if (!collapsed) {
        setOpen(!open);
      }
    } else if (onClose) {
      onClose();
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (collapsed && hasChildren) {
      hoverTimer.current = window.setTimeout(() => {
        onHover?.(e);
      }, 150);
    } else if (!collapsed) {
      onHover?.(e);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    onLeave?.();
  };

  // Collapsed mode
  if (collapsed) {
    const iconButtonStyle = {
      width: 44,
      height: 44,
      mb: 0.5,
      backgroundColor: isActive
        ? alpha(theme.palette.primary.main, 0.12)
        : "transparent",
      color: isActive
        ? theme.palette.primary.main
        : theme.palette.text.secondary,
      border: `1px solid ${
        isActive
          ? theme.palette.primary.main
          : theme.palette.divider
      }`,
      "&:hover": {
        backgroundColor: isActive
          ? alpha(theme.palette.primary.main, 0.16)
          : alpha(theme.palette.action.hover, 0.04),
        borderColor: isActive
          ? theme.palette.primary.main
          : theme.palette.action.hover,
      },
    };

    if (hasChildren) {
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
          <IconButton
            onClick={handleClick}
            sx={iconButtonStyle}
            title={item.label}
          >
            {item.icon}
          </IconButton>

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

    // No children - simple link
    return (
      <Box
        sx={{
          position: "relative",
          mb: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton
          component={RouterLink}
          to={item.path || "#"}
          onClick={onClose}
          sx={iconButtonStyle}
          title={item.label}
        >
          {item.icon}
        </IconButton>

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

  // Expanded mode - with children
  if (hasChildren) {
    return (
      <>
        <Box ref={buttonContainerRef}>
          <MenuItemButton
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              pl: 2 + level * 2,
              py: 1.5,
              mx: 1,
              mb: 0.5,
              backgroundColor: isActive
                ? alpha(theme.palette.primary.main, 0.08)
                : "transparent",
              border: `1px solid ${
                isActive
                  ? theme.palette.primary.main
                  : "transparent"
              }`,
              "&:hover": {
                backgroundColor: isActive
                  ? alpha(theme.palette.primary.main, 0.12)
                  : alpha(theme.palette.action.hover, 0.04),
              },
            }}
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
        </Box>
        
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children?.map((child, index) => (
              <MenuLink key={index} to={child.path || "#"} onClick={onClose}>
                <MenuItemButton
                  sx={{
                    pl: 4 + level * 2,
                    py: 1.5,
                    mx: 1,
                    mb: 0.5,
                    backgroundColor: child.path === location.pathname
                      ? alpha(theme.palette.primary.main, 0.08)
                      : "transparent",
                    border: `1px solid ${
                      child.path === location.pathname
                        ? theme.palette.primary.main
                        : "transparent"
                    }`,
                    "&:hover": {
                      backgroundColor: child.path === location.pathname
                        ? alpha(theme.palette.primary.main, 0.12)
                        : alpha(theme.palette.action.hover, 0.04),
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: child.path === location.pathname
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                    }}
                  >
                    {child.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={child.label}
                    primaryTypographyProps={{
                      fontWeight: child.path === location.pathname ? 600 : 400,
                      color: child.path === location.pathname
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                    }}
                  />
                </MenuItemButton>
              </MenuLink>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  // Expanded mode - no children (simple link)
  return (
    <MenuLink to={item.path || "#"} onClick={onClose}>
      <MenuItemButton
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          pl: 2 + level * 2,
          py: 1.5,
          mx: 1,
          mb: 0.5,
          backgroundColor: isActive
            ? alpha(theme.palette.primary.main, 0.08)
            : "transparent",
          border: `1px solid ${
            isActive
              ? theme.palette.primary.main
              : "transparent"
          }`,
          "&:hover": {
            backgroundColor: isActive
              ? alpha(theme.palette.primary.main, 0.12)
              : alpha(theme.palette.action.hover, 0.04),
          },
        }}
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
      </MenuItemButton>
    </MenuLink>
  );
}

interface HoverCardContentProps {
  item: MenuItem;
  onClose?: () => void;
  anchorEl: HTMLElement | null;
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
    
    // Position the card
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
          {item.children?.map((child, index) => {
            const isChildActive = child.path === location.pathname;
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
                      isChildActive
                        ? theme.palette.primary.main
                        : "transparent"
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

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

function Sidebar({
  mobileOpen,
  onClose,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleItemHover = (item: MenuItem, element: HTMLElement) => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }

    hoverTimer.current = window.setTimeout(() => {
      if (item.children && item.children.length > 0) {
        setHoveredItem(item);
        setAnchorEl(element);
      }
    }, 100);
  };

  const handleItemLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }

    hoverTimer.current = window.setTimeout(() => {
      setHoveredItem(null);
      setAnchorEl(null);
    }, 150);
  };

  const handleCardEnter = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
  };

  const handleCardLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }

    hoverTimer.current = window.setTimeout(() => {
      setHoveredItem(null);
      setAnchorEl(null);
    }, 150);
  };

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
      {/* Header */}
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
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
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

      {/* Menu Items */}
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
        {sidebarMenuItems.map((item, index) => (
          <Box
            key={index}
            sx={{ position: "relative" }}
            onMouseEnter={(e) =>
              collapsed &&
              handleItemHover(item, e.currentTarget)
            }
            onMouseLeave={handleItemLeave}
          >
            <SidebarItem
              item={item}
              onClose={isMobile ? onClose : undefined}
              collapsed={collapsed}
              onHover={(e) => {
                if (collapsed) {
                  handleItemHover(item, e.currentTarget);
                }
              }}
              onLeave={handleItemLeave}
            />
          </Box>
        ))}
      </List>

      {/* Footer */}
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

      {/* Hover Card */}
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