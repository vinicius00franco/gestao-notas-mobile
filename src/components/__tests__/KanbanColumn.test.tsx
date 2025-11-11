import React from 'react';
import { render } from '@testing-library/react-native';
import KanbanColumn from '../KanbanColumn';
import NotaFiscalCard from '../NotaFiscalCard';

const mockNota: any = {
  uuid: 'nota-1',
  numero: 'NF-001',
  valor_total: 1000,
  nome_emitente: 'Empresa A',
  cnpj_emitente: '12.345.678/0001-99',
  classificacao_id: '1',
  parceiro: {
    uuid: 'parceiro-1',
    nome: 'Empresa A',
    cnpj: '12.345.678/0001-99',
  },
};

const mockColumn = {
  id: '1',
  nome: 'Não Classificado',
  notas: [mockNota],
};

describe('KanbanColumn', () => {
  it('deve renderizar corretamente o título da coluna', () => {
    const { getByText } = render(
      <KanbanColumn column={mockColumn} />
    );

    expect(getByText('Não Classificado')).toBeTruthy();
  });

  it('deve renderizar as notas da coluna', () => {
    const { getByText } = render(
      <KanbanColumn column={mockColumn} />
    );

    expect(getByText('Nota Fiscal: NF-001')).toBeTruthy();
  });

  it('deve renderizar coluna vazia', () => {
    const emptyColumn = { ...mockColumn, notas: [] };
    const { getByText } = render(
      <KanbanColumn column={emptyColumn} />
    );

    expect(getByText('Não Classificado')).toBeTruthy();
  });

  it('matches snapshot with notas', () => {
    const { toJSON } = render(
      <KanbanColumn column={mockColumn} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot empty column', () => {
    const emptyColumn = { ...mockColumn, notas: [] };
    const { toJSON } = render(
      <KanbanColumn column={emptyColumn} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});