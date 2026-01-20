import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Collapse,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  Code as CodeIcon,
  Image as ImageIcon,
  Home as HomeIcon,
  ChevronLeft,
  Menu as MenuIcon,
} from "@mui/icons-material";

export const drawerWidth = 280;

export interface MenuItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

export const sidebarMenuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    label: "Development Tools",
    icon: <CodeIcon />,
    children: [
      {
        label: "JSON Formatter",
        path: "/tools/json",
        icon: <CodeIcon />,
      },
      {
        label: "Base64 Encoder/Decoder",
        path: "/tools/base64",
        icon: <CodeIcon />,
      },
      {
        label: "Color Converter",
        path: "/tools/color",
        icon: <CodeIcon />,
      },
    ],
  },
  {
    label: "Media Tools",
    icon: <ImageIcon />,
    children: [
      {
        label: "Image Compressor",
        path: "/tools/image/compress",
        icon: <ImageIcon />,
      },
      {
        label: "Format Converter",
        path: "/tools/image/convert",
        icon: <ImageIcon />,
      },
      {
        label: "QR Code Generator",
        path: "/tools/qr-code",
        icon: <ImageIcon />,
      },
    ],
  },
  {
    label: "Documentation",
    icon: <HomeIcon />,
    path: "/docs",
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

interface SidebarItemProps {
  item: MenuItem;
  level?: number;
  onClose?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, level = 0, onClose }) => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const theme = useTheme();
  
  const isActive = item.path === location.pathname || 
    item.children?.some(child => child.path === location.pathname);

  const handleClick = () => {
    if (item.children) {
      setOpen(!open);
    } else if (onClose) {
      onClose();
    }
  };

  const itemContent = (
    <>
      {item.icon && (
        <ListItemIcon sx={{ 
          minWidth: 40,
          color: isActive ? theme.palette.primary.main : 'inherit',
        }}>
          {item.icon}
        </ListItemIcon>
      )}
      <ListItemText 
        primary={item.label}
        primaryTypographyProps={{
          fontWeight: isActive ? 600 : 400,
          fontSize: '0.875rem',
        }}
      />
      {item.children && (
        open ? <ExpandLess /> : <ExpandMore />
      )}
    </>
  );

  if (item.children) {
    return (
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
              theme.palette.mode === 'dark' ? 
                'rgba(144, 202, 249, 0.08)' : 
                'rgba(33, 150, 243, 0.04)' : 
              'transparent',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? 
                'rgba(144, 202, 249, 0.12)' : 
                'rgba(33, 150, 243, 0.08)',
            },
          }}
        >
          {itemContent}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child, index) => (
              <SidebarItem 
                key={index} 
                item={child} 
                level={level + 1}
                onClose={onClose}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
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
        backgroundColor: isActive ? 
          theme.palette.primary.main : 
          'transparent',
        color: isActive ? 
          theme.palette.primary.contrastText : 
          'inherit',
        '&:hover': {
          backgroundColor: isActive ? 
            theme.palette.primary.dark : 
            theme.palette.mode === 'dark' ? 
              'rgba(255, 255, 255, 0.08)' : 
              'rgba(0, 0, 0, 0.04)',
        },
        transition: 'all 0.2s ease',
      }}
    >
      {itemContent}
    </ListItemButton>
  );
};

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Toolbar 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="img"
            src="/logo.svg"
            alt="Logo"
            sx={{ 
              width: 32, 
              height: 32,
              borderRadius: 1,
              backgroundColor: theme.palette.primary.main,
              p: 0.5,
            }}
          />
          <Typography variant="h6" fontWeight={700} sx={{ color: theme.palette.primary.main }}>
            DevTools
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={onClose} size="small">
            <ChevronLeft />
          </IconButton>
        )}
      </Toolbar>

      {/* Menu Items */}
      <List 
        component="nav" 
        sx={{ 
          flex: 1, 
          overflowY: 'auto',
          p: 1,
          '&::-webkit-scrollbar': {
            width: 4,
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'dark' ? 
              'rgba(255, 255, 255, 0.2)' : 
              'rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
          },
        }}
      >
        {sidebarMenuItems.map((item, index) => (
          <SidebarItem 
            key={index} 
            item={item} 
            onClose={isMobile ? onClose : undefined}
          />
        ))}
      </List>

      {/* Footer */}
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
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            border: 'none',
            background: theme.palette.mode === 'dark' ? 
              'linear-gradient(195deg, #42424a, #191919)' : 
              'linear-gradient(195deg, #ffffff, #f8f9fa)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            border: 'none',
            background: theme.palette.mode === 'dark' ? 
              'linear-gradient(195deg, #42424a, #191919)' : 
              'linear-gradient(195deg, #ffffff, #f8f9fa)',
            boxShadow: theme.palette.mode === 'dark' ? 
              'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px' : 
              'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}