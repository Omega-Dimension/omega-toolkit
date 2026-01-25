import { alpha, Box, Container, IconButton, Typography, useTheme } from "@mui/material";
import { menuItems } from "../data/menuItems";
import { NavItem } from "../components/NavItem";
import { Nightlight } from "@mui/icons-material";

export default function Header() {
  const theme = useTheme();
  return (
    <Box component="header">
      <Container maxWidth="lg">
        <Box
          component="nav"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <Typography variant="h6">ToolBox</Typography>

          <Box
            component="ul"
            sx={{ display: "flex", gap: 6, listStyle: "none" }}
          >
            {menuItems.map((i) => (
              <NavItem key={i.label} item={i} />
            ))}
          </Box>

          <Box>
            <IconButton
            sx={{
              bgcolor : alpha(theme.palette.primary.main, 0.7),
            
              borderRadius : "50%",
              boxShadow : 1,
            
            }}
            >
              <Nightlight />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
