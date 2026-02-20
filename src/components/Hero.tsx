import { Box, Button, Typography, Container } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  function handleExploreClick() {
    navigate("/dashboard");
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
            Tools & Features That Actually Help People — convert files, work
            with images, and use developer utilities directly in your browser.
          </Typography>

          <Box
            ref={buttonsRef}
            sx={{ display: "flex", gap: 2, justifyContent: "center" }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleExploreClick}
            >
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
