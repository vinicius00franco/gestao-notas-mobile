import { colors } from './colors';

export const theme = {
  colors: { ...colors },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  layout: {
    headerHeight: '60px',
    bottomNavHeight: '60px',
    cardWidth: '280px',
    borderRadius: '16px',
    mobileMaxWidth: '100%',
  },
  typography: {
    h1: {
      fontSize: '28px',
      fontWeight: 800,
      lineHeight: '1.2',
      color: colors.text,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '1.3',
      color: colors.text,
      letterSpacing: '-0.01em',
    },
    body: {
      fontSize: '15px',
      lineHeight: '1.5',
      color: colors.text,
    },
    caption: {
      fontSize: '13px',
      lineHeight: '1.4',
      color: colors.textSecondary,
    },
    small: {
      fontSize: '12px',
      fontWeight: 600,
      color: colors.textSecondary,
    }
  },
  shadows: {
    small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};

export type Theme = typeof theme;
export default theme;
