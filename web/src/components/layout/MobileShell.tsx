import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Shell = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

const Viewport = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.primaryVariant};
  color: ${({ theme }) => theme.colors.onPrimary};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

const IconButton = styled.button`
  border: none;
  background: transparent;
  color: inherit;
  font-size: 20px;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;

const Content = styled.main`
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const BottomNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: ${({ theme }) => theme.colors.primaryVariant};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const NavButton = styled(Link) <{ active?: boolean }>`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.onPrimary};
  text-align: center;
  padding: 10px 4px;
  font-size: 13px;
  font-weight: ${({ active }) => (active ? 700 : 500)};
  background: ${({ active, theme }) => (active ? theme.colors.primary : 'transparent')};
`;

const DrawerOverlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  transition: opacity 0.2s ease;
  display: grid;
  place-items: stretch;
  z-index: 20;
`;

const DrawerPanel = styled.div<{ open: boolean }>`
  width: 78%;
  max-width: 360px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transform: translateX(${({ open }) => (open ? '0' : '-100%')});
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
`;

const DrawerHeader = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.colors.primaryVariant};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 700;
`;

const DrawerLink = styled(Link)`
  padding: 14px 16px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceVariant};
  }
`;

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/pagar', label: 'Pagar' },
  { path: '/receber', label: 'Receber' },
  { path: '/upload', label: 'Upload' },
];

const drawerItems = [
  { path: '/dashboard', label: 'Home / Dashboard' },
  { path: '/notas', label: 'Notas Fiscais' },
  { path: '/job-status', label: 'Status do Job' },
];

type Props = { title?: string; children: ReactNode };

export function MobileShell({ title = 'Gestão de Notas', children }: Props) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const current = location.pathname;

  return (
    <Shell>
      <Viewport>
        <Header>
          <IconButton aria-label="Abrir menu" onClick={() => setOpen(true)}>☰</IconButton>
          <Title>{title}</Title>
          <IconButton aria-label="Perfil">⚙</IconButton>
        </Header>

        <Content>{children}</Content>

        <BottomNav>
          {navItems.map((item) => (
            <NavButton key={item.path} to={item.path} active={current === item.path}>
              {item.label}
            </NavButton>
          ))}
        </BottomNav>
      </Viewport>

      <DrawerOverlay open={open} onClick={() => setOpen(false)}>
        <DrawerPanel open={open} onClick={(e) => e.stopPropagation()}>
          <DrawerHeader>Menu</DrawerHeader>
          {drawerItems.map((item) => (
            <DrawerLink key={item.path} to={item.path} onClick={() => setOpen(false)}>
              {item.label}
            </DrawerLink>
          ))}
        </DrawerPanel>
      </DrawerOverlay>
    </Shell>
  );
}
