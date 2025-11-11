import React from 'react';
import { render } from '@testing-library/react-native';
import KPICard from '../KPICard';

describe('KPICard', () => {
  it('renders label and value', () => {
    const { getByText } = render(
      <KPICard label="NF Emitidas" value={150} />
    );

    expect(getByText('NF Emitidas')).toBeTruthy();
    expect(getByText('150')).toBeTruthy();
  });

  it('handles string value', () => {
    const { getByText } = render(
      <KPICard label="Valor Total" value="R$ 10.5K" />
    );

    expect(getByText('Valor Total')).toBeTruthy();
    expect(getByText('R$ 10.5K')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <KPICard label="NF Emitidas" value={150} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});