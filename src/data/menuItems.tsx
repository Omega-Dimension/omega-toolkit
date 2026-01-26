export interface MenuItemProps {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItemProps[];
}

export interface ToolsProps {
  title : string;
  desc : string;
  tech : string[];
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




export const tools : ToolsProps[] = [
  {
    title: "Image Compressor",
    desc: "Reduce image size without losing quality, runs fully in browser.",
    tech: ["React", "Canvas", "Web Workers"],
  },
  {
    title: "JWT Decoder",
    desc: "Decode and inspect JWT tokens securely with no server calls.",
    tech: ["React", "TypeScript"],
  },
  {
    title: "File Converter",
    desc: "Convert documents and media formats directly in your browser.",
    tech: ["FFmpeg.wasm", "React"],
  },
  {
    title: "UUID Generator",
    desc: "Generate multiple types of unique IDs instantly.",
    tech: ["TypeScript"],
  },
];
