import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { theme } from './theme.ts'
import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>  
  </StrictMode>,
)
