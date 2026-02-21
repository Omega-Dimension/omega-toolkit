import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeModeProvider } from "./hooks/useThemeMode.tsx";
import { ModalProvider } from "./hooks/useModal.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeModeProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </ThemeModeProvider>
  </StrictMode>,
);
