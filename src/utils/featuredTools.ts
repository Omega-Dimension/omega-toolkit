import type { MenuItemProps } from "../data/menuItems";

export interface ToolsProps {
  title: string;
  desc: string;
  tech: string[];
  path?: string;
}
export const getFeaturedTools = (menuItems: MenuItemProps[]): ToolsProps[] => {
  const featuredPaths = [
    "/file/json-csv",
    "/image/jpg-png", 
    "/dev/json-formatter",    
    "/dev/jwt-decoder"
  ];

  const findMenuItemByPath = (items: MenuItemProps[], targetPath: string): MenuItemProps | null => {
    for (const item of items) {
      if (item.path === targetPath) {
        return item;
      }
      if (item.children) {
        const found = findMenuItemByPath(item.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  };

  const getCategoryTech = (category?: string): string[] => {
    const techMap: Record<string, string[]> = {
      "file": ["React", "File API", "TypeScript"],
      "image": ["Canvas API", "React", "Web Workers"],
      "dev": ["TypeScript", "React", "Security"],
      "media": ["FFmpeg.wasm", "React"]
    };
    return category ? techMap[category] || ["Web Tool"] : ["Web Tool"];
  };

  const getDescription = (label: string, category?: string): string => {
    const descMap: Record<string, string> = {
      "JSON to CSV Files": "Convert JSON data to CSV format instantly in your browser.",
      "CSV to JSON Files": "Transform CSV files to JSON format with full customization.",
      "JPG to PNG Image": "Convert image formats without uploading to any server.",
      "Resize Image": "Resize images while maintaining quality and aspect ratio.",
      "JSON Formatter": "Beautify and validate JSON data with syntax highlighting.",
      "JWT Decoder": "Decode and inspect JWT tokens securely with no server calls.",
      "UUID Generator": "Generate multiple types of unique IDs instantly.",
      "URL Tools": "Parse, encode, and decode URL components with ease.",
      "MP3 Converter": "Convert audio files to MP3 format in the browser.",
    };
    return descMap[label] || `${label} - A powerful browser-based tool.`;
  };

  const tools: ToolsProps[] = [];

  featuredPaths.forEach(path => {
    const menuItem = findMenuItemByPath(menuItems, path);
    if (menuItem) {
      const findCategory = (items: MenuItemProps[], targetLabel: string): string | undefined => {
        for (const item of items) {
          if (item.children) {
            const child = item.children.find(child => 
              child.children?.some(grandChild => grandChild.path === path)
            );
            if (child) return child.category;
            
            const category = findCategory(item.children, targetLabel);
            if (category) return category;
          }
        }
        return undefined;
      };

      const category = findCategory(menuItems, menuItem.label);
      
      tools.push({
        title: menuItem.label,
        desc: getDescription(menuItem.label, category),
        tech: getCategoryTech(category),
        path: menuItem.path
      });
    }
  });

  return tools;
};