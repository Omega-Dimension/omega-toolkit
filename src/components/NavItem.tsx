import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  alpha,
  Fade,
} from "@mui/material";
import type { MenuItemProps } from "../data/menuItems";
import {
  ExpandMore,
  ExpandLess,
  Folder,
  Image,
  MusicNote,
  Code,
  Palette,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { buildPath } from "../utils/globalfunctions";
import {
  navButtonStyles,
  dropdownPaperStyles,
  categoryColumnStyles,
  categoryItemStyles,
  toolCardStyles,
  emptyStateStyles,
} from "../utils/ui.style";

interface NavItemProps {
  item: MenuItemProps;
  activeDropdown: string | null;
  setActiveDropdown: (label: string | null) => void;
  closeAllDropdowns: () => void;
  selectedPath?: string;
}

interface CategoryIconProps {
  category?: string;
}

interface ToolCardProps {
  tool: MenuItemProps;
  onClick: () => void;
}

type CategoryItemProps = {
  category: MenuItemProps;
  isHovered: boolean;
  onHover: () => void;
};

function CategoryIcon({ category }: CategoryIconProps) {
  const iconMap = {
    file: <Folder sx={{ fontSize: 20 }} />,
    image: <Image sx={{ fontSize: 20 }} />,
    media: <MusicNote sx={{ fontSize: 20 }} />,
    dev: <Code sx={{ fontSize: 20 }} />,
    color : <Palette sx={{fontSize : 20}} />
  };

  return category && category in iconMap
    ? iconMap[category as keyof typeof iconMap]
    : null;
}

function ToolCard({ tool, onClick }: ToolCardProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Paper
      className="tool-card"
      onClick={onClick}
      elevation={0}
      sx={toolCardStyles(theme, isLight)}
    >
      {/* Crystal effect overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)",
          opacity: isLight ? 0.1 : 0.05,
          animation: "shimmer 3s infinite linear",
          "@keyframes shimmer": {
            "0%": { transform: "translateX(-100%)" },
            "100%": { transform: "translateX(100%)" },
          },
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            color: isLight ? "text.primary" : "white",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tool.label}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: isLight ? alpha("#000", 0.6) : alpha("#fff", 0.6),
            lineHeight: 1.4,
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tool.path?.split("/").pop()?.replace("-", " ")}
        </Typography>
      </Box>
    </Paper>
  );
}

function CategoryItem({ category, isHovered, onHover }: CategoryItemProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Box
      onMouseEnter={onHover}
      sx={categoryItemStyles(theme, isLight, isHovered)}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isLight ? alpha("#000", 0.05) : alpha("#fff", 0.05),
          }}
        >
          <CategoryIcon category={category.category} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: isLight ? "text.primary" : "white",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {category.label}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: isLight ? alpha("#000", 0.5) : alpha("#fff", 0.5),
              display: "block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {category.children?.length || 0} tools
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function EmptyState() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Box sx={emptyStateStyles}>
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            background: alpha(theme.palette.primary.main, 0.1),
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.2),
          }}
        >
          <ExpandMore
            sx={{
              fontSize: 30,
              color: theme.palette.primary.main,
            }}
          />
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: isLight ? alpha("#000", 0.6) : alpha("#fff", 0.6),
          }}
        >
          Hover over a category to view tools
        </Typography>
      </Box>
    </Box>
  );
}

export function NavItem({
  item,
  activeDropdown,
  setActiveDropdown,
  closeAllDropdowns,
  selectedPath,
}: NavItemProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const isLight = theme.palette.mode === "light";
  const hasChildren = Boolean(item.children);
  const isActive = activeDropdown === item.label;

  const isSelected = useMemo(() => {
    if (item.path === selectedPath) return true;

    if (item.children) {
      return item.children.some((category) =>
        category.children?.some((tool) => tool.path === selectedPath),
      );
    }
    return false;
  }, [selectedPath, item]);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    const ctx = gsap.context(() => {
      if (isActive) {
        gsap.fromTo(
          dropdown,
          { opacity: 0, y: 8, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: "power3.out" },
        );

        const cards = dropdown.querySelectorAll(".tool-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.1,
          },
        );
      }
    }, dropdown);

    return () => ctx.revert();
  }, [isActive]);

  const handleMouseEnter = () => {
    if (hasChildren) {
      setActiveDropdown(item.label);
    } else {
      setActiveDropdown(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleClick = () => {
    if (item.path) {
      navigate(buildPath("", item.path));
      closeAllDropdowns();
    } else if (hasChildren) {
      setActiveDropdown(isActive ? null : item.label);
    }
  };

  const handleCategoryHover = (category?: string) => {
    setHoveredCategory(category || null);
  };

  const handleToolClick = (path?: string) => {
    if (path) {
      navigate(buildPath("", path));
      closeAllDropdowns();
    }
  };

  const hoveredCategoryData = item.children?.find(
    (cat) => cat.category === hoveredCategory,
  );

  return (
    <Box
      component="li"
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Navigation Button */}
      <Button
        onClick={handleClick}
        endIcon={
          hasChildren ? (
            isActive ? (
              <ExpandLess sx={{ fontSize: 18 }} />
            ) : (
              <ExpandMore sx={{ fontSize: 18 }} />
            )
          ) : null
        }
        sx={navButtonStyles(theme, isLight, isActive, isSelected)}
      >
        {item.label}
      </Button>

      {/* Dropdown Menu */}
      {hasChildren && isActive && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              height: 10,
              background: "transparent",
              zIndex: 1300,
            }}
          />

          <Fade in={isActive} timeout={200}>
            <Paper
              ref={dropdownRef}
              elevation={0}
              sx={dropdownPaperStyles(theme, isLight)}
            >
              <Box sx={categoryColumnStyles(theme, isLight)}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: isLight ? alpha("#000", 0.7) : alpha("#fff", 0.7),
                    mb: 2,
                    px: 1,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  Categories
                </Typography>
                {item.children?.map((category) => (
                  <CategoryItem
                    key={category.label}
                    category={category}
                    isHovered={hoveredCategory === category.category}
                    onHover={() => handleCategoryHover(category.category)}
                  />
                ))}
              </Box>

              <Box sx={{ flex: 1, p: 3 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1.9fr)",
                    gap: 2,
                  }}
                >
                  {hoveredCategoryData?.children?.map((tool) => (
                    <ToolCard
                      key={tool.label}
                      tool={tool}
                      onClick={() => handleToolClick(tool.path)}
                    />
                  ))}
                </Box>

                {!hoveredCategory && <EmptyState />}
              </Box>
            </Paper>
          </Fade>
        </>
      )}
    </Box>
  );
}
