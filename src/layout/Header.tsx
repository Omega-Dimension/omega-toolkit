import { Box, Container, Typography } from "@mui/material";
import { menuItems } from "../data/menuItems";
import { NavItem } from "../components/NavItem";

export default function Header() {
  return (
    <Box component="section">
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <Typography variant="h6">ToolBox</Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            {menuItems.map((i) => (
              <NavItem key={i.label} item={i} />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
