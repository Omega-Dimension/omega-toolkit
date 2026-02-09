import {
  Box,
  Container,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { person1, person2, person3 } from "../assets";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

gsap.registerPlugin(ScrollTrigger);

export interface ProfileProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  tech: string[];
  social: {
    linkedin: string;
    github: string;
    twitter: string;
    email: string;
  };
}

const profiles: ProfileProps[] = [
  {
    name: "Fento",
    role: "Frontend Developer",
    image: person1,
    bio: "Passionate about creating beautiful, performant web interfaces. Loves React ecosystem and modern CSS.",
    tech: ["React", "TypeScript", "MUI", "Tailwind", "GSAP"],
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
      email: "fento@example.com",
    },
  },
  {
    name: "Alex",
    role: "Backend Developer",
    image: person2,
    bio: "Architecting scalable backend systems with focus on performance, security, and clean code.",
    tech: ["Node.js", "Python", "PostgreSQL", "Redis", "AWS"],
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
      email: "alex@example.com",
    },
  },
  {
    name: "May",
    role: "UI/UX Designer",
    image: person3,
    bio: "Creating intuitive user experiences with attention to detail, accessibility, and visual storytelling.",
    tech: [
      "Figma",
      "Prototyping",
      "Design Systems",
      "UX Research",
      "Animation",
    ],
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
      email: "may@example.com",
    },
  },
];

export default function Profile() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;

    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate cards
      const cards = Array.from(listRef.current!.children);

      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          delay: index * 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            scrub: 0.8,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: { xs: 10, md: 16 },

        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* TITLE */}
        <Box ref={titleRef} sx={{ textAlign: "center", mb: { xs: 8, md: 12 } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Meet The Team
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            A passionate team dedicated to building exceptional developer tools
            with modern technologies.
          </Typography>
        </Box>

        {/* PROFILE CARDS */}
        <Box
          ref={listRef}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
            justifyContent: "center",
            alignItems: "stretch",
            mb: 10,
          }}
        >
          {profiles.map((p) => (
            <Box
              key={p.name}
              sx={{
                width: { xs: "100%", md: "320px" },
                flexShrink: 0,
                p: { xs: 3, md: 4 },
                borderRadius: 4,

                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                border: "1px solid",
                borderColor: "divider",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",

                // Gradient border effect on hover
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.12)",

                  "&::before": {
                    opacity: 1,
                  },
                },

                // Gradient border
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: "inherit",
                  padding: "2px",
                  background:
                    "linear-gradient(135deg, #667eea, #764ba2, #ec4899)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                },
              }}
            >
              {/* Decorative corner accent */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 60,
                  height: 60,
                  background:
                    "linear-gradient(135deg, transparent 50%, rgba(59, 130, 246, 0.08) 50%)",
                  borderBottomLeftRadius: "100%",
                }}
              />

              {/* AVATAR */}
              <Avatar
                src={p.image}
                alt={p.name}
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 3,
                  border: "4px solid white",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                  position: "relative",
                  zIndex: 1,
                }}
              />

              {/* NAME & ROLE */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  mb: 1,
                  background:
                    "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {p.name}
              </Typography>

              <Typography
                variant="body1"
                color="primary.main"
                sx={{
                  textAlign: "center",
                  mb: 3,
                  fontWeight: 600,
                }}
              >
                {p.role}
              </Typography>

              {/* BIO */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  lineHeight: 1.7,
                  mb: 3,
                  fontSize: "0.95rem",
                }}
              >
                {p.bio}
              </Typography>

              {/* TECH STACK */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mb: 2,
                    color: "text.secondary",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    textAlign: "center",
                  }}
                >
                  Expertise
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  {p.tech.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        background: "rgba(59, 130, 246, 0.1)",
                        color: "#3b82f6",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        "&:hover": {
                          background: "rgba(59, 130, 246, 0.15)",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* SOCIAL LINKS */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  mb: 3,
                }}
              >
                <IconButton
                  size="small"
                  href={p.social.github}
                  sx={{
                    background: "rgba(0,0,0,0.04)",
                    "&:hover": {
                      background: "rgba(0,0,0,0.08)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  href={p.social.linkedin}
                  sx={{
                    background: "rgba(59, 130, 246, 0.08)",
                    "&:hover": {
                      background: "rgba(59, 130, 246, 0.12)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  href={p.social.twitter}
                  sx={{
                    background: "rgba(29, 161, 242, 0.08)",
                    "&:hover": {
                      background: "rgba(29, 161, 242, 0.12)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  href={`mailto:${p.social.email}`}
                  sx={{
                    background: "rgba(236, 72, 153, 0.08)",
                    "&:hover": {
                      background: "rgba(236, 72, 153, 0.12)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <EmailIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* CONTACT BUTTON */}
              <Button
                variant="outlined"
                size="small"
                endIcon={<ArrowForwardIcon />}
                fullWidth
                sx={{
                  borderWidth: "1.5px",
                  borderRadius: 2,
                  fontWeight: 600,
                  py: 1,
                  "&:hover": {
                    borderWidth: "1.5px",
                    background: "rgba(59, 130, 246, 0.04)",
                  },
                }}
              >
                Contact {p.name}
              </Button>
            </Box>
          ))}
        </Box>

        {/* CALL TO ACTION */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: "text.primary",
            }}
          >
            Want to join our team?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
          >
            We're always looking for passionate developers and designers to help
            build amazing tools.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 15px 30px rgba(102, 126, 234, 0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            View Open Positions
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
