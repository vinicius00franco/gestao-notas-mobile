import React from 'react';
import { render } from '@testing-library/react-native';
import AccountItem from '../AccountItem';

describe('AccountItem', () => {
  const mockItem = {
    uuid: '123',
    descricao: 'Conta de luz',
    data_vencimento: '2024-01-15',
    valor: 150.50
  };

  it('renders account description, due date and value', () => {
    const { getByText } = render(<AccountItem item={mockItem} />);

    expect(getByText('Conta de luz')).toBeTruthy();
    expect(getByText(/Venc\.: \d{2}\/\d{2}\/\d{4}/)).toBeTruthy();
    expect(getByText('R$ 150,50')).toBeTruthy();
  });

  it('handles null value', () => {
    const itemWithNullValue = { ...mockItem, valor: null };
    const { getByText } = render(<AccountItem item={itemWithNullValue} />);

    expect(getByText('R$ 0,00')).toBeTruthy();
  });

  it('handles string value', () => {
    const itemWithStringValue = { ...mockItem, valor: '200.75' };
    const { getByText } = render(<AccountItem item={itemWithStringValue} />);

    expect(getByText('R$ 200,75')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<AccountItem item={mockItem} />);

    expect(toJSON()).toMatchSnapshot();
  });
});