import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light", 
    background: {
      default: "#131720",
      paper: "#141a25",
    },
    text: {
      primary: "#ffffff",
    },
    primary: {
      main: "#ffd700",
    },
  },

  typography: {
    fontFamily: `"Rubik", sans-serif`,

    h1: {
      fontSize: "clamp(1.5rem, 1.2rem + 2vw, 3.2rem)",
      fontWeight: 700,
      lineHeight: 1,
    },
    h2: {
      fontSize: "clamp(1.25rem, 1.1rem + 2vw, 2.5rem)",
      fontWeight: 700,
      lineHeight: 1,
    },
    h3: {
      fontSize: "clamp(1.125rem, 1.1rem + 2vw, 1.75rem)",
      fontWeight: 600,
    },
    body1: {
      fontSize: "clamp(0.875rem, 0.84rem + 0.5vw, 1rem)",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "clamp(0.875rem, 0.84rem + 0.5vw, 1rem)",
    },
  },
});
