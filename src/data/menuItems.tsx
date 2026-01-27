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

export interface ProfileProps {
  name : string;
  role : string;
  image : string;
  bio : string
}

export const menuItems: MenuItemProps[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Tools",
    children: [
      { label: "JSON Formatter", path: "/json-formatter" },
      { label : "JSON to Csv Files", path : "json-csv",},
      {label : "Csv to Json Files", path : "csv-json"},
      { label: "Image Compress", path: "image-compress" },
     
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