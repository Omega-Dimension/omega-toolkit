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
import { menuItems } from "../data/menuItems";
import { NavItem } from "../components/NavItem";
import {
  Nightlight,
  Menu,
  Close,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedItems, setMobileExpandedItems] = useState<string[]>([]);
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);
  const line1Ref = useRef(null);
const line2Ref = useRef(null);
const line3Ref = useRef(null);
  const menuListRef = useRef(null);

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  const isLight = theme.palette.mode === "light";

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileItemClick = (path?: string) => {
    if (path) {
      navigate(path);
      setMobileOpen(false);
      setMobileExpandedItems([]);
    }
  };

  const handleMobileExpandClick = (label: string) => {
    setMobileExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  useEffect(() => {
  if (!line1Ref.current) return;

  const tl = gsap.timeline({ defaults: { duration: 0.35, ease: "power3.out" } });

  if (mobileOpen) {
    tl.to(line2Ref.current, { opacity: 0 }, 0)
      .to(
        line1Ref.current,
        {
          y: 8,
          rotate: 45,
          transformOrigin: "center",
        },
        0
      )
      .to(
        line3Ref.current,
        {
          y: -8,
          rotate: -45,
          transformOrigin: "center",
        },
        0
      );
  } else {
    tl.to(line1Ref.current, { y: 0, rotate: 0 }, 0)
      .to(line3Ref.current, { y: 0, rotate: 0 }, 0)
      .to(line2Ref.current, { opacity: 1 }, 0);
  }
}, [mobileOpen]);


  useEffect(() => {
  if (!drawerRef.current) return;

  const tl = gsap.timeline();

 if (mobileOpen) {
  tl.fromTo(
    drawerRef.current,
    { x: "100%" },
    { x: "0%", duration: 0.5, ease: "power4.out" }
  ).from(
    menuListRef.current.children,
    {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.4,
      ease: "power3.out",
    },
    "-=0.3"
  );
}
}, [mobileOpen]);

  // Mobile Drawer Component
  const MobileDrawer = () => (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleMobileDrawerToggle}
      transitionDuration={0}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        ref: drawerRef,
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Mobile Drawer Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box
            onClick={() => {
              navigate("/");
              setMobileOpen(false);
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1976d2, #35a4ff)",
              }}
            >
              <Typography
                sx={{ fontWeight: 800, fontSize: "1.2rem", color: "white" }}
              >
                TB
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #1976d2 0%, #35a4ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ToolBox
            </Typography>
          </Box>
          <IconButton onClick={handleMobileDrawerToggle}>
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Mobile Navigation List */}
        <List  ref={menuListRef}  sx={{ width: "100%" }}>
          {menuItems.map((item) => (
            <Box key={item.label}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.children) {
                      handleMobileExpandClick(item.label);
                    } else {
                      handleMobileItemClick(item.path);
                    }
                  }}
                  sx={{
                    borderRadius: "12px",
                    mb: 0.5,
                    "&:hover": {
                      background: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  />
                  {item.children && (
                    <Box component="span" sx={{ ml: 1 }}>
                      {mobileExpandedItems.includes(item.label) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>

              {/* Mobile Submenu */}
              {item.children && (
                <Collapse
                  in={mobileExpandedItems.includes(item.label)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((category) => (
                      <Box key={category.label}>
                        <ListItem sx={{ pl: 4 }}>
                          <ListItemText
                            primary={category.label}
                            primaryTypographyProps={{
                              fontWeight: 600,
                              fontSize: "0.95rem",
                              color: theme.palette.primary.main,
                            }}
                          />
                        </ListItem>
                        {category.children?.map((tool) => (
                          <ListItem
                            key={tool.label}
                            disablePadding
                            sx={{ pl: 6 }}
                          >
                            <ListItemButton
                              onClick={() => handleMobileItemClick(tool.path)}
                              sx={{
                                py: 1,
                                borderRadius: "8px",
                                "&:hover": {
                                  background: alpha(
                                    theme.palette.primary.main,
                                    0.08,
                                  ),
                                },
                              }}
                            >
                              <ListItemText
                                primary={tool.label}
                                secondary={tool.path
                                  ?.split("/")
                                  .pop()
                                  ?.replace("-", " ")}
                                primaryTypographyProps={{
                                  fontSize: "0.9rem",
                                  fontWeight: 500,
                                }}
                                secondaryTypographyProps={{
                                  fontSize: "0.8rem",
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                        <Divider sx={{ my: 1, ml: 4 }} />
                      </Box>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>

        {/* Theme Toggle in Mobile Drawer */}
        <Box sx={{ mt: 3, px: 2 }}>
          <ListItemButton
            onClick={() => {
              // Add theme toggle logic here
            }}
            sx={{
              borderRadius: "12px",
              justifyContent: "center",
              gap: 1,
              background: alpha(theme.palette.primary.main, 0.1),
              "&:hover": {
                background: alpha(theme.palette.primary.main, 0.15),
              },
            }}
          >
            <Nightlight sx={{ fontSize: 22 }} />
            <Typography sx={{ fontWeight: 600 }}>
              {isLight ? "Dark Mode" : "Light Mode"}
            </Typography>
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <>
      {!isMobile && activeDropdown && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1299,
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.03)",
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
          backdropFilter: "blur(20px)",
          backgroundColor: isLight
            ? "rgba(245, 247, 250, 0.95)"
            : "rgba(15, 23, 42, 0.95)",
          borderBottom: "1px solid",
          borderColor: isLight
            ? "rgba(0, 0, 0, 0.08)"
            : "rgba(255, 255, 255, 0.08)",
          backgroundImage: isLight
            ? "linear-gradient(135deg, rgba(245, 247, 250, 0.95), rgba(228, 237, 245, 0.95))"
            : "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(33, 207, 255, 0.05))",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
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
              px: { xs: 1, sm: 2 },
              position: "relative",
            }}
          >
            {/* Logo */}
            <Box
              onClick={() => {
                window.location.href = "/";
                closeAllDropdowns();
                setMobileOpen(false);
              }}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.5 },
                p: { xs: 1, sm: 1.5 },
                borderRadius: "16px",
                transition: "all 0.3s ease",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid transparent",
                "&:hover": {
                  transform: { xs: "none", sm: "translateY(-1px)" },
                  boxShadow: { sm: "0 8px 32px rgba(53, 164, 255, 0.2)" },
                  border: { sm: "1px solid rgba(53, 164, 255, 0.2)" },
                  background: {
                    sm: "linear-gradient(135deg, rgba(53, 164, 255, 0.15), rgba(255, 255, 255, 0.1))",
                  },
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #1976d2, #35a4ff)",
                  boxShadow: "0 4px 20px rgba(53, 164, 255, 0.4)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
                    animation: { sm: "shimmer 3s infinite linear" },
                    "@keyframes shimmer": {
                      "0%": { transform: "translateX(-100%)" },
                      "100%": { transform: "translateX(100%)" },
                    },
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    color: "white",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  TB
                </Typography>
              </Box>
              <Typography
                variant={isMobile ? "body1" : "h5"}
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #1976d2 0%, #35a4ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.5px",
                  fontSize: { xs: "1.1rem", sm: "1.5rem" },
                }}
              >
                ToolBox
              </Typography>
            </Box>

            {/* Desktop Navigation Menu */}
            {!isMobile && (
              <Box
                component="ul"
                sx={{
                  display: "flex",
                  gap: 1,
                  listStyle: "none",
                  mx: 2,
                  position: "relative",
                  height: "100%",
                  alignItems: "center",
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

            {/* Right side - Theme Toggle & Mobile Menu */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
                position: "relative",
                zIndex: 1301,
              }}
            >
              {/* Desktop Theme Toggle */}
              {!isMobile && (
                <IconButton
                  onClick={() => {
                    // Add theme toggle logic here
                  }}
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "14px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    width: 48,
                    height: 48,
                    border: "1px solid transparent",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, rgba(53, 164, 255, 0.15), rgba(255, 255, 255, 0.1))",
                      transform: "translateY(-2px) rotate(30deg)",
                      boxShadow: "0 8px 32px rgba(53, 164, 255, 0.3)",
                      border: "1px solid rgba(53, 164, 255, 0.3)",
                    },
                  }}
                >
                  <Nightlight
                    sx={{
                      fontSize: 22,
                      color:
                        theme.palette.mode === "dark" ? "#35a4ff" : "inherit",
                    }}
                  />
                </IconButton>
              )}

              {/* Mobile Menu Button */}
              {isMobile && (
                <>
                 <IconButton onClick={handleMobileDrawerToggle}>
  <Box
    sx={{
      width: 24,
      height: 18,
      position: "relative",
    }}
  >
    <Box
      ref={line1Ref}
      sx={{
        position: "absolute",
        width: "100%",
        height: 2,
        background: "currentColor",
        top: 0,
        left: 0,
      }}
    />
    <Box
      ref={line2Ref}
      sx={{
        position: "absolute",
        width: "100%",
        height: 2,
        background: "currentColor",
        top: 8,
        left: 0,
      }}
    />
    <Box
      ref={line3Ref}
      sx={{
        position: "absolute",
        width: "100%",
        height: 2,
        background: "currentColor",
        bottom: 0,
        left: 0,
      }}
    />
  </Box>
</IconButton>
                  <MobileDrawer />
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
