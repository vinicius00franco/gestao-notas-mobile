import React from 'react';
import { render } from '@testing-library/react-native';
import LancamentoCalendarItem from '../LancamentoCalendarItem';

const mockItemPagar = {
  nome_fantasia: 'Empresa A',
  cnpj: '12.345.678/0001-99',
  valor: 1000.50,
  data: '2023-10-01',
  tipo: 'PAGAR' as const,
};

const mockItemReceber = {
  nome_fantasia: 'Empresa B',
  cnpj: '98.765.432/0001-11',
  valor: 2000.75,
  data: '2023-10-02',
  tipo: 'RECEBER' as const,
};

describe('LancamentoCalendarItem', () => {
  it('deve renderizar corretamente um item de PAGAR', () => {
    const { getByText } = render(
      <LancamentoCalendarItem item={mockItemPagar} />
    );

    expect(getByText('Empresa A')).toBeTruthy();
    expect(getByText('R$ 1.000,50')).toBeTruthy();
  });

  it('deve renderizar corretamente um item de RECEBER', () => {
    const { getByText } = render(
      <LancamentoCalendarItem item={mockItemReceber} />
    );

    expect(getByText('Empresa B')).toBeTruthy();
    expect(getByText('R$ 2.000,75')).toBeTruthy();
  });

  it('matches snapshot - PAGAR', () => {
    const { toJSON } = render(
      <LancamentoCalendarItem item={mockItemPagar} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot - RECEBER', () => {
    const { toJSON } = render(
      <LancamentoCalendarItem item={mockItemReceber} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});