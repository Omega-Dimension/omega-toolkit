import { Box, Container, Typography, Chip } from "@mui/material";
import { tools } from "../data/menuItems";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedTools() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(cardsRef.current!.children) as HTMLElement[];

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const center = window.innerWidth / 2;

        const fromX = rect.left < center ? -80 : 80; // column detection

        gsap.from(card, {
          x: fromX,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={sectionRef} component="section" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        {/* TITLE */}
        <Typography
          variant="h2"
          sx={{ textAlign: "center", fontWeight: 700, mb: 8 }}
        >
          Featured Tools
        </Typography>

        {/* CARDS */}
        <Box
          ref={cardsRef}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {tools.map((tool) => (
            <Box
              key={tool.title}
              sx={{
                width: { xs: "100%", sm: "calc(50% - 16px)" },
                p: 3.5,
                borderRadius: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {tool.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, lineHeight: 1.7 }}
              >
                {tool.desc}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {tool.tech.map((t) => (
                  <Chip key={t} label={t} size="small" />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
