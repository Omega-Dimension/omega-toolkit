import {
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
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
import { Nightlight, Menu, Close, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedItems, setMobileExpandedItems] = useState<string[]>([]);
  
  // Refs for GSAP animations
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  
  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  const isLight = theme.palette.mode === 'light';

  // GSAP animations for mobile drawer
  useEffect(() => {
    if (mobileOpen) {
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
      
      // Initial state
      gsap.set(overlayRef.current, { autoAlpha: 0, display: "block" });
      gsap.set(drawerRef.current, { x: "100%", display: "flex" });
      
      // Animate in
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
      tl.to(drawerRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power3.out",
      }, "-=0.2");
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
      
      // Animate out
      if (drawerRef.current && overlayRef.current) {
        const tl = gsap.timeline();
        tl.to(drawerRef.current, {
          x: "100%",
          duration: 0.4,
          ease: "power3.in",
        });
        tl.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(overlayRef.current, { display: "none" });
            gsap.set(drawerRef.current, { display: "none" });
          }
        }, "-=0.1");
      }
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileItemClick = (path?: string) => {
    if (path) {
      // Restore body scroll
      document.body.style.overflow = 'unset';
      
      // Animate out before navigation
      const tl = gsap.timeline({
        onComplete: () => {
          navigate(path);
          setMobileOpen(false);
          setMobileExpandedItems([]);
        }
      });
      
      tl.to(drawerRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
      });
      tl.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" });
          gsap.set(drawerRef.current, { display: "none" });
        }
      }, "-=0.1");
    }
  };

  const handleMobileExpandClick = (label: string) => {
    setMobileExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  // Custom Mobile Drawer with GSAP
  const MobileDrawer = () => (
    <>
      {/* Overlay */}
      <Box
        ref={overlayRef}
        onClick={handleMobileDrawerToggle}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999999, // Increased z-index
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          visibility: "hidden",
          opacity: 0,
          display: "none", // Hidden by default
        }}
      />
      
      {/* Drawer */}
      <Box
        ref={drawerRef}
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: 400,
          zIndex: 999999, // Increased z-index
          background: isLight
            ? alpha("#fff", 0.98)
            : alpha("#0a0e1a", 0.98),
          backdropFilter: "blur(20px)",
          borderLeft: "1px solid",
          borderColor: isLight
            ? alpha("#000", 0.08)
            : alpha("#fff", 0.08),
          boxShadow: isLight
            ? "-10px 0 40px rgba(0,0,0,0.15)"
            : "-10px 0 40px rgba(0,0,0,0.5)",
          transform: "translateX(100%)",
          display: "none", // Hidden by default
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Mobile Drawer Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box
              onClick={() => handleMobileItemClick("/")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #1976d2, #35a4ff)",
                  boxShadow: "0 8px 20px rgba(53, 164, 255, 0.3)",
                }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", color: "white" }}>
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
            <IconButton 
              onClick={handleMobileDrawerToggle}
              sx={{
                background: alpha(theme.palette.primary.main, 0.1),
                "&:hover": {
                  background: alpha(theme.palette.primary.main, 0.2),
                  transform: "rotate(90deg)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Mobile Navigation List */}
          <List sx={{ width: "100%" }}>
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
                      borderRadius: "14px",
                      mb: 0.5,
                      py: 1.5,
                      px: 2,
                      "&:hover": {
                        background: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <ListItemText 
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                      }}
                    />
                    {item.children && (
                      <Box 
                        component="span" 
                        sx={{ 
                          ml: 1,
                          transition: "transform 0.3s ease",
                          transform: mobileExpandedItems.includes(item.label) 
                            ? "rotate(180deg)" 
                            : "rotate(0deg)",
                        }}
                      >
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
                    timeout={400}
                    easing={{
                      enter: "cubic-bezier(0.4, 0, 0.2, 1)",
                      exit: "cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children.map((category) => (
                        <Box key={category.label}>
                          <ListItem sx={{ pl: 4, py: 1 }}>
                            <ListItemText 
                              primary={category.label}
                              primaryTypographyProps={{
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                color: theme.palette.primary.main,
                                sx: {
                                  textTransform: "uppercase",
                                  letterSpacing: "1px",
                                }
                              }}
                            />
                          </ListItem>
                          {category.children?.map((tool) => (
                            <ListItem 
                              key={tool.label} 
                              disablePadding 
                              sx={{ pl: 5 }}
                            >
                              <ListItemButton
                                onClick={() => handleMobileItemClick(tool.path)}
                                sx={{
                                  py: 1.5,
                                  px: 2,
                                  borderRadius: "10px",
                                  ml: 1,
                                  "&:hover": {
                                    background: alpha(theme.palette.primary.main, 0.08),
                                    transform: "translateX(8px)",
                                  },
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <ListItemText 
                                  primary={tool.label}
                                  primaryTypographyProps={{
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                  }}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                          <Divider sx={{ my: 1.5, ml: 4 }} />
                        </Box>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            ))}
          </List>

          {/* Theme Toggle in Mobile Drawer */}
          <Box sx={{ mt: 4, px: 2 }}>
            <ListItemButton
              onClick={() => {
                // Add theme toggle logic here
              }}
              sx={{
                borderRadius: "16px",
                justifyContent: "center",
                gap: 1.5,
                py: 2,
                background: alpha(theme.palette.primary.main, 0.1),
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.2),
                "&:hover": {
                  background: alpha(theme.palette.primary.main, 0.2),
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                },
                transition: "all 0.3s ease",
              }}
            >
              <Nightlight sx={{ 
                fontSize: 24,
                color: isLight ? theme.palette.primary.main : "#35a4ff",
              }} />
              <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>
                {isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              </Typography>
            </ListItemButton>
          </Box>
        </Box>
      </Box>
    </>
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

      {/* Header - Lower z-index than drawer */}
      <Box 
        component="header"
        onMouseLeave={!isMobile ? closeAllDropdowns : undefined}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1300, // Lower than drawer
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
                  background: { sm: "linear-gradient(135deg, rgba(53, 164, 255, 0.15), rgba(255, 255, 255, 0.1))" },
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
                    background: "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
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
                  background: "linear-gradient(135deg, #1976d2 0%, #35a4ff 100%)",
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
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: { xs: 1, sm: 2 },
              position: "relative",
              zIndex: 1301,
            }}>
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
                      background: "linear-gradient(135deg, rgba(53, 164, 255, 0.15), rgba(255, 255, 255, 0.1))",
                      transform: "translateY(-2px) rotate(30deg)",
                      boxShadow: "0 8px 32px rgba(53, 164, 255, 0.3)",
                      border: "1px solid rgba(53, 164, 255, 0.3)",
                    },
                  }}
                >
                  <Nightlight sx={{ 
                    fontSize: 22,
                    color: theme.palette.mode === 'dark' ? "#35a4ff" : "inherit",
                  }} />
                </IconButton>
              )}

              {/* Mobile Menu Button */}
              {isMobile && (
                <>
                  <IconButton
                    onClick={handleMobileDrawerToggle}
                    sx={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      width: 40,
                      height: 40,
                      border: "1px solid",
                      borderColor: isLight
                        ? alpha("#000", 0.08)
                        : alpha("#fff", 0.08),
                      "&:hover": {
                        background: alpha(theme.palette.primary.main, 0.1),
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Menu />
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