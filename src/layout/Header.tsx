import {
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  useMediaQuery,
  alpha,
} from "@mui/material";
import { Nightlight, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { menuItems } from "../data/menuItems";
import { NavItem } from "../components/NavItem";

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLight = theme.palette.mode === "light";

  // ======================
  // State
  // ======================
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string[]>([]);

  // ======================
  // Refs (strict types)
  // ======================
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);

  // ======================
  // Handlers (memoized)
  // ======================

  const closeAllDropdowns = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const toggleDrawer = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(
    (path?: string) => {
      if (!path) return;
      navigate(path);
      setMobileOpen(false);
      setMobileExpanded([]);
    },
    [navigate],
  );

  const toggleMobileExpand = useCallback((label: string) => {
    setMobileExpanded((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  }, []);

  // ======================
  // Hamburger Animation
  // ======================

  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current || !line3Ref.current) return;

    const tl = gsap.timeline({
      defaults: { duration: 0.35, ease: "power3.out" },
    });

    if (mobileOpen) {
      tl.to(line2Ref.current, { opacity: 0 }, 0)
        .to(line1Ref.current, { y: 8, rotate: 45 }, 0)
        .to(line3Ref.current, { y: -8, rotate: -45 }, 0);
    } else {
      tl.to(line1Ref.current, { y: 0, rotate: 0 }, 0)
        .to(line3Ref.current, { y: 0, rotate: 0 }, 0)
        .to(line2Ref.current, { opacity: 1 }, 0);
    }

    return () => {
      tl.kill();
    };
  }, [mobileOpen]);

  // ======================
  // Stagger Animation for Mobile Menu
  // ======================

  useEffect(() => {
    if (!mobileOpen || !menuListRef.current) return;

    const items = Array.from(
      menuListRef.current.children,
    ) as HTMLElement[];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "power3.out",
        },
      );
    });

    return () => ctx.revert();
  }, [mobileOpen]);

  // ======================
  // Styles (DRY)
  // ======================

  const headerGlassStyle = {
    backdropFilter: "blur(20px)",
    backgroundColor: isLight
      ? "rgba(245, 247, 250, 0.95)"
      : "rgba(15, 23, 42, 0.95)",
    borderBottom: "1px solid",
    borderColor: isLight
      ? "rgba(0, 0, 0, 0.08)"
      : "rgba(255, 255, 255, 0.08)",
  };

  const hoverGlassEffect = {
    background: alpha(theme.palette.primary.main, 0.1),
  };

  // ======================
  // Render
  // ======================

  return (
    <>
      {/* Blur Overlay */}
      {!isMobile && activeDropdown && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1299,
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0,0,0,0.03)",
            pointerEvents: "none",
          }}
        />
      )}

      <Box
        component="header"
        onMouseLeave={!isMobile ? closeAllDropdowns : undefined}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1300,
          ...headerGlassStyle,
        }}
      >
        <Container maxWidth="xl">
          <Box
            component="nav"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: { xs: 64, sm: 72 },
            }}
          >
            {/* Logo */}
            <Box
              onClick={() => handleNavigate("/")}
              sx={{ cursor: "pointer" }}
            >
              <Typography fontWeight={700}>ToolBox</Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box
                component="ul"
                sx={{
                  display: "flex",
                  gap: 1,
                  listStyle: "none",
                }}
              >
                {menuItems.map((item) => (
                  <NavItem
                    key={item.label}
                    item={item}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    closeAllDropdowns={closeAllDropdowns}
                  />
                ))}
              </Box>
            )}

            {/* Right Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {!isMobile && (
                <IconButton>
                  <Nightlight />
                </IconButton>
              )}

              {isMobile && (
                <>
                  {/* Hamburger */}
                  <IconButton onClick={toggleDrawer}>
                    <Box sx={{ width: 24, height: 18, position: "relative" }}>
                      {[line1Ref, line2Ref, line3Ref].map((ref, i) => (
                        <Box
                          key={i}
                          ref={ref}
                          sx={{
                            position: "absolute",
                            width: "100%",
                            height: 2,
                            background: "currentColor",
                            top: i === 0 ? 0 : i === 1 ? 8 : undefined,
                            bottom: i === 2 ? 0 : undefined,
                          }}
                        />
                      ))}
                    </Box>
                  </IconButton>

                  {/* Drawer */}
                  <Drawer
                    anchor="right"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                  >
                    <Box sx={{ p: 2, mt: 5, width: 280 }}>
                      <List ref={menuListRef}>
                        {menuItems.map((item) => (
                          <Box key={item.label}>
                            <ListItem disablePadding>
                              <ListItemButton
                                onClick={() =>
                                  item.children
                                    ? toggleMobileExpand(item.label)
                                    : handleNavigate(item.path)
                                }
                                sx={{
                                  borderRadius: 2,
                                  "&:hover": hoverGlassEffect,
                                }}
                              >
                                <ListItemText primary={item.label} />
                                {item.children &&
                                  (mobileExpanded.includes(item.label) ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  ))}
                              </ListItemButton>
                            </ListItem>

                            {item.children && (
                              <Collapse
                                in={mobileExpanded.includes(item.label)}
                                timeout="auto"
                                unmountOnExit
                              >
                                {item.children.map((child) => (
                                  <ListItemButton
                                    key={child.label}
                                    sx={{ pl: 4 }}
                                    onClick={() =>
                                      handleNavigate(child.path)
                                    }
                                  >
                                    <ListItemText primary={child.label} />
                                  </ListItemButton>
                                ))}
                                <Divider />
                              </Collapse>
                            )}
                          </Box>
                        ))}
                      </List>
                    </Box>
                  </Drawer>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
