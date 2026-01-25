import { Box, Button, Typography, Container } from "@mui/material";

export default function Hero() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, textAlign: "center" }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Typography variant="h1" gutterBottom>
            Omega Toolkit
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Tools & Features That Actually Help People — convert files, work
            with images, and use developer utilities directly in your browser.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button variant="contained" size="large">
              Explore Tools
            </Button>
            <Button variant="outlined" size="large">
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
