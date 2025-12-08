import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import SplashContent from '../SplashContent';

describe('SplashContent', () => {
  it('renders spinner and loading text', () => {
    const { getByText } = render(
      <ThemeProvider>
        <SplashContent />
      </ThemeProvider>
    );

    expect(getByText('Carregando...')).toBeTruthy();
  });

  it('renders with custom text when provided', () => {
    const { getByText } = render(
      <ThemeProvider>
        <SplashContent text="Inicializando..." />
      </ThemeProvider>
    );

    expect(getByText('Inicializando...')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(
      <ThemeProvider>
        <SplashContent />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
