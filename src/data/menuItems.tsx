export interface MenuItemProps {
  label: string;
  path?: string;
  children?: MenuItemProps[];
  category?: string;
}

export interface ToolsProps {
  title: string;
  desc: string;
  tech: string[];
}

export interface ProfileProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}
export const menuItems: MenuItemProps[] = [
  { label: "Home", path: "/" },
  {
    label: "Tools",
    children: [
      {
        label: "File Tools",
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
        category: "media",
        children: [{ label: "MP3 Converter", path: "/media/mp3-converter" }],
      },
      {
        label: "Dev Tools",
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
      {
        label: "Color Tools",
        category: "color",
        children: [{ label: "Color Picker", path: "/colors/picker" }],
      },
    ],
  },
  { label: "About", path: "/about-us" },
];
export const tools: ToolsProps[] = [
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

export const profiles: ProfileProps[] = [
  {
    name: "Fento",
    role: "Frontend Developer",
    image: "/profiles/fento.jpg",
    bio: "React, MUI, Tailwind. Focused on clean UI and smooth UX.",
  },
  {
    name: "Alex",
    role: "Backend Developer",
    image: "/profiles/alex.jpg",
    bio: "Node.js, APIs, database design and performance.",
  },
  {
    name: "May",
    role: "UI/UX Designer",
    image: "/profiles/may.jpg",
    bio: "Design systems, accessibility, and product thinking.",
  },
];
