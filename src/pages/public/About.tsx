import { Box, Container, Typography, Grid, Paper, Avatar, Stack, Chip, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CodeIcon from "@mui/icons-material/Code";
import LockIcon from "@mui/icons-material/Lock";
import BoltIcon from "@mui/icons-material/Bolt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BuildIcon from "@mui/icons-material/Build";
import GroupsIcon from "@mui/icons-material/Groups";

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
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: "Built Solo",
      description:
        "I design, build, and maintain every tool here by myself — no team, no funding, just a side project I keep growing because I use these tools too.",
    },
    {
      icon: <LockIcon sx={{ fontSize: 40 }} />,
      title: "Privacy First",
      description:
        "Everything runs client-side in your browser. Nothing you upload or convert ever touches a server — I simply don't want the liability or the data.",
    },
    {
      icon: <BoltIcon sx={{ fontSize: 40 }} />,
      title: "Made for Daily Use",
      description:
        "These aren't demo tools. They're built to solve the small, repetitive tasks devs, students, and office workers hit every day — fast and no sign-up.",
    },
    {
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
      title: "Always Improving",
      description:
        "Omega Toolkit is open source and evolving. Bug reports and feature ideas from people who actually use it directly shape what gets built next.",
    },
  ];

  const stats = [
    { value: "50+", label: "Tools Built", icon: <GroupsIcon /> },
    { value: "100%", label: "Client-Side & Private", icon: <LockIcon /> },
    { value: "1", label: "Person, No Team", icon: <FavoriteIcon /> },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, { y: 40, opacity: 0, duration: 0.9 }).from(
        subtitleRef.current,
        { y: 30, opacity: 0, duration: 0.8 },
        "-=0.4",
      );

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top bottom-=100", toggleActions: "play none none reverse" },
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
            scrollTrigger: { trigger: stat, start: "top bottom-=50", toggleActions: "play none none reverse" },
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
            Hey, I'm Pyae Sone Tun
          </Typography>

          <Typography ref={subtitleRef} variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
            I build Omega Toolkit in my spare time — a growing collection of small,
            fast utilities for the everyday work of developers, students, and anyone
            stuck googling "convert X to Y" one too many times.
          </Typography>

          <Stack direction="row" spacing={1} justifyContent="center" sx={{ flexWrap: "wrap", gap: 1 }}>
            {["React", "TypeScript", "MUI", "Tailwind", "GSAP"].map((t) => (
              <Chip key={t} label={t} color="primary" variant="outlined" sx={{ borderRadius: 2 }} />
            ))}
          </Stack>
        </Box>

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
                  "&:hover": { transform: "translateY(-8px)" },
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
            No team, no funding — just tools that get used
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
                  <Avatar sx={{ width: 60, height: 60, mx: "auto", mb: 2, bgcolor: "primary.main", color: "white" }}>
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
            Why I Keep Building This
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem" }}>
            I got tired of ad-heavy converter sites that ask you to sign up just to
            resize an image or decode a JWT. Omega Toolkit is my answer: fast,
            private, free tools that just work — built one weekend at a time, and
            never finished, because there's always one more annoying task worth
            solving.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}