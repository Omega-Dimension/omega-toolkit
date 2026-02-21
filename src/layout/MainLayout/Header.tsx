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
  Button,
} from "@mui/material";
import {
  Nightlight,
  LightMode,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { menuItems } from "../../data/menuItems";
import { NavItem } from "../../components/NavItem";
import { useThemeMode } from "../../hooks/useThemeMode";
import { useModal } from "../../hooks/useModal";
import LoginModal from "../../auth/LoginModal";

export default function Header() {
  const theme = useTheme();
  const { openModal } = useModal();

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

  const closeAllDropdowns = useCallback(() => setActiveDropdown(null), []);
  const toggleDrawer = useCallback(() => setMobileOpen((prev) => !prev), []);
  const handleNavigate = useCallback(
    (path?: string) => {
      if (!path) return;
      navigate(path);
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
            <Box onClick={() => handleNavigate("/")} sx={{ cursor: "pointer" }}>
              <Typography fontWeight={700}>ToolBox</Typography>
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
                  />
                ))}
              </Box>
            )}

            {/* Right Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {!isMobile && (
                <>
                  <IconButton onClick={toggleTheme}>
                    {isLight ? <Nightlight /> : <LightMode />}
                  </IconButton>

                  <Button
                    onClick={() => openModal(<LoginModal />)}
                    variant="contained"
                    size="small"
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${alpha(
                        theme.palette.primary.main,
                        0.8,
                      )})`,
                      boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 6px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                      },
                    }}
                  >
                    Login
                  </Button>
                </>
              )}

              {isMobile && (
                <>
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
