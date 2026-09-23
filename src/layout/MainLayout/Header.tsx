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
  useMediaQuery,
  alpha,
} from "@mui/material";
import {
  Nightlight,
  LightMode,
  ExpandLess,
  ExpandMore,
  GitHub,
} from "@mui/icons-material";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { menuItems } from "../../data/menuItems";
import { NavItem } from "../../components/NavItem";
import { useThemeMode } from "../../hooks/useThemeMode";
import { buildPath } from "../../utils/globalfunctions";

// TODO: replace with your actual repository URL
const GITHUB_REPO_URL = "https://github.com/Omega-Dimension/omega-toolkit";

// Fired from anywhere (e.g. Hero "Explore Tools" button) to open the
// tools dropdown / mobile drawer from the Header itself.
export const OPEN_TOOLS_MENU_EVENT = "toolbox:open-tools-menu";

export default function Header() {
  const theme = useTheme();

  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLight = mode === "light";
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);
  const ticking = useRef(false);

  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);
  const desktopMenuRef = useRef<HTMLUListElement>(null);

  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState<string>("");

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location]);

  const closeAllDropdowns = useCallback(() => setActiveDropdown(null), []);
  const toggleDrawer = useCallback(() => setMobileOpen((prev) => !prev), []);
  const handleNavigate = useCallback(
    (path?: string) => {
      if (!path) return;
      navigate(buildPath("", path));
      setMobileOpen(false);
      setMobileExpanded([]);
    },
    [navigate],
  );

  const toggleMobileExpand = useCallback((key: string) => {
    setMobileExpanded((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  }, []);

  // Let other parts of the app (e.g. Hero's "Explore Tools" button)
  // open the first tools dropdown / mobile drawer without any prop drilling.
  useEffect(() => {
    const openToolsMenu = () => {
      if (isMobile) {
        setMobileOpen(true);
        return;
      }
      const firstWithChildren = menuItems.find((item) => item.children?.length);
      if (firstWithChildren) setActiveDropdown(firstWithChildren.label);
    };

    window.addEventListener(OPEN_TOOLS_MENU_EVENT, openToolsMenu);
    return () =>
      window.removeEventListener(OPEN_TOOLS_MENU_EVENT, openToolsMenu);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    if (!desktopMenuRef.current) return;

    const items = desktopMenuRef.current.children;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        },
      );
    }, desktopMenuRef);

    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current || !line3Ref.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.4, ease: "power3.inOut" },
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
    });

    return () => ctx.revert();
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen || !menuListRef.current) return;
    const items = Array.from(menuListRef.current.children) as HTMLElement[];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power3.out" },
      );
    });
    return () => ctx.revert();
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      const currentScroll = window.scrollY;

      if (ticking.current) return;

      ticking.current = true;

      window.requestAnimationFrame(() => {
        if (!headerRef.current) return;

        const direction = currentScroll > lastScroll.current ? "down" : "up";

        gsap.to(headerRef.current, {
          y: direction === "down" ? -headerRef.current.offsetHeight : 0,
          duration: 0.9,
          ease: "power2.out",
        });

        lastScroll.current = currentScroll;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerGlassStyle = {
    backdropFilter: "blur(20px)",
    backgroundColor: isLight
      ? "rgba(245, 247, 250, 0.95)"
      : "rgba(15, 23, 42, 0.95)",
    borderBottom: "1px solid",
    borderColor: isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)",
  };
  const hoverGlassEffect = useMemo(
    () => ({
      background: alpha(theme.palette.primary.main, 0.1),
    }),
    [theme.palette.primary.main],
  );

  const renderMobileItem = (
    item: (typeof menuItems)[number],
    keyPath: string,
    depth: number,
  ) => {
    const isExpanded = mobileExpanded.includes(keyPath);

    return (
      <Box key={keyPath}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() =>
              item.children
                ? toggleMobileExpand(keyPath)
                : handleNavigate(item.path)
            }
            sx={{
              pl: 2 + depth * 2,
              borderRadius: 2,
              "&:hover": hoverGlassEffect,
            }}
          >
            <ListItemText primary={item.label} />
            {item.children && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        {item.children && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            {item.children.map((child) =>
              renderMobileItem(
                child as (typeof menuItems)[number],
                `${keyPath}-${child.label}`,
                depth + 1,
              ),
            )}
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <>
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
        ref={headerRef}
        component="header"
        onMouseLeave={!isMobile ? closeAllDropdowns : undefined}
        sx={{ position: "sticky", top: 0, zIndex: 1300, ...headerGlassStyle }}
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
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              {/* Icon mark */}
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background:
                    "linear-gradient(135deg, #1cd4fe 0%, #0d92ff 100%)",
                  boxShadow: (theme) => `0 6px 16px ${alpha("#0d92ff", 0.35)}`,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "rotate(-6deg) scale(1.05)" },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.15rem",
                    color: "#0b1320",
                    lineHeight: 1,
                  }}
                >
                  Ω
                </Typography>
              </Box>

              {/* Wordmark */}
              <Box
                sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.15rem",
                    letterSpacing: "-0.02em",
                    background:
                      "linear-gradient(135deg, #1cd4fe 0%, #0d92ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Omega Toolkit
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "text.secondary",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  Everyday Dev Tools
                </Typography>
              </Box>
            </Box>
            {/* Desktop Navigation */}
            {!isMobile && (
              <Box
                ref={desktopMenuRef}
                component="ul"
                sx={{ display: "flex", gap: 1, listStyle: "none" }}
              >
                {menuItems.map((item) => (
                  <NavItem
                    key={item.label}
                    item={item}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    closeAllDropdowns={closeAllDropdowns}
                    selectedPath={selectedPath}
                  />
                ))}
              </Box>
            )}

            {/* Right Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                component="a"
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub"
              >
                <GitHub />
              </IconButton>

              {!isMobile && (
                <IconButton onClick={toggleTheme}>
                  {isLight ? <Nightlight /> : <LightMode />}
                </IconButton>
              )}

              {isMobile && (
                <>
                  <IconButton onClick={toggleTheme}>
                    {isLight ? <Nightlight /> : <LightMode />}
                  </IconButton>

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

                  <Drawer
                    anchor="right"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                  >
                    <Box sx={{ p: 2, mt: 5, width: 280 }}>
                      <List ref={menuListRef}>
                        {menuItems.map((item) =>
                          renderMobileItem(item, item.label, 0),
                        )}
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
