import React from 'react';
import { render } from '@testing-library/react-native';
import TabBar from '../TabBar';

const mockTabs = [
  { key: 'PENDENTE', label: 'Pendentes', count: 5 },
  { key: 'CONCLUIDO', label: 'Concluídas', count: 3 },
  { key: 'ERRO', label: 'Erros', count: 1 },
];

describe('TabBar', () => {
  const mockOnTabPress = jest.fn();

  it('renders all tabs with counts', () => {
    const { getByText } = render(
      <TabBar tabs={mockTabs} activeIndex={0} onTabPress={mockOnTabPress} />
    );

    expect(getByText(/Pendentes \(5\)/)).toBeTruthy();
    expect(getByText(/Concluídas \(3\)/)).toBeTruthy();
    expect(getByText(/Erros \(1\)/)).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <TabBar tabs={mockTabs} activeIndex={0} onTabPress={mockOnTabPress} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});