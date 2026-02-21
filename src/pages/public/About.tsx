import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Stack,
  Chip,
  useTheme,
} from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import StorageIcon from "@mui/icons-material/Storage";
import CodeIcon from "@mui/icons-material/Code";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SecurityIcon from "@mui/icons-material/Security";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const theme = useTheme();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cards = [
    {
      icon: <ArchitectureIcon sx={{ fontSize: 40 }} />,
      title: "Microservice Architecture",
      description: "Building scalable, resilient systems with distributed microservices that evolve with your business needs.",
    },
    {
      icon: <StorageIcon sx={{ fontSize: 40 }} />,
      title: "Robust Backend",
      description:
        "Enterprise-grade backend solutions using Nest.js and PostgreSQL, ensuring data integrity and peak performance.",
    },
    {
      icon: <DesignServicesIcon sx={{ fontSize: 40 }} />,
      title: "Modern Frontend",
      description:
        "Cutting-edge user interfaces built with Next.js, React, and Tailwind CSS for exceptional user experiences.",
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: "Clean Code Philosophy",
      description:
        "We believe in writing maintainable, scalable code that stands the test of time and team collaboration.",
    },
  ];

  const stats = [
    { value: "50+", label: "Projects Delivered", icon: <RocketLaunchIcon /> },
    { value: "100%", label: "Client Satisfaction", icon: <SecurityIcon /> },
    { value: "24/7", label: "Support & Maintenance", icon: <CodeIcon /> },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Initial animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
      }).from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4",
      );

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
          });
        }
      });

      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.from(stat, {
            scrollTrigger: {
              trigger: stat,
              start: "top bottom-=50",
              toggleActions: "play none none reverse",
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.2)",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={sectionRef} component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center", mb: 8 }}>
          <Typography
            ref={titleRef}
            variant="h1"
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #1cd4fe 0%, #0d92ffd0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 3,
            }}
          >
            Crafting Digital Excellence
          </Typography>

          <Typography
            ref={subtitleRef}
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto", mb: 4 }}
          >
            At Omega Dimensions, we don't just build applications — we engineer
            experiences that combine robust backend architecture with stunning
            frontend design.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ flexWrap: "wrap", gap: 1 }}
          >
            <Chip
              label="Microservices"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
            <Chip
              label="Nest.js"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
            <Chip
              label="Next.js"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
            <Chip
              label="React"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
            <Chip
              label="PostgreSQL"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
          </Stack>
        </Box>

        {/* Cards Grid */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {cards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper
                ref={(el: HTMLDivElement | null) => {
                  cardsRef.current[index] = el;
                }}
                elevation={2}
                sx={{
                  p: 4,
                  height: "100%",
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
                      : "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Box sx={{ color: "primary.main", mb: 2 }}>{card.icon}</Box>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" gutterBottom>
            By the Numbers
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
            Delivering excellence through measurable results
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid size={{ xs: 12, md: 4, sm: 6 }} key={index}>
                <Paper
                  ref={(el: HTMLDivElement | null) => {
                    statsRef.current[index] = el;
                  }}
                  elevation={3}
                  sx={{
                    p: 4,
                    maxWidth: 300,
                    mx: "auto",
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, rgba(33, 207, 255, 0.1) 0%, rgba(13, 146, 255, 0.05) 100%)"
                        : "linear-gradient(135deg, rgba(33, 207, 255, 0.05) 0%, rgba(13, 146, 255, 0.02) 100%)",
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mx: "auto",
                      mb: 2,
                      bgcolor: "primary.main",
                      color: "white",
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h3" color="primary.main" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            maxWidth: 800,
            mx: "auto",
            textAlign: "center",
            p: 6,
            borderRadius: 4,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(145deg, rgba(33, 207, 255, 0.05) 0%, rgba(13, 146, 255, 0.02) 100%)"
                : "linear-gradient(145deg, rgba(33, 207, 255, 0.02) 0%, rgba(13, 146, 255, 0.01) 100%)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Our Philosophy
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.1rem" }}
          >
            We believe the best applications are born from the perfect harmony
            between powerful backend architecture and intuitive frontend design.
            At Omega Dimensions, we bridge this gap, creating digital solutions
            that are not only technically superior but also a joy to use.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
