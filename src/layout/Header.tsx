import {
  alpha,
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { menuItems } from "../data/menuItems";
import { NavItem } from "../components/NavItem";
import { Nightlight } from "@mui/icons-material";
import { useState } from "react";

export default function Header() {
  const theme = useTheme();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  const isLight = theme.palette.mode === 'light';

  return (
    <>
      {/* Backdrop overlay for dropdowns */}
      {activeDropdown && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1199,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0, 0, 0, 0.09)",
            pointerEvents: "none",
          }}
        />
      )}

      <Box 
        component="header"
        onMouseLeave={closeAllDropdowns}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1200,
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
              height: 72,
              px: 2,
              position: "relative",
            }}
          >
            {/* Logo with Crystal Effect */}
            <Box
              onClick={() => {
                window.location.href = "/";
                closeAllDropdowns();
              }}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.5,
                borderRadius: "16px",
                transition: "all 0.3s ease",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid transparent",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 8px 32px rgba(53, 164, 255, 0.2)",
                  border: "1px solid rgba(53, 164, 255, 0.2)",
                  background: "linear-gradient(135deg, rgba(53, 164, 255, 0.15), rgba(255, 255, 255, 0.1))",
                },
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
                    animation: "shimmer 3s infinite linear",
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
                    fontSize: "1.2rem",
                    color: "white",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  TB
                </Typography>
              </Box>
              <Typography 
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #1976d2 0%, #35a4ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.5px",
                  position: "relative",
                }}
              >
                ToolBox
              </Typography>
            </Box>

            {/* Navigation Menu */}
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
                zIndex: 1200,
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

            {/* Theme Toggle with Crystal Effect */}
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 2,
              position: "relative",
              zIndex: 1201,
            }}>
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
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}