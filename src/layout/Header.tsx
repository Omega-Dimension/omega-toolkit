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

export default function Header() {
  const theme = useTheme();
  
  return (
    <Box 
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1200, // Increased z-index
        backdropFilter: "blur(10px)",
        backgroundColor: alpha(theme.palette.background.default, 0.95),
        borderBottom: "1px solid",
        borderColor: alpha(theme.palette.divider, 0.1),
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
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
          {/* Logo */}
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
              position: "relative",
              zIndex: 1201,
            }}
          >
            ToolBox
          </Typography>

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
              <NavItem key={item.label} item={item} />
            ))}
          </Box>

          {/* Theme Toggle */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 2,
            position: "relative",
            zIndex: 1201,
          }}>
            <IconButton
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: "50%",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                width: 44,
                height: 44,
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  transform: "rotate(30deg)",
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                },
              }}
            >
              <Nightlight sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}