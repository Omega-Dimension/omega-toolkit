import type { MenuItemProps } from "../data/menuItems";
import { Box, Paper, Typography, Stack, alpha } from "@mui/material";
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
      {/* Main Menu Item Button - Crystal Glass Effect */}
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
          backgroundColor: isActive 
            ? "rgba(255, 255, 255, 0.15)" 
            : "transparent",
          position: "relative",
          zIndex: 1101,
          minWidth: 100,
          justifyContent: "center",
          backdropFilter: "blur(10px)",
          border: "1px solid transparent",
          background: isActive 
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))" 
            : "transparent",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "12px",
            padding: "1px",
            background: isActive 
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))"
              : "transparent",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            opacity: isActive ? 1 : 0,
            transition: "opacity 0.3s ease",
          },
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            color: "#35a4ff",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 32px rgba(53, 164, 255, 0.2)",
            border: "1px solid rgba(53, 164, 255, 0.2)",
            background: "linear-gradient(135deg, rgba(53, 164, 255, 0.15), rgba(255, 255, 255, 0.1))",
            "&::before": {
              opacity: 1,
              background: "linear-gradient(135deg, rgba(53, 164, 255, 0.4), rgba(255, 255, 255, 0.1))",
            },
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

      {/* Dropdown Menu - Crystal Glass Card */}
      {item.children && (
        <Box
          ref={dropdownRef}
          sx={{
            position: "absolute",
            top: "calc(100% + 12px)",
            left: "50%",
            transform: "translateX(-50%) scaleY(0.95)",
            opacity: 0,
            transformOrigin: "top center",
            pointerEvents: "none",
            zIndex: 1100,
            width: "max-content",
            filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2))",
          }}
        >
          {/* Crystal Card Container */}
          <Box
            sx={{
              position: "relative",
              p: 0,
              borderRadius: "20px",
              minWidth: 240,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: `
                0 8px 32px 0 rgba(31, 38, 135, 0.37),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.05)
              `,
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "20px",
                padding: "1px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
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
                background: "linear-gradient(135deg, rgba(53, 164, 255, 0.05), rgba(255, 255, 255, 0.02))",
                opacity: 0.6,
              }}
            />
            
            {/* Content */}
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Stack spacing={0.5} sx={{ p: 2 }}>
                {item.children.map((child) => (
                  <Box
                    key={child.label}
                    onClick={() => child.path && go(child.path)}
                    sx={{
                      px: 2.5,
                      py: 1.25,
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(135deg, rgba(53, 164, 255, 0.1), rgba(255, 255, 255, 0.05))",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        borderRadius: "12px",
                      },
                      "&:hover": {
                        transform: "translateX(4px) translateY(-1px)",
                        "&::before": {
                          opacity: 1,
                        },
                        "& .menu-item-text": {
                          color: "#35a4ff",
                          fontWeight: 600,
                        },
                        "& .menu-item-highlight": {
                          width: "4px",
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    {/* Highlight bar */}
                    <Box
                      className="menu-item-highlight"
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "0px",
                        height: "20px",
                        background: "linear-gradient(180deg, #35a4ff, #21cfff)",
                        borderRadius: "0 4px 4px 0",
                        opacity: 0,
                        transition: "all 0.3s ease",
                      }}
                    />
                    
                    <Typography
                      component="span"
                      className="menu-item-text"
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "text.primary",
                        letterSpacing: "0.01em",
                        position: "relative",
                        zIndex: 1,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {child.label}
                    </Typography>
                    
                    {/* Hover glow effect */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "12px",
                        background: "radial-gradient(circle at center, rgba(53, 164, 255, 0.15), transparent 70%)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>
                ))}
              </Stack>
              
              {/* Decorative elements */}
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(53, 164, 255, 0.15), transparent 70%)",
                  filter: "blur(10px)",
                  opacity: 0.5,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -30,
                  left: -30,
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(33, 207, 255, 0.1), transparent 70%)",
                  filter: "blur(15px)",
                  opacity: 0.3,
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}