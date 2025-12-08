import styled from 'styled-components';

export const Card = styled.div<{ clickable?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  padding: ${({ theme }) => theme.spacing.m}px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease-in-out;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: ${({ clickable }) => (clickable ? 'translateY(-4px)' : 'none')};
    box-shadow: ${({ clickable, theme }) => (clickable ? theme.shadows.large : theme.shadows.medium)};
  }
`;
