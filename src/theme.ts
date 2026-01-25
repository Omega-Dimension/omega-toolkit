import { createTheme, darkScrollbar } from "@mui/material";
import type { ThemeOptions } from "@mui/material";

export const getTheme = (mode: "light" | "dark") => {
  const isLight = mode === "light";

  return createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            ...(isLight ? {} : darkScrollbar()),
            background: isLight
              ? "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)"
              : "linear-gradient(135deg, #0f172a 0%, #21cfff2c 100%)",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
          },
        },
      },
    },

    palette: {
      mode,
      primary: {
        main: isLight ? "#1976d2" : "#35a4ff",
      },

      text: {
        primary: isLight ? "#1e293b" : "#f1f5f9",
        secondary: isLight ? "#64748b" : "#cbd5e1",
      },
      divider: isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)",
    },

    typography: {
      fontFamily: `"Rubik", "Inter", -apple-system, BlinkMacSystemFont, sans-serif`,
      h1: {
        fontSize: "clamp(2rem, 1.5rem + 2vw, 3.5rem)",
        fontWeight: 800,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontSize: "clamp(1.75rem, 1.25rem + 2vw, 2.75rem)",
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontSize: "clamp(1.5rem, 1.1rem + 1.5vw, 2rem)",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: "clamp(1.25rem, 1rem + 1vw, 1.5rem)",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
        lineHeight: 1.7,
      },
      body2: {
        fontSize: "clamp(0.875rem, 0.825rem + 0.25vw, 1rem)",
        lineHeight: 1.6,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },

    shape: {
      borderRadius: 12,
    },

    shadows: isLight
      ? ([
          "none",
          "0px 2px 4px rgba(0, 0, 0, 0.05)",
          "0px 4px 8px rgba(0, 0, 0, 0.07)",
          "0px 8px 16px rgba(0, 0, 0, 0.09)",
          ...Array(21).fill("none"),
        ] as ThemeOptions["shadows"])
      : ([
          "none",
          "0px 2px 4px rgba(0, 0, 0, 0.3)",
          "0px 4px 8px rgba(0, 0, 0, 0.35)",
          "0px 8px 16px rgba(0, 0, 0, 0.4)",
          ...Array(21).fill("none"),
        ] as ThemeOptions["shadows"]),

    spacing: 8,

    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
  });
};
