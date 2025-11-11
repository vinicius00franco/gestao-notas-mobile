import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import NotaFiscalDetailHeader from '../NotaFiscalDetailHeader';

describe('NotaFiscalDetailHeader', () => {
  it('renders header with title', () => {
    const { getByText } = render(
      <ThemeProvider>
        <NotaFiscalDetailHeader />
      </ThemeProvider>
    );

    expect(getByText('Detalhes da Nota Fiscal')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(
      <ThemeProvider>
        <NotaFiscalDetailHeader />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
