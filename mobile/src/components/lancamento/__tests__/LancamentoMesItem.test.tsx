import React from 'react';
import { render } from '@testing-library/react-native';
import LancamentoMesItem from '../LancamentoMesItem';

const mockItemPagar = {
  uuid: '1',
  descricao: 'Compra de Fertilizantes',
  valor: 350.80,
  data_vencimento: '2023-10-05',
  data_pagamento: null,
  clf_tipo: { nome: 'A Pagar' },
  clf_status: { nome: 'Pendente' },
  dt_criacao: '2023-10-01T00:00:00Z',
  dt_alteracao: '2023-10-01T00:00:00Z',
};

const mockItemReceber = {
  uuid: '2',
  descricao: 'Venda de Alface',
  valor: 750.00,
  data_vencimento: '2023-10-10',
  data_pagamento: null,
  clf_tipo: { nome: 'A Receber' },
  clf_status: { nome: 'Pendente' },
  dt_criacao: '2023-10-01T00:00:00Z',
  dt_alteracao: '2023-10-01T00:00:00Z',
};

describe('LancamentoMesItem', () => {
  it('deve renderizar corretamente um item de PAGAR', () => {
    const { getByText } = render(
      <LancamentoMesItem item={mockItemPagar} />
    );

    expect(getByText('Compra de Fertilizantes (2023-10-05)')).toBeTruthy();
    expect(getByText('R$ 350,80')).toBeTruthy();
  });

  it('deve renderizar corretamente um item de RECEBER', () => {
    const { getByText } = render(
      <LancamentoMesItem item={mockItemReceber} />
    );

    expect(getByText('Venda de Alface (2023-10-10)')).toBeTruthy();
    expect(getByText('R$ 750,00')).toBeTruthy();
  });

  it('matches snapshot - PAGAR', () => {
    const { toJSON } = render(
      <LancamentoMesItem item={mockItemPagar} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot - RECEBER', () => {
    const { toJSON } = render(
      <LancamentoMesItem item={mockItemReceber} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});