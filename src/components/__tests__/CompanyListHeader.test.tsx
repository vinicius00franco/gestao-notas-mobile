import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import CompanyListHeader from '../CompanyListHeader';

describe('CompanyListHeader', () => {
  it('renders header with title', () => {
    const { getByText } = render(
      <ThemeProvider>
        <CompanyListHeader count={5} />
      </ThemeProvider>
    );

    expect(getByText(/Empresas Não Classificadas/)).toBeTruthy();
  });

  it('displays company count', () => {
    const { getByText } = render(
      <ThemeProvider>
        <CompanyListHeader count={5} />
      </ThemeProvider>
    );

    expect(getByText(/5/)).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(
      <ThemeProvider>
        <CompanyListHeader count={5} />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
