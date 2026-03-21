import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Container } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
export default function MainLayout() {
  const pageRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!pageRef.current) return;

    gsap.fromTo(
      pageRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }, [location.pathname]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", 
      }}
    >
      <Header />

      <Container
        ref={pageRef}
        component="main"
        maxWidth="xl"
        sx={{
          mt: 4,
          mb: 6,
          flex: 1, 
        }}
      >
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
}