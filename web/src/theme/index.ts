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
  typography: {
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      color: colors.text,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      color: colors.text,
    },
    body: {
      fontSize: '16px',
      color: colors.text,
    },
    caption: {
      fontSize: '12px',
      color: colors.placeholder,
    },
  },
  shadows: {
    small: '0 2px 4px rgba(51, 51, 51, 0.1)',
    medium: '0 4px 8px rgba(51, 51, 51, 0.2)',
  },
};

export type Theme = typeof theme;
export default theme;
