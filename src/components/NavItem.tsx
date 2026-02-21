import { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  alpha,
  Fade,
  keyframes,
} from "@mui/material";
import type { MenuItemProps } from "../data/menuItems";
import {
  ExpandMore,
  ExpandLess,
  Folder,
  Image,
  MusicNote,
  Code,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

interface NavItemProps {
  item: MenuItemProps;
  activeDropdown: string | null;
  setActiveDropdown: (label: string | null) => void;
  closeAllDropdowns: () => void;
}

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case "file":
      return <Folder sx={{ fontSize: 20 }} />;
    case "image":
      return <Image sx={{ fontSize: 20 }} />;
    case "media":
      return <MusicNote sx={{ fontSize: 20 }} />;
    case "dev":
      return <Code sx={{ fontSize: 20 }} />;
    default:
      return null;
  }
};

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

export function NavItem({
  item,
  activeDropdown,
  setActiveDropdown,
  closeAllDropdowns,
}: NavItemProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);


  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const isLight = theme.palette.mode === "light";
  const hasChildren = Boolean(item.children);
  const isActive = activeDropdown === item.label;

  useEffect(() => {
  const dropdown = dropdownRef.current;
  if (!dropdown) return;

  const ctx = gsap.context(() => {
    if (isActive) {
      gsap.fromTo(
        dropdown,
        {
          opacity: 0,
          y: 8,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.1,
          ease: "power3.out",
        }
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
        }
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
      navigate(item.path);
      closeAllDropdowns();
    } else if (hasChildren) {
      setActiveDropdown(isActive ? null : item.label);
    }
  };

  const handleCategoryMouseEnter = (category?: string) => {
    setHoveredCategory(category || null);
  };

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
        sx={{
          color: isLight ? "text.primary" : "white",
          fontWeight: 600,
          fontSize: "0.95rem",
          height: 40,
          px: 2,
          borderRadius: "12px",
          textTransform: "none",
          position: "relative",
          transition: "all 0.3s ease",
          background: isActive
            ? alpha(theme.palette.primary.main, isLight ? 0.15 : 0.2)
            : "transparent",
          "&:hover": {
            background: alpha(theme.palette.primary.main, isLight ? 0.1 : 0.15),
            transform: "translateY(-1px)",
            "&::after": {
              width: "60%",
              opacity: 1,
            },
          },
      
        }}
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
              sx={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                mt: 1,
                minWidth: 640,
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid",
                borderColor: isLight ? alpha("#000", 0.1) : alpha("#fff", 0.1),
                background: isLight
                  ? alpha("#fff", 0.85)
                  : alpha("#0f172a", 0.85),
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                zIndex: 1301,
                display: "flex",
                p: 0,
              }}
            >
              {/* Main Categories Column */}
              <Box
                sx={{
                  p: 3,
                  borderRight: "1px solid",
                  borderColor: isLight
                    ? alpha("#000", 0.08)
                    : alpha("#fff", 0.08),
                  background: isLight
                    ? alpha("#f8fafc", 0.6)
                    : alpha("#1e293b", 0.6),
                }}
              >
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
                  <Box
                    key={category.label}
                    onMouseEnter={() =>
                      handleCategoryMouseEnter(category.category)
                    }
                    sx={{
                      p: 1.5,
                      borderRadius: "12px",
                      mb: 1,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      background:
                        hoveredCategory === category.category
                          ? alpha(
                              theme.palette.primary.main,
                              isLight ? 0.15 : 0.2,
                            )
                          : "transparent",
                      border: "1px solid",
                      borderColor:
                        hoveredCategory === category.category
                          ? alpha(theme.palette.primary.main, 0.3)
                          : "transparent",
                      "&:hover": {
                        background: alpha(
                          theme.palette.primary.main,
                          isLight ? 0.1 : 0.15,
                        ),
                        transform: "translateX(2px)",
                      },
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: isLight
                            ? alpha("#000", 0.05)
                            : alpha("#fff", 0.05),
                        }}
                      >
                        {getCategoryIcon(category.category)}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        {" "}
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
                            color: isLight
                              ? alpha("#000", 0.5)
                              : alpha("#fff", 0.5),
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
                ))}
              </Box>

              {/* Tools Grid */}

              <Box sx={{ flex: 1, p: 3 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1.9fr)",
                    gap: 2,
                  }}
                >
                  {item.children
                    ?.find((cat) => cat.category === hoveredCategory)
                    ?.children?.map((tool) => (
                      <Paper
                          className="tool-card"
                        key={tool.label}
                        onClick={() => {
                          if (tool.path) {
                            navigate(tool.path);
                            closeAllDropdowns();
                          }
                        }}
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: "16px",
                          cursor: "pointer",
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          background: isLight
                            ? alpha("#fff", 0.6)
                            : alpha("#1e293b", 0.6),
                          border: "1px solid",
                          borderColor: isLight
                            ? alpha("#000", 0.1)
                            : alpha("#fff", 0.1),
                          backdropFilter: "blur(10px)",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 12px 40px rgba(53, 164, 255, 0.2)",
                            borderColor: alpha(theme.palette.primary.main, 0.3),
                            background: isLight
                              ? alpha("#fff", 0.8)
                              : alpha("#1e293b", 0.8),
                            "&::before": {
                              opacity: 1,
                            },
                          },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background:
                              "linear-gradient(135deg, rgba(53, 164, 255, 0.1), rgba(255, 255, 255, 0.05))",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          },
                        }}
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
                            animation: `${shimmer} 3s infinite linear`,
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
                              color: isLight
                                ? alpha("#000", 0.6)
                                : alpha("#fff", 0.6),
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
                    ))}
                </Box>

                {/* Empty state when no category is hovered */}
                {!hoveredCategory && (
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
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
                          color: isLight
                            ? alpha("#000", 0.6)
                            : alpha("#fff", 0.6),
                        }}
                      >
                        Hover over a category to view tools
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Fade>
        </>
      )}
    </Box>
  );
}
