import React, { createContext, useContext, useMemo, useState } from "react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "../theme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeMOdeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark");

  function toggleTheme() {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }

  const theme = useMemo(() => getTheme(mode), [mode]);

  const value = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return (
    <ThemeMOdeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeMOdeContext.Provider>
  );
}


export function useThemeMode() {
    const context = useContext(ThemeMOdeContext);

    if(!context) {
        throw new Error("useThemeMode must be used inside ThemeModeProvider");
    }

    return context;
}