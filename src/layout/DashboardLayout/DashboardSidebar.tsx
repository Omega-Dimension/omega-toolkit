import { useEffect, useState } from "react";
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
  Star,
  StarBorder,
} from "@mui/icons-material";
import { buildPath } from "../../utils/globalfunctions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleFavorite } from "../../store/favoriteSlice";

interface MenuItemProps {
  id?: string;
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
          {
            id: "d7e8d6d7-b1ec-421f-8caa-197c5ce9741c",
            label: "JSON to CSV Files",
            path: "/file/json-csv",
          },
          {
            id: "bdbf3554-2224-4f86-8d01-d47ab4b2a5e2",
            label: "CSV to JSON Files",
            path: "/file/csv-json",
          },
          {
            id: "eb29478c-9aaf-4872-b779-b6d5d59aa3fb",
            label: "Excel to CSV Files",
            path: "/file/excel-csv",
          },
          {
            id: "25155e76-8827-4add-939d-62e9ca79d577",
            label: "CSV to Excel Files",
            path: "/file/csv-excel",
          },
          {
            id: "4a9dfb56-66f1-4bd6-b636-58347ada243e",
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
          {
            id: "476c7f41-be1c-4a5f-be82-6787da81b235",
            label: "JPG to PNG Image",
            path: "/image/jpg-png",
          },
          {
            id: "a58ab084-5189-44ea-a604-cc488fcb8e9f",
            label: "Resize Image",
            path: "/image/resize-image",
          },
          {
            id: "f84a076e-d04f-484d-a367-a247b32317ac",
            label: "Favicon Generator",
            path: "/image/favicon-generator",
          },
          {
            id: "036771e4-ca5a-4d41-98cb-207198d34bca",
            label: "Image Crop",
            path: "/image/image-crop",
          },
          {
            id: "480e6c2a-4e65-45e9-aad9-c6a50a110416",
            label: "Image to Base64",
            path: "/image/image-base64",
          },
          {
            id: "a0c36a9d-9007-40c3-a0e5-03a803b7e508",
            label: "Base64 to Image",
            path: "/image/base64-image",
          },
          {
            id: "e903cd73-d92d-4e7e-a4ca-ffeecb213f6e",
            label: "QR Scanner",
            path: "/image/qr-scanner",
          },
        ],
      },
      {
        label: "Media Tools",
        icon: <MediaIcon />,
        category: "media",
        children: [
          {
            id: "ccdc1965-3868-4f6c-807c-0d715d21fd54",
            label: "MP3 Converter",
            path: "/media/mp3-converter",
          },
        ],
      },
      {
        label: "Dev Tools",
        icon: <CodeIcon />,
        category: "dev",
        children: [
          {
            id: "d90f2cf4-96f9-41b9-939d-102ecf38b37c",
            label: "JSON Formatter",
            path: "/dev/json-formatter",
          },
          {
            id: "926b3be2-4791-4e63-b166-f78c89d274b7",
            label: "Hash Generator",
            path: "/dev/hash-generator",
          },
          {
            id: "df18ec53-fe8a-4efe-9408-94733cd7a6ae",
            label: "Base64 Tool",
            path: "/dev/base64-tool",
          },
          {
            id: "e4a980b4-8894-4b6d-aab6-ce6fa4a2a1c5",
            label: "UUID Generator",
            path: "/dev/uuid-generator",
          },
          {
            id: "72f63a00-9249-4634-a7e8-0df8766f77ab",
            label: "JWT Decoder",
            path: "/dev/jwt-decoder",
          },
          {
            id: "9abacd67-92fc-4c10-acc0-f40f695bd9e0",
            label: "Regex Tester",
            path: "/dev/regex-tester",
          },
          {
            id: "d9b137e2-4780-44d8-9fdc-ce55d46c45b9",
            label: "URL Tools",
            path: "/dev/url-tool",
          },
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
  favorites: string[];
}

const MenuItemComponent = ({
  item,
  depth = 0,
  onNavigate,
  currentPath,
  favorites,
}: MenuItemComponentProps) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = item.path === currentPath;
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const isFavorite = item.id && favorites.includes(item.id);

  const isChildActive = item.children?.some(
    (child) => child.path === currentPath,
  );

  useEffect(() => {
    if (isChildActive) {
      setOpen(true);
    }
  }, [currentPath]);

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
        {item.id && (
          <Box
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleFavorite(item.id!));
            }}
            sx={{
              ml: "auto",
              display: "flex",
              alignItems: "center",
              color: isFavorite
                ? theme.palette.warning.main
                : theme.palette.action.disabled,
            }}
          >
            {item.id && (isFavorite ? <Star /> : <StarBorder />)}
          </Box>
        )}
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
          sx={{
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
                favorites={favorites}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

function getAllTools(items: MenuItemProps[]): MenuItemProps[] {
  let result: MenuItemProps[] = [];

  for (const item of items) {
    if (item.children) {
      result = result.concat(getAllTools(item.children));
    } else if (item.id) {
      result.push(item);
    }
  }

  return result;
}

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const favorites = useAppSelector((state) => state.favorite.items);

  const allTools = getAllTools(menuItems);

  const favoriteItems = allTools.filter((tool) => favorites.includes(tool.id!));

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
        {favoriteItems.length > 0 && (
          <Box sx={{ px: 2, pt: 2 }}>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary, px: 1 }}
            >
              Favorites
            </Typography>

            <List disablePadding>
              {favoriteItems.map((item) => (
                <MenuItemComponent
                  key={item.id}
                  item={item}
                  onNavigate={handleNavigate}
                  currentPath={location.pathname}
                  favorites={favorites}
                />
              ))}
            </List>

            <Divider sx={{ my: 2 }} />
          </Box>
        )}
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
                favorites={favorites}
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
