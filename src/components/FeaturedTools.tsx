import { Box, Container, Typography, Chip } from "@mui/material";
import { menuItems } from "../data/menuItems";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { getFeaturedTools } from "../utils/featuredTools";
import { buildPath } from "../utils/globalfunctions";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedTools() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const featuredTools = getFeaturedTools(menuItems);

  useEffect(() => {
    if (!cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(cardsRef.current!.children) as HTMLElement[];

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const center = window.innerWidth / 2;
        const fromX = rect.left < center ? -80 : 80;

        gsap.from(card, {
          x: fromX,
          opacity: 0,
          duration: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 90%",
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToolClick = (path: string) => {
    navigate(buildPath("", path));
  };

  return (
    <Box ref={sectionRef} component="section" sx={{ py: 14 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{ textAlign: "center", fontWeight: 700, mb: 8 }}
        >
          Featured Tools
        </Typography>

        <Box
          ref={cardsRef}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {featuredTools.map((t) => (
            <Box
              key={t.title}
              onClick={() => t.path && handleToolClick(t.path)}
              sx={{
                width: { xs: "100%", sm: "calc(50% - 16px)" },
                p: 3.5,
                borderRadius: 2,
                background:
                  "linear-gradient(165deg, #0f172a7c 0%, #21cfff3a 100%)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                transition: "transform 0.4s, box-shadow 0.4s",
                cursor: "pointer",
                willChange: "transform",

                "&:hover": {
                  transform: "translateY(-8px) rotate3d(1, 1, 0, 5deg)",
                  boxShadow: `
      0 25px 50px -12px rgba(33, 207, 255, 0.25),
      0 8px 25px rgba(0,0,0,0.15)
    `,

                  background: `
      linear-gradient(165deg, #0f172a 0%, #21cfff4a 100%),
      radial-gradient(circle at 50% 0%, rgba(33, 207, 255, 0.1), transparent 70%)
    `,
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {t.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, lineHeight: 1.7 }}
              >
                {t.desc}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {t.tech.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    sx={{
                      background: "rgba(33, 207, 255, 0.1)",
                      color: "#21CFFF",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      border: "1px solid rgba(33, 207, 255, 0.2)",
                      "&:hover": {
                        background: "rgba(33, 207, 255, 0.15)",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
