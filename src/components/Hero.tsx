import { Box, Button, Typography, Container } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { GitHub } from "@mui/icons-material";
import { OPEN_TOOLS_MENU_EVENT } from "../layout/MainLayout/Header";

const GITHUB_REPO_URL = "https://github.com/Omega-Dimension/omega-toolkit";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  function handleExploreClick() {
    window.dispatchEvent(new Event(OPEN_TOOLS_MENU_EVENT));
  }

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (titleRef.current) {
        tl.from(titleRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
        });
      }

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4",
        );
      }

      if (buttonsRef.current) {
        tl.from(
          buttonsRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.3",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{ py: { xs: 8, md: 14 }, textAlign: "center" }}
    >
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Typography
            ref={titleRef}
            variant="h1"
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #1cd4fe 0%, #0d92ffd0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
              mb: 3,
            }}
          >
            Omega Toolkit
          </Typography>

          <Typography
            ref={subtitleRef}
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            A free, open-source collection of browser tools — convert files,
            work with images, and use developer utilities. No sign-up, no
            server upload, everything runs locally in your browser.
          </Typography>

          <Box
            ref={buttonsRef}
            sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleExploreClick}
            >
              Explore Tools
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<GitHub />}
              component="a"
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}