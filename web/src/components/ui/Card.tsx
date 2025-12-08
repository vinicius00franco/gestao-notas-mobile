import styled from 'styled-components';

export const Card = styled.div<{ clickable?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.m}px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  color: ${({ theme }) => theme.colors.onSurface};
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};

  &:hover {
    transform: ${({ clickable }) => (clickable ? 'translateY(-2px)' : 'none')};
    box-shadow: ${({ clickable, theme }) => (clickable ? theme.shadows.medium : theme.shadows.small)};
  }
`;
