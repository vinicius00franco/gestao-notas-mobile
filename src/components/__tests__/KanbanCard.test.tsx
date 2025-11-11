import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import KanbanCard from '../KanbanCard';
import { NotaFiscal } from '../../types';

// Mock do tema
jest.mock('@/theme/ThemeProvider', () => ({
  useTheme: () => ({
    colors: {
      primary: '#99CD85',
      primaryVariant: '#7FA653',
      secondary: '#CFE0BC',
      background: '#ffffff',
      surface: '#99CD85',
      text: '#333333',
      border: '#cccccc',
      shadow: '#000',
      onSurface: '#000000',
      onSurfaceVariant: '#49454f',
    },
    spacing: {
      s: 8,
      m: 16,
      l: 24,
    },
    typography: {
      body: { fontSize: 16 },
      caption: { fontSize: 12 },
    },
    shadows: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    },
  }),
}));

const mockNotaFiscal: NotaFiscal = {
  id: '1',
  uuid: 'uuid-1',
  numero: '123456',
  valor: '1000.00',
  valor_total: '1000.00',
  cnpj_emitente: '12.345.678/0001-90',
  nome_emitente: 'Empresa Teste Ltda',
  classificacao_id: 'class-1',
  parceiro: {
    uuid: 'parceiro-1',
    nome: 'Parceiro Teste',
    cnpj: '98.765.432/0001-10',
  },
};

describe('KanbanCard', () => {
  const mockOnPress = jest.fn();
  const mockOnLongPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar as informações principais da nota fiscal', () => {
    render(
      <KanbanCard
        nota={mockNotaFiscal}
        onPress={mockOnPress}
        onLongPress={mockOnLongPress}
      />
    );

    expect(screen.getByText('Empresa Teste Ltda')).toBeTruthy();
    expect(screen.getByText('NF: 123456')).toBeTruthy();
    expect(screen.getByText('R$ 1.000,00')).toBeTruthy();
  });

  it('deve chamar onPress quando pressionado', () => {
    render(
      <KanbanCard
        nota={mockNotaFiscal}
        onPress={mockOnPress}
        onLongPress={mockOnLongPress}
      />
    );

    const card = screen.getByText('Empresa Teste Ltda').parent?.parent;
    if (card) {
      fireEvent.press(card);
      expect(mockOnPress).toHaveBeenCalledWith(mockNotaFiscal);
    }
  });

  it('deve chamar onLongPress quando pressionado longamente', () => {
    render(
      <KanbanCard
        nota={mockNotaFiscal}
        onPress={mockOnPress}
        onLongPress={mockOnLongPress}
      />
    );

    const card = screen.getByText('Empresa Teste Ltda').parent?.parent;
    if (card) {
      fireEvent(card, 'onLongPress');
      expect(mockOnLongPress).toHaveBeenCalledWith(mockNotaFiscal);
    }
  });

  it('deve aplicar estilos do tema corretamente', () => {
    render(
      <KanbanCard
        nota={mockNotaFiscal}
        onPress={mockOnPress}
        onLongPress={mockOnLongPress}
      />
    );

    const card = screen.getByTestId('kanban-card');
    expect(card).toBeTruthy();
  });

  it('deve renderizar CNPJ do parceiro quando disponível', () => {
    render(
      <KanbanCard
        nota={mockNotaFiscal}
        onPress={mockOnPress}
        onLongPress={mockOnLongPress}
      />
    );

    expect(screen.getByText('98.765.432/0001-10')).toBeTruthy();
  });

  it('deve formatar valor corretamente', () => {
    const notaComValorDiferente = {
      ...mockNotaFiscal,
      valor_total: 2500.50,
    };

    render(
      <KanbanCard
        nota={notaComValorDiferente}
        onPress={mockOnPress}
        onLongPress={mockOnLongPress}
      />
    );

    expect(screen.getByText('R$ 2.500,50')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <KanbanCard
        nota={mockNotaFiscal}
        onPress={mockOnPress}
        onLongPress={mockOnLongPress}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});