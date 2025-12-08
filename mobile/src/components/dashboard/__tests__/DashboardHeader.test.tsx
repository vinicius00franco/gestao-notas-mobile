import React from 'react';
import { render } from '@testing-library/react-native';
import DashboardHeader from '../DashboardHeader';

describe('DashboardHeader', () => {
  it('renders title', () => {
    const { getByText } = render(<DashboardHeader />);

    expect(getByText('Dashboard de Gestão de NF')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<DashboardHeader />);

    expect(toJSON()).toMatchSnapshot();
  });
});