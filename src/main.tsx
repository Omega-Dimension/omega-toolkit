import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getTheme } from './theme.ts'
import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={getTheme("dark")}>
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>  
  </StrictMode>,
)
