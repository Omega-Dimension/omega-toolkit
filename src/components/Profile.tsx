import { Box, Container, Typography, Avatar, Chip, IconButton, Button } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { person1 } from "../assets";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { buildPath } from "../utils/globalfunctions";

const creator = {
  name: "Fento",
  role: "Solo Developer",
  image: person1,
  bio: "Building Omega Toolkit on my own — a free, no-signup, no-tracking set of everyday utilities for developers, students, and anyone who just needs a tool to work without friction.",
  tech: ["React", "TypeScript", "MUI", "Tailwind", "GSAP"],
  social: {
    linkedin: "#",
    github: "https://github.com/Omega-Dimension/omega-toolkit",
    twitter: "#",
    email: "fento@example.com",
  },
};

export default function Profile() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{ py: { xs: 10, md: 14 }, position: "relative", overflow: "hidden" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          ref={cardRef}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 4,
            textAlign: "center",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          <Avatar
            src={creator.image}
            alt={creator.name}
            sx={{
              width: 96,
              height: 96,
              mx: "auto",
              mb: 2.5,
              border: "4px solid white",
              boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
            }}
          />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            {creator.name}
          </Typography>
          <Typography variant="body1" color="primary.main" sx={{ fontWeight: 600, mb: 2 }}>
            {creator.role}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            {creator.bio}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center", mb: 3 }}>
            {creator.tech.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                sx={{
                  fontWeight: 500,
                  background: "rgba(59, 130, 246, 0.1)",
                  color: "#3b82f6",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
            {[
              { Icon: GitHubIcon, href: creator.social.github },
              { Icon: LinkedInIcon, href: creator.social.linkedin },
              { Icon: TwitterIcon, href: creator.social.twitter },
              { Icon: EmailIcon, href: `mailto:${creator.social.email}` },
            ].map(({ Icon, href }, i) => (
              <IconButton
                key={i}
                size="small"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: "rgba(59, 130, 246, 0.08)",
                  "&:hover": { background: "rgba(59, 130, 246, 0.14)", transform: "translateY(-2px)" },
                  transition: "all 0.2s ease",
                }}
              >
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Box>

          <Button
            variant="outlined"
            size="small"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(buildPath("", "about-us"))}
            sx={{ borderWidth: "1.5px", borderRadius: 2, fontWeight: 600 }}
          >
            More about me
          </Button>
        </Box>
      </Container>
    </Box>
  );
}