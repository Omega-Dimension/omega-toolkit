import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/material";

export default function MainLayout() {
  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Outlet />
      </Container>

      <Footer />
    </>
  );
}
