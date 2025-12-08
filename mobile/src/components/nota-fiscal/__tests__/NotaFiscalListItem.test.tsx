import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import NotaFiscalListItem from '../NotaFiscalListItem';

const mockNota = {
  id: '123',
  uuid: 'test-uuid',
  numero: 'NF-001',
  valor: 1500,
  valor_total: 1500.50,
  cnpj_emitente: '12.345.678/0001-99',
  nome_emitente: 'Empresa XYZ',
  classificacao_id: 'classif-123',
  parceiro: {
    uuid: 'partner-uuid',
    nome: 'Empresa XYZ',
    cnpj: '12.345.678/0001-99',
  },
};

describe('NotaFiscalListItem', () => {
  it('renders nota fiscal number and partner info', () => {
    const mockOnView = jest.fn();
    const mockOnDelete = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <NotaFiscalListItem
          nota={mockNota}
          onView={mockOnView}
          onDelete={mockOnDelete}
        />
      </ThemeProvider>
    );

    expect(getByText('NF-001')).toBeTruthy();
    expect(getByText(/Empresa XYZ/)).toBeTruthy();
  });

  it('displays formatted currency', () => {
    const mockOnView = jest.fn();
    const mockOnDelete = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <NotaFiscalListItem
          nota={mockNota}
          onView={mockOnView}
          onDelete={mockOnDelete}
        />
      </ThemeProvider>
    );

    expect(getByText(/R\$/)).toBeTruthy();
  });

  it('matches snapshot', () => {
    const mockOnView = jest.fn();
    const mockOnDelete = jest.fn();
    const tree = render(
      <ThemeProvider>
        <NotaFiscalListItem
          nota={mockNota}
          onView={mockOnView}
          onDelete={mockOnDelete}
        />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
