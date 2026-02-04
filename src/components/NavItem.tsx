import type { MenuItemProps } from "../data/menuItems";
import { Box, Typography, Stack } from "@mui/material";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface NavItemProps {
  item: MenuItemProps;
  activeDropdown: string | null;
  setActiveDropdown: (label: string | null) => void;
  closeAllDropdowns: () => void;
}

export function NavItem({
  item,
  activeDropdown,
  setActiveDropdown,
  closeAllDropdowns,
}: NavItemProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = activeDropdown === item.label;

  function show() {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    if (!item.children) return;

    showTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(item.label);
      setIsHovering(true);

      gsap.killTweensOf([dropdownRef.current, arrowRef.current]);

      gsap
        .timeline()
        .to(dropdownRef.current, {
          opacity: 1,
          scaleY: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.25,
          ease: "power2.out",
        })
        .to(
          arrowRef.current,
          {
            rotate: 180,
            duration: 0.2,
            ease: "power2.out",
          },
          0,
        );
    }, 100);
  }

  function hide() {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    if (!item.children) return;

    hideTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);

      gsap.killTweensOf([dropdownRef.current, arrowRef.current]);

      gsap
        .timeline()
        .to(dropdownRef.current, {
          opacity: 0,
          scaleY: 0.95,
          y: -10,
          pointerEvents: "none",
          duration: 0.2,
          ease: "power2.in",
        })
        .to(
          arrowRef.current,
          {
            rotate: 0,
            duration: 0.15,
            ease: "power2.in",
          },
          0,
        );
    }, 150);
  }

  function go(path: string) {
    navigate(path);
    closeAllDropdowns();
  }

  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isActive && !isHovering && item.children) {
      gsap.killTweensOf([dropdownRef.current, arrowRef.current]);
      gsap
        .timeline()
        .to(dropdownRef.current, {
          opacity: 1,
          scaleY: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.25,
          ease: "power2.out",
        })
        .to(
          arrowRef.current,
          {
            rotate: 180,
            duration: 0.2,
            ease: "power2.out",
          },
          0,
        );
    } else if (!isActive && isHovering && item.children) {
      hide();
    }
  }, [isActive, isHovering, item.children]);

  return (
    <Box
      component="li"
      sx={{
        position: "relative",
        listStyle: "none",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <Box
        onClick={() => item.path && go(item.path)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          px: 2.5,
          py: 1.5,
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: isActive ? "rgba(53, 164, 255, 0.1)" : "transparent",
          position: "relative",
          zIndex: 1101,
          minWidth: 100,
          justifyContent: "center",
          backdropFilter: "blur(10px)",
          border: "1px solid transparent",
          "&:hover": {
            backgroundColor: "rgba(53, 164, 255, 0.08)",
            color: "#35a4ff",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 20px rgba(53, 164, 255, 0.15)",
            border: "1px solid rgba(53, 164, 255, 0.2)",
          },
        }}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: 600,
            fontSize: "0.95rem",
            letterSpacing: "0.01em",
            color: isActive ? "#35a4ff" : "inherit",
            transition: "color 0.2s ease",
          }}
        >
          {item.label}
        </Typography>

        {item.children && (
          <Box
            ref={arrowRef}
            sx={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.3s ease",
              ml: 0.5,
            }}
          >
            <KeyboardArrowRight
              sx={{
                fontSize: 18,
                color: isActive ? "#35a4ff" : "inherit",
                opacity: 0.8,
              }}
            />
          </Box>
        )}
      </Box>

      {/* Dropdown Menu - Simplified Crystal Glass */}
      {item.children && (
        <Box
          ref={dropdownRef}
          sx={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%) scaleY(0.95)",
            opacity: 0,
            transformOrigin: "top center",
            pointerEvents: "none",
            width: "max-content",
            filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))",
          }}
        >
          {/* Simplified Crystal Card */}
          <Box
            sx={{
              position: "relative",
              p: 0,
              borderRadius: "16px",
              minWidth: 220,
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))",

              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(53, 164, 255, 0.1), rgba(33, 207, 255, 0.05))",
                borderRadius: "16px",
                opacity: 0.5,
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "16px",
                padding: "1px",
                background:
                  "linear-gradient(135deg, rgba(53, 164, 255, 0.3), rgba(255, 255, 255, 0.1))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
              },
            }}
          >
            {/* Subtle gradient overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
              }}
            />

            {/* Content */}
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Stack spacing={0.5} sx={{ p: 1.5 }}>
                {item.children.map((child) => (
                  <Box
                    key={child.label}
                    onClick={() => child.path && go(child.path)}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        backgroundColor: "rgba(53, 164, 255, 0.1)",
                        transform: "translateX(2px)",
                        "& .menu-item-text": {
                          color: "#35a4ff",
                        },
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      className="menu-item-text"
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "text.primary",
                        letterSpacing: "0.01em",
                        position: "relative",
                        zIndex: 1,
                        transition: "color 0.2s ease",
                      }}
                    >
                      {child.label}
                    </Typography>

                    {/* Simple hover effect */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "10px",
                        background:
                          "linear-gradient(135deg, rgba(53, 164, 255, 0.08), transparent)",
                        opacity: 0,
                        transition: "opacity 0.2s ease",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
