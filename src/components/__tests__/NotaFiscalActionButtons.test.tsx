import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import NotaFiscalActionButtons from '../NotaFiscalActionButtons';

const mockNota = {
  id: '123',
  uuid: 'test-uuid',
  numero: 'NF-001',
  valor: 1500,
  valor_total: 1500,
  cnpj_emitente: '12.345.678/0001-99',
  nome_emitente: 'Empresa XYZ',
  classificacao_id: 'classif-123',
  parceiro: {
    uuid: 'partner-uuid',
    nome: 'Empresa XYZ',
    cnpj: '12.345.678/0001-99',
  },
};

describe('NotaFiscalActionButtons', () => {
  it('renders both action buttons', () => {
    const mockOnView = jest.fn();
    const mockOnDelete = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <NotaFiscalActionButtons
          nota={mockNota}
          onView={mockOnView}
          onDelete={mockOnDelete}
        />
      </ThemeProvider>
    );

    expect(getByText('Ver')).toBeTruthy();
    expect(getByText('Excluir')).toBeTruthy();
  });

  it('calls onView when Ver button is pressed', () => {
    const mockOnView = jest.fn();
    const mockOnDelete = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <NotaFiscalActionButtons
          nota={mockNota}
          onView={mockOnView}
          onDelete={mockOnDelete}
        />
      </ThemeProvider>
    );

    fireEvent.press(getByText('Ver'));
    expect(mockOnView).toHaveBeenCalledWith(mockNota);
  });

  it('disables delete button when isDeleting is true', () => {
    const mockOnView = jest.fn();
    const mockOnDelete = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <NotaFiscalActionButtons
          nota={mockNota}
          onView={mockOnView}
          onDelete={mockOnDelete}
          isDeleting={true}
        />
      </ThemeProvider>
    );

    const deleteButton = getByTestId('delete-button');
    expect(deleteButton.props.disabled).toBe(true);
  });

  it('matches snapshot', () => {
    const mockOnView = jest.fn();
    const mockOnDelete = jest.fn();
    const tree = render(
      <ThemeProvider>
        <NotaFiscalActionButtons
          nota={mockNota}
          onView={mockOnView}
          onDelete={mockOnDelete}
        />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
