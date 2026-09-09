import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { ModeProvider } from './contexts/ModeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModeProvider>
    </ThemeProvider>
  </StrictMode>,
);
