import type { MenuItemProps } from "../data/menuItems";
import { Box, Paper, Typography, Stack, alpha } from "@mui/material";
import gsap from "gsap";
import { useRef } from "react";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface NavItemProps {
  item: MenuItemProps;
}

export function NavItem({ item }: NavItemProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  
  function show() {
    if (!item.children) return;
    gsap.timeline()
      .to(dropdownRef.current, {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        x: 0,
        pointerEvents: "auto",
        duration: 0.25,
        ease: "power2.out",
      })
      .to(arrowRef.current, {
        rotate: 90,
        duration: 0.2,
        ease: "power2.out",
      }, 0);
  }

  function hide() {
    if (!item.children) return;
    gsap.timeline()
      .to(dropdownRef.current, {
        opacity: 0,
        scaleX: 0.9,
        scaleY: 0.9,
        x: -10,
        pointerEvents: "none",
        duration: 0.2,
        ease: "power2.in",
      })
      .to(arrowRef.current, {
        rotate: 0,
        duration: 0.2,
        ease: "power2.in",
      }, 0);
  }

  function go(path: string) {
    navigate(path);
  }

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
      {/* Main Menu Item Button */}
      <Box
        onClick={() => item.path && go(item.path)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          px: 2.5,
          py: 1.75,
          borderRadius: 1.5,
          cursor: "pointer",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: "transparent",
          position: "relative",
          zIndex: 1101, // Higher than dropdown
          "&:hover": {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            color: "primary.main",
            transform: "translateY(-1px)",
          },
        }}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: 500,
            fontSize: "0.95rem",
            letterSpacing: "-0.01em",
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
              transition: "transform 0.2s ease",
            }}
          >
            <KeyboardArrowRight 
              sx={{ 
                fontSize: 18,
                color: "inherit",
                opacity: 0.7,
              }} 
            />
          </Box>
        )}
      </Box>

      {/* Dropdown Menu - Appears from right side */}
      {item.children && (
        <Box
          ref={dropdownRef}
          sx={{
            position: "absolute",
            top: "100%", // Changed from calc(100% - 8px) to ensure it's below
            left: 0,
            opacity: 0,
            transform: "scale(0.9) translateX(-10px)",
            transformOrigin: "top left",
            pointerEvents: "none",
            zIndex: 1100, // High z-index
            mt: 0.5, // Margin top to separate from parent
          }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 1.5,
              minWidth: 220,
              borderRadius: 2,
              backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.98),
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.divider, 0.1),
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
              overflow: "visible", // Changed from "hidden" to allow submenus to overflow
            }}
          >
            <Stack spacing={0.5}>
              {item.children.map((child) => (
                <SubMenuItem key={child.label} item={child} />
              ))}
            </Stack>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

// SubMenuItem Component
function SubMenuItem({ item }: { item: MenuItemProps }) {
  const submenuRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  function showSubmenu() {
    if (!item.children) return;
    gsap.to(submenuRef.current, {
      opacity: 1,
      x: 0,
      pointerEvents: "auto",
      duration: 0.2,
      ease: "power2.out",
    });
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotate: 90,
        duration: 0.15,
        ease: "power2.out",
      });
    }
  }

  function hideSubmenu() {
    if (!item.children) return;
    gsap.to(submenuRef.current, {
      opacity: 0,
      x: -8,
      pointerEvents: "none",
      duration: 0.15,
      ease: "power2.in",
    });
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotate: 0,
        duration: 0.15,
        ease: "power2.in",
      });
    }
  }

  function go(path: string) {
    navigate(path);
  }

  return (
    <Box
      sx={{
        position: "relative",
        "&:hover > .submenu-item-content": {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          color: "primary.main",
        },
      }}
      onMouseEnter={showSubmenu}
      onMouseLeave={hideSubmenu}
    >
      <Box
        onClick={() => item.path && go(item.path)}
        className="submenu-item-content"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 0.875,
          borderRadius: 1.25,
          cursor: "pointer",
          transition: "all 0.15s ease",
          position: "relative",
          zIndex: 1102, // Higher than submenu
          "&:hover": {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            color: "primary.main",
            paddingLeft: 2.5,
          },
        }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: "0.9rem",
            fontWeight: 400,
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
              transition: "transform 0.15s ease",
            }}
          >
            <KeyboardArrowRight 
              sx={{ 
                fontSize: 16,
                color: "inherit",
                opacity: 0.6,
              }} 
            />
          </Box>
        )}
      </Box>

      {/* Third-level Submenu */}
      {item.children && (
        <Box
          ref={submenuRef}
          sx={{
            position: "absolute",
            top: -8, // Adjust to align properly with parent item
            left: "100%",
            ml: 0.5,
            opacity: 0,
            transform: "translateX(-8px)",
            pointerEvents: "none",
            zIndex: 1103, // Highest z-index for submenu
            minWidth: 200,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 1.25,
              borderRadius: 1.5,
              backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.98),
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.divider, 0.1),
              backdropFilter: "blur(20px)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
              minWidth: 200,
            }}
          >
            <Stack spacing={0.25}>
              {item.children.map((child) => (
                <Box
                  key={child.label}
                  onClick={() => child.path && navigate(child.path)}
                  sx={{
                    px: 1.75,
                    py: 0.75,
                    borderRadius: 1,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                      transform: "translateX(2px)",
                    },
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 400,
                    }}
                  >
                    {child.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Box>
      )}
    </Box>
  );
}