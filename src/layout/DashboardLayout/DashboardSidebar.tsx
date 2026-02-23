import { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Divider,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Build as BuildIcon,
  Description as FileIcon,
  Image as ImageIcon,
  Movie as MediaIcon,
  Code as CodeIcon,
  Info as InfoIcon,
  ExpandLess,
  ExpandMore,
  ChevronRight,
} from "@mui/icons-material";
import { buildPath } from "../../utils/globalfunctions";

interface MenuItemProps {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  category?: string;
  children?: MenuItemProps[];
}

// Your menu items array
export const menuItems: MenuItemProps[] = [
  {
    label: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Tools",
    icon: <BuildIcon />,
    children: [
      {
        label: "File Tools",
        icon: <FileIcon />,
        category: "file",
        children: [
          { label: "JSON to CSV Files", path: "/file/json-csv" },
          { label: "CSV to JSON Files", path: "/file/csv-json" },
          { label: "Excel to CSV Files", path: "/file/excel-csv" },
          { label: "CSV to Excel Files", path: "/file/csv-excel" },
          {
            label: "Zawgyi ⇄ Unicode Converter",
            path: "/file/myanmar-font-converter",
          },
        ],
      },
      {
        label: "Image Tools",
        icon: <ImageIcon />,
        category: "image",
        children: [
          { label: "JPG to PNG Image", path: "/image/jpg-png" },
          { label: "Resize Image", path: "/image/resize-image" },
          { label: "Favicon Generator", path: "/image/favicon-generator" },
          { label: "Image Crop", path: "/image/image-crop" },
          { label: "Image to Base64", path: "/image/image-base64" },
          { label: "Base64 to Image", path: "/image/base64-image" },
          { label: "QR Scanner", path: "/image/qr-scanner" },
        ],
      },
      {
        label: "Media Tools",
        icon: <MediaIcon />,
        category: "media",
        children: [{ label: "MP3 Converter", path: "/media/mp3-converter" }],
      },
      {
        label: "Dev Tools",
        icon: <CodeIcon />,
        category: "dev",
        children: [
          { label: "JSON Formatter", path: "/dev/json-formatter" },
          { label: "Hash Generator", path: "/dev/hash-generator" },
          { label: "Base64 Tool", path: "/dev/base64-tool" },
          { label: "UUID Generator", path: "/dev/uuid-generator" },
          { label: "JWT Decoder", path: "/dev/jwt-decoder" },
          { label: "Regex Tester", path: "/dev/regex-tester" },
          { label: "URL Tools", path: "/dev/url-tool" },
        ],
      },
    ],
  },
  {
    label: "About",
    path: "/about-us",
    icon: <InfoIcon />,
  },
];

interface MenuItemComponentProps {
  item: MenuItemProps;
  depth?: number;
  onNavigate: (path: string) => void;
  currentPath: string;
}

const MenuItemComponent = ({
  item,
  depth = 0,
  onNavigate,
  currentPath,
}: MenuItemComponentProps) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = item.path === currentPath;
  const theme = useTheme();

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    } else if (item.path) {
      onNavigate(item.path);
    }
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        selected={isSelected}
        sx={{
          pl: depth * 2 + 2,
          py: 1,
          borderRadius: 1,
          mb: 0.5,
          backgroundColor: isSelected
            ? alpha(theme.palette.primary.main, 0.1)
            : "transparent",
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
          },
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.primary.main, 0.15),
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
            },
            "& .MuiListItemIcon-root": {
              color: theme.palette.primary.main,
            },
            "& .MuiListItemText-primary": {
              color: theme.palette.primary.main,
              fontWeight: 600,
            },
          },
        }}
      >
        {item.icon && (
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: isSelected ? theme.palette.primary.main : "inherit",
            }}
          >
            {item.icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{
            fontSize: depth === 0 ? "0.95rem" : "0.9rem",
            fontWeight: depth === 0 ? 500 : 400,
          }}
        />
        {hasChildren && (
          <>
            {open ? (
              <ExpandLess sx={{ fontSize: 20 }} />
            ) : (
              <ExpandMore sx={{ fontSize: 20 }} />
            )}
          </>
        )}
      </ListItemButton>

      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children?.map((child, index) => (
              <MenuItemComponent
                key={index}
                item={child}
                depth={depth + 1}
                onNavigate={onNavigate}
                currentPath={currentPath}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleNavigate = (path: string) => {
    navigate(buildPath("/dashboard", path));
  };

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        bgcolor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: theme.palette.text.primary }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          Tools & Utilities
        </Typography>
      </Box>

      {/* Menu Items */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          px: 2,
          py: 2,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: theme.palette.background.default,
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.palette.divider,
            borderRadius: "3px",
            "&:hover": {
              background: theme.palette.action.hover,
            },
          },
        }}
      >
        <List component="nav" disablePadding>
          {menuItems.map((item, index) => (
            <Box key={index}>
              {index > 0 && item.label !== "About" && (
                <Divider sx={{ my: 2 }} />
              )}
              <MenuItemComponent
                item={item}
                onNavigate={handleNavigate}
                currentPath={location.pathname}
              />
            </Box>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.default, 0.5),
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          v1.0.0
        </Typography>
      </Box>
    </Box>
  );
}
