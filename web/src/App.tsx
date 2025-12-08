import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { MobileShell } from './components/layout/MobileShell';
import { Dashboard } from './screens/Dashboard';
import { ContasAPagar } from './screens/ContasAPagar';
import { ContasAReceber } from './screens/ContasAReceber';
import { Upload } from './screens/Upload';
import { Notas } from './screens/Notas';
import { JobStatus } from './screens/JobStatus';
import theme from './theme';
import { GlobalStyle } from './theme/GlobalStyle';

function AppFrame() {
  const location = useLocation();
  const titleMap: Record<string, string> = {
    '/dashboard': 'Dashboard de NF',
    '/pagar': 'Contas a Pagar',
    '/receber': 'Contas a Receber',
    '/upload': 'Upload de Nota',
    '/notas': 'Notas Fiscais',
    '/job-status': 'Status do Job',
  };

  const title = titleMap[location.pathname] || 'Gestão de Notas';

  return (
    <MobileShell title={title}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pagar" element={<ContasAPagar />} />
        <Route path="/receber" element={<ContasAReceber />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/notas" element={<Notas />} />
        <Route path="/job-status" element={<JobStatus />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </MobileShell>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <AppFrame />
      </BrowserRouter>
    </ThemeProvider>
  );
}
