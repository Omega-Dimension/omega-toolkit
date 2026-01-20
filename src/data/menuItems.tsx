import {
  Dashboard as DashboardIcon,
  Code as CodeIcon,
  Image as ImageIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

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
    label: "Development",
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
    label: "Media",
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

export const drawerWidth = 280;
export const collapsedDrawerWidth = 72;