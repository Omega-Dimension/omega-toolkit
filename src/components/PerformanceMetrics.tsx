import { Box, Container, Typography, Button, Card, CardContent, useTheme, alpha } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import LayersIcon from "@mui/icons-material/Layers";
import PaletteIcon from "@mui/icons-material/Palette";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AnimationIcon from "@mui/icons-material/Animation";

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const floatingCardsRef = useRef<HTMLDivElement[]>([]);
  const theme = useTheme();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax background effect
      const bgElements = gsap.utils.toArray(".parallax-bg");
      bgElements.forEach((el: any) => {
        gsap.to(el, {
          y: (i) => (i === 0 ? -100 : -50),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });

      // 3D rotation for the main hero card
      if (heroCardRef.current) {
        gsap.to(heroCardRef.current, {
          rotationY: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });

        // Add mouse interaction
        heroCardRef.current.addEventListener("mousemove", (e) => {
          const rect = heroCardRef.current!.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateY = ((x - centerX) / centerX) * 15;
          const rotateX = ((centerY - y) / centerY) * 15;
          
          gsap.to(heroCardRef.current, {
            rotationY: rotateY,
            rotationX: rotateX,
            duration: 0.3,
          });
        });

        heroCardRef.current.addEventListener("mouseleave", () => {
          gsap.to(heroCardRef.current, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
          });
        });
      }

      // Floating cards animation
      floatingCardsRef.current.forEach((card, index) => {
        if (card) {
          // Initial position with offset
          const offsetX = index % 2 === 0 ? 50 : -50;
          const offsetY = index * 30;
          
          gsap.set(card, {
            x: offsetX,
            y: offsetY,
            rotationZ: index % 2 === 0 ? 5 : -5,
          });

          // Scroll-based movement
          gsap.to(card, {
            x: 0,
            y: 0,
            rotationZ: 0,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          });

          // Hover effect
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -20,
              scale: 1.05,
              duration: 0.3,
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            });
          });
        }
      });

      // Text reveal animation
      const revealText = gsap.utils.toArray(".reveal-text");
      revealText.forEach((text: any) => {
        gsap.fromTo(
          text,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Grid items animation with stagger
      const gridItems = gsap.utils.toArray(".grid-item");
      gridItems.forEach((item: any, index) => {
        gsap.fromTo(
          item,
          {
            scale: 0.8,
            opacity: 0,
            rotationY: 90,
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Particle animation
      const particles = gsap.utils.toArray(".particle");
      particles.forEach((particle: any) => {
        const duration = 2 + Math.random() * 2;
        const delay = Math.random() * 2;
        
        gsap.to(particle, {
          y: -100,
          x: `+=${(Math.random() - 0.5) * 100}`,
          opacity: 0,
          duration: duration,
          delay: delay,
          repeat: -1,
          ease: "power1.inOut",
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <FlipCameraAndroidIcon fontSize="large" />,
      title: "3D Transform",
      description: "Experience stunning 3D transformations with smooth animations",
      color: "#8B5CF6",
    },
    {
      icon: <ViewInArIcon fontSize="large" />,
      title: "Parallax Layers",
      description: "Multi-layered parallax effects for immersive scrolling",
      color: "#3B82F6",
    },
    {
      icon: <LayersIcon fontSize="large" />,
      title: "Dynamic Layouts",
      description: "Intelligent layouts that adapt to your content",
      color: "#10B981",
    },
    {
      icon: <PaletteIcon fontSize="large" />,
      title: "Color Magic",
      description: "Automated color schemes that adapt to your theme",
      color: "#F59E0B",
    },
    {
      icon: <AutoAwesomeIcon fontSize="large" />,
      title: "Smart Animations",
      description: "AI-powered animation sequences for maximum impact",
      color: "#EF4444",
    },
    {
      icon: <AnimationIcon fontSize="large" />,
      title: "Fluid Motion",
      description: "Butter-smooth animations with physics-based motion",
      color: "#EC4899",
    },
  ];

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: theme.palette.mode === "dark"
          ? `linear-gradient(
              45deg,
              ${alpha("#0f172a", 0.95)} 0%,
              ${alpha("#1e1b4b", 0.85)} 50%,
              ${alpha("#0f172a", 0.95)} 100%
            )`
          : `linear-gradient(
              45deg,
              ${alpha("#f8fafc", 0.95)} 0%,
              ${alpha("#e0e7ff", 0.85)} 50%,
              ${alpha("#f8fafc", 0.95)} 100%
            )`,
      }}
    >
      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          className="particle"
          sx={{
            position: "absolute",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: theme.palette.mode === "dark"
              ? "rgba(139, 92, 246, 0.5)"
              : "rgba(59, 130, 246, 0.3)",
            left: `${Math.random() * 100}%`,
            top: "100%",
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Parallax background elements */}
      <Box
        className="parallax-bg"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 30% 20%, ${
            theme.palette.mode === "dark" 
              ? "rgba(120, 119, 198, 0.15)" 
              : "rgba(167, 139, 250, 0.1)"
          } 0%, transparent 50%)`,
          filter: "blur(60px)",
        }}
      />
      <Box
        className="parallax-bg"
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 70% 80%, ${
            theme.palette.mode === "dark"
              ? "rgba(236, 72, 153, 0.1)"
              : "rgba(244, 114, 182, 0.08)"
          } 0%, transparent 50%)`,
          filter: "blur(40px)",
        }}
      />

      <Container maxWidth="xl">
        {/* Header with reveal animation */}
        <Box sx={{ textAlign: "center", mb: { xs: 8, md: 12 } }}>
          <Typography
            className="reveal-text"
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "4rem" },
              background: "linear-gradient(135deg, #667eea 0%, #ec4899 50%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "shimmer 3s ease-in-out infinite",
              "@keyframes shimmer": {
                "0%, 100%": {
                  backgroundPosition: "0% 50%",
                },
                "50%": {
                  backgroundPosition: "100% 50%",
                },
              },
            }}
          >
            Interactive Experience
          </Typography>
          <Typography
            className="reveal-text"
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.7,
              fontWeight: 400,
              mb: 4,
            }}
          >
            Discover a new dimension of web interaction with our cutting-edge animation system
          </Typography>
        </Box>

        {/* Main 3D Card */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: { xs: 8, md: 12 },
            perspective: "1000px",
          }}
        >
          <Card
            ref={heroCardRef}
            sx={{
              width: { xs: "100%", md: 600 },
              height: { xs: 300, md: 400 },
              borderRadius: 6,
              background: theme.palette.mode === "dark"
                ? "linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))"
                : "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.95))",
              backdropFilter: "blur(20px)",
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.2),
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                inset 0 1px 0 ${alpha(theme.palette.common.white, 0.1)}
              `,
              cursor: "pointer",
              transformStyle: "preserve-3d",
              transition: "transform 0.5s",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
                backgroundSize: "200% 200%",
                animation: "shine 3s linear infinite",
                "@keyframes shine": {
                  "0%": {
                    backgroundPosition: "-100% -100%",
                  },
                  "100%": {
                    backgroundPosition: "200% 200%",
                  },
                },
              },
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transform: "translateZ(50px)",
              }}
            >
              <AutoAwesomeIcon
                sx={{
                  fontSize: 60,
                  mb: 3,
                  background: "linear-gradient(135deg, #667eea, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Hover & Move Your Mouse
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  maxWidth: 400,
                }}
              >
                Experience real-time 3D transformation. Move your cursor over this card to see the magic!
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Floating Feature Cards */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            mb: { xs: 8, md: 12 },
          }}
        >
          {features.slice(0, 3).map((feature, index) => (
            <Card
              key={feature.title}
              ref={el => {
                if (el) floatingCardsRef.current[index] = el;
              }}
              className="grid-item"
              sx={{
                width: { xs: "100%", sm: "calc(50% - 32px)", md: "calc(33.333% - 32px)" },
                p: 3,
                borderRadius: 4,
                background: theme.palette.mode === "dark"
                  ? `linear-gradient(135deg, ${alpha(feature.color, 0.15)} 0%, ${alpha("#1e293b", 0.8)} 100%)`
                  : `linear-gradient(135deg, ${alpha(feature.color, 0.1)} 0%, ${alpha("#ffffff", 0.9)} 100%)`,
                backdropFilter: "blur(10px)",
                border: "1px solid",
                borderColor: alpha(feature.color, 0.2),
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transformStyle: "preserve-3d",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 2,
                    borderRadius: 3,
                    mb: 3,
                    background: alpha(feature.color, 0.1),
                    color: feature.color,
                    transform: "translateZ(20px)",
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    transform: "translateZ(30px)",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    transform: "translateZ(20px)",
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Call to Action with Interactive Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 2,
              borderRadius: 3,
              fontSize: "1.1rem",
              fontWeight: 600,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              position: "relative",
              overflow: "hidden",
              transformStyle: "preserve-3d",
              transition: "all 0.3s ease",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: -100,
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transition: "0.5s",
              },
              "&:hover": {
                transform: "translateY(-4px) scale(1.05)",
                boxShadow: "0 20px 40px rgba(102, 126, 234, 0.4)",
                "&::before": {
                  left: "100%",
                },
              },
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-block",
                transform: "translateZ(50px)",
              }}
            >
              Launch Interactive Demo
            </Box>
          </Button>
        </Box>
      </Container>
    </Box>
  );
}