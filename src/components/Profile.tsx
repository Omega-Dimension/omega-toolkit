import { Box, Container, Typography, Avatar } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { person1, person2, person3 } from "../assets";

gsap.registerPlugin(ScrollTrigger);

export interface ProfileProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const profiles: ProfileProps[] = [
  {
    name: "Fento",
    role: "Frontend Developer",
    image: person1,
    bio: "React, MUI, Tailwind. Focused on clean UI and smooth UX.",
  },
  {
    name: "Alex",
    role: "Backend Developer",
    image: person2,
    bio: "Node.js, APIs, database design and performance.",
  },
  {
    name: "May",
    role: "UI/UX Designer",
    image: person3,
    bio: "Design systems, accessibility, and product thinking.",
  },
];

export default function Profile() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(listRef.current!.children);
      
      // Reset all cards to initial state
      gsap.set(cards, { opacity: 0, y: 40 });
      
      // Animate cards in
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: listRef.current!,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={sectionRef} component="section" sx={{ 
      py: 14,
      minHeight: "100vh", // Ensure enough height
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <Container maxWidth="lg">
        {/* TITLE */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Our Team
          </Typography>
          <Typography color="text.secondary">
            Built by passionate developers who love clean code and real-world
            solutions.
          </Typography>
        </Box>

        {/* HORIZONTAL SCROLL - FIXED */}
        <Box
          ref={listRef}
          sx={{
            display: "flex",
            gap: 4,
            overflowX: { xs: "auto", md: "visible" }, // Only scroll on mobile
            pb: 2,
            px: { xs: 0, md: 0 },
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { display: "none" },
            
            // Make it take full width on desktop
            width: { xs: "100%", md: "auto" },
            justifyContent: { xs: "flex-start", md: "center" }, // Center on desktop
            
            // Ensure horizontal scroll works
            flexWrap: { xs: "nowrap", md: "wrap" }, // Don't wrap on mobile
          }}
        >
          {profiles.map((p) => (
            <Box
              key={p.name}
              sx={{
                // Responsive width
                width: { xs: 280, md: 300 },
                flexShrink: 0, // Important for horizontal scroll
                p: 3,
                borderRadius: 4,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                scrollSnapAlign: "start",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "0.3s",
                opacity: 0, // Start hidden for animation
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
                },
              }}
            >
              {/* AVATAR */}
              <Avatar
                src={p.image}
                alt={p.name}
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 2,
                  boxShadow: 3,
                }}
              />

              {/* NAME */}
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                {p.name}
              </Typography>

              {/* ROLE */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", mb: 1.5 }}
              >
                {p.role}
              </Typography>

              {/* BIO */}
              <Typography
                variant="body2"
                sx={{ textAlign: "center", lineHeight: 1.7 }}
              >
                {p.bio}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}