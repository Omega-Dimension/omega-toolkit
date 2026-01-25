export interface MenuItemProps {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItemProps[];
}

export const menuItems: MenuItemProps[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Tools",
    children: [
      { label: "JSON Formatter", path: "/json" },
      { label: "Image Compress", path: "image-compress" },
      { label: "CSV to Excel", path: "/csv-excel" },
    ],
  },
  {
    label: "About",
    path: "/about",
  },
];

