import styled from 'styled-components';

export const Tag = styled.span<{ tone?: 'success' | 'warning' | 'error' | 'info' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ tone, theme }) => {
    switch (tone) {
      case 'success':
        return theme.colors.primary;
      case 'warning':
        return '#FF6B35';
      case 'error':
        return theme.colors.error;
      default:
        return theme.colors.primaryVariant;
    }
  }};
`;
