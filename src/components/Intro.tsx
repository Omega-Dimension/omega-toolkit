import { Box, Container, Typography } from "@mui/material";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { introImage } from "../assets";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.to(imageRef.current, {
          y: 12,
          duration: 2.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          x: 60,
          opacity: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: 10,
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 6, md: 10 },
          }}
        >
          <Box
            ref={imageRef}
            sx={{
              flex: 1,
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
            }}
          >
            {/* Actual Image */}
            <Box
              component="img"
              src={introImage}
              alt="Omega Toolkit Preview"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
               
              }}
            />
          </Box>

          {/* CONTENT */}
          <Box ref={contentRef} sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.8rem" },
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              Built for{" "}
              <Box
                component="span"
                sx={{
                  background: (theme) =>
                    theme.palette.mode === "light"
                      ? "linear-gradient(135deg, #667eea, #764ba2)"
                      : "linear-gradient(135deg, #21d4fd, #b721ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Developers
              </Box>
              , Students, and Everyday Users
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.05rem", lineHeight: 1.8, mb: 2.5 }}
            >
              Omega Toolkit is an open-source project focused on providing
              simple, fast, and useful tools that solve real problems — without
              ads, trackers, or complicated workflows.
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.05rem", lineHeight: 1.8 }}
            >
              Convert files, work with images, decode tokens, or generate IDs —
              everything runs directly in your browser with privacy in mind.
            </Typography>

            {/* STATS */}
            <Box
              sx={{
                display: "flex",
                gap: 5,
                mt: 5,
                pt: 3,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              {[
                { label: "Tools", value: "50+" },
                { label: "Privacy", value: "100%" },
                { label: "Forever", value: "Free" },
              ].map((item) => (
                <Box key={item.label}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      background: (theme) =>
                        theme.palette.mode === "light"
                          ? "linear-gradient(135deg, #667eea, #764ba2)"
                          : "linear-gradient(135deg, #21d4fd, #b721ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {item.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
