import { Box, Container, Typography, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} ToolBox. All rights reserved.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Built with React & MUI
        </Typography>
      </Container>
    </Box>
  );
}
