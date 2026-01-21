import React, { useState, useEffect } from 'react';
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
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { sidebarMenuItems, drawerWidth, collapsedDrawerWidth } from '../data/menuItems';
import type { MenuItem } from '../data/menuItems';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Styled components for hover cards
const ChildrenCard = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  left: '100%',
  top: 0,
  marginLeft: theme.spacing(1),
  zIndex: 1300,
  minWidth: 200,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.mode === 'dark' ? 
    theme.palette.grey[900] : 
    theme.palette.background.paper,
  boxShadow: theme.shadows[8],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

interface SidebarItemProps {
  item: MenuItem;
  level?: number;
  onClose?: () => void;
  collapsed?: boolean;
  openParents?: boolean;
}

function SidebarItem({ item, level = 0, onClose, collapsed }: SidebarItemProps){

  const [open, setOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const arrowRef = useRef<HTMLSpanElement>(null);
  const isActive = item.path === location.pathname ||
    item.children?.some(child => child.path === location.pathname);
  const hasChildren = item.children && item.children.length > 0;


  useGSAP(() => {
    if(!arrowRef.current) return;

    gsap.to(arrowRef.current, {
      rotate : open ? 180 : 0,
      duration : 0.3,
      ease : "power2.out"
    })

  }, [open])

  // Auto-expand parent if child is active
  useEffect(() => {
    if (hasChildren && isActive && !open) {
      setOpen(true);
    }
  }, [hasChildren, isActive, open]);

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    } else if (onClose) {
      onClose();
    }
  };

  const handleMouseEnter = () => {
    if (collapsed && hasChildren) {
      setTimeout(() => {
        setShowCard(true);
      }, 150);
    }
  };

  const handleMouseLeave = () => {
    if (collapsed && hasChildren) {
      setShowCard(false);
    }
  };

  // Collapsed mode with card
  if (collapsed) {
    return (
      <Box
        sx={{
          position: 'relative',
          mb: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hasChildren ? (
          <IconButton
            onClick={handleClick}
            sx={{
              width: 40,
              height: 40,
              mb: 0.5,
              backgroundColor: isActive ? 'primary.main' : 'transparent',
              color: isActive ? 'primary.contrastText' : 'text.secondary',
              '&:hover': {
                backgroundColor: isActive ? 'primary.dark' : 'action.hover',
              },
            }}
            title={item.label}
          >
            {item.icon}
            <ChevronRight
              sx={{
                position: 'absolute',
                right: -4,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 16,
              }}
            />
          </IconButton>
        ) : (
          <IconButton
            component={RouterLink}
            to={item.path || '#'}
            onClick={onClose}
            sx={{
              width: 40,
              height: 40,
              mb: 0.5,
              backgroundColor: isActive ? 'primary.main' : 'transparent',
              color: isActive ? 'primary.contrastText' : 'text.secondary',
              '&:hover': {
                backgroundColor: isActive ? 'primary.dark' : 'action.hover',
              },
            }}
            title={item.label}
          >
            {item.icon}
          </IconButton>
        )}

        {/* Label under icon for collapsed mode */}
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.65rem',
            textAlign: 'center',
            color: 'text.secondary',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.2,
            px: 0.5,
          }}
        >
          {item.label.split(' ')[0]}
        </Typography>

        {/* Children Card for collapsed mode */}
        {showCard && hasChildren && (
          <ChildrenCard
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                px: 1,
                py: 1,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              {item.label}
            </Typography>
            <List disablePadding>
              {item.children?.map((child, index) => (
                <ListItemButton
                  key={index}
                  component={RouterLink}
                  to={child.path || '#'}
                  onClick={onClose}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    my: 0.5,
                    color: child.path === location.pathname ?
                      'primary.main' :
                      'text.primary',
                    fontWeight: child.path === location.pathname ? 600 : 400,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {child.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={child.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      noWrap: true,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </ChildrenCard>
        )}
      </Box>
    );
  }

  // Expanded mode
  return (
    <>
      {hasChildren ? (
        <>
          <ListItemButton
            onClick={handleClick}
            sx={{
              pl: 2 + level * 2,
              py: 1,
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
              backgroundColor: isActive ?
                alpha(theme.palette.primary.main, 0.08) :
                'transparent',
              '&:hover': {
                backgroundColor: isActive ?
                  alpha(theme.palette.primary.main, 0.12) :
                  'action.hover',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: isActive ? 'primary.main' : 'text.secondary',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
            />
            <span ref={arrowRef} style={{display : "flex"}}>
              <ExpandMore />
            </span>
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map((child, index) => (
                <SidebarItem
                  key={index}
                  item={child}
                  level={level + 1}
                  onClose={onClose}
                  collapsed={collapsed}
                  openParents={open}
                />
              ))}
            </List>
          </Collapse>
        </>
      ) : (
        <ListItemButton
          component={RouterLink}
          to={item.path || '#'}
          onClick={onClose}
          sx={{
            pl: 2 + level * 2,
            py: 1,
            borderRadius: 1,
            mx: 1,
            mb: 0.5,
            backgroundColor: isActive ? 'primary.main' : 'transparent',
            color: isActive ? 'primary.contrastText' : 'text.primary',
            '&:hover': {
              backgroundColor: isActive ? 'primary.dark' : 'action.hover',
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: isActive ? 'primary.contrastText' : 'text.secondary',
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontWeight: isActive ? 600 : 400,
              fontSize: '0.875rem',
              noWrap: true,
            }}
          />
        </ListItemButton>
      )}
    </>
  );
};

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

function Sidebar({mobileOpen, onClose, collapsed = false, onToggleCollapse}: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderDrawerContent = () => (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: collapsed ? 1 : 2,
          py: 2,
          minHeight: 64,
        }}
      >
        {!collapsed ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src="/logo.svg"
              alt="Logo"
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: 'primary.main',
                p: 0.5,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              DevTools
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box
              component="img"
              src="/logo.svg"
              alt="Logo"
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: 'primary.main',
                p: 0.5,
              }}
            />
          </Box>
        )}

        {/* Collapse Button */}
        {onToggleCollapse && (
          <IconButton
            onClick={onToggleCollapse}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'action.hover',
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
          overflowY: 'auto',
          overflowX: 'hidden',
          p: collapsed ? 1 : 2,
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'dark' ?
              'rgba(255, 255, 255, 0.2)' :
              'rgba(0, 0, 0, 0.1)',
            borderRadius: 3,
          },
        }}
      >
        {sidebarMenuItems.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            onClose={isMobile ? onClose : undefined}
            collapsed={collapsed}
          />
        ))}
      </List>

      {/* Footer */}
      {!collapsed && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              display: 'block',
              textAlign: 'center',
            }}
          >
            v1.0.0
          </Typography>
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
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            border: 'none',
            bgcolor: 'background.default',
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
        display: { xs: 'none', sm: 'block' },
        width: collapsed ? collapsedDrawerWidth : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? collapsedDrawerWidth : drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          bgcolor: 'background.default',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
        },
      }}
      open
    >
      {renderDrawerContent()}
    </Drawer>
  );
};

export default Sidebar;