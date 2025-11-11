import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import NotaFiscalListHeader from '../NotaFiscalListHeader';

describe('NotaFiscalListHeader', () => {
  it('renders header with title', () => {
    const { getByText } = render(
      <ThemeProvider>
        <NotaFiscalListHeader />
      </ThemeProvider>
    );

    expect(getByText('Notas Fiscais')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(
      <ThemeProvider>
        <NotaFiscalListHeader />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
