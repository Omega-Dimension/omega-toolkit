import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/material";

export default function MainLayout() {
  return (
    <>
      <Header />

      <Container component="main" maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
        <Outlet />
      </Container>

      <Footer />
    </>
  );
}
