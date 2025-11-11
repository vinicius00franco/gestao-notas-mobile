import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import NotaFiscalInfo from '../NotaFiscalInfo';
import { NotaFiscal } from '@/types';

const mockNota: NotaFiscal = {
  id: '123',
  uuid: '123e4567-e89b-12d3-a456-426614174000',
  numero: 'NF-001',
  valor: 1500.50,
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

describe('NotaFiscalInfo', () => {
  it('renders nota fiscal information', () => {
    const { getByText } = render(
      <ThemeProvider>
        <NotaFiscalInfo nota={mockNota} />
      </ThemeProvider>
    );

    expect(getByText('123e4567-e89b-12d3-a456-426614174000')).toBeTruthy();
    expect(getByText('NF-001')).toBeTruthy();
    expect(getByText('1500.50')).toBeTruthy();
    expect(getByText('12.345.678/0001-99')).toBeTruthy();
    expect(getByText('Empresa XYZ')).toBeTruthy();
  });

  it('renders with missing parceiro gracefully', () => {
    const notaWithoutParceiro = { ...mockNota, parceiro: undefined };
    const { queryByText } = render(
      <ThemeProvider>
        <NotaFiscalInfo nota={notaWithoutParceiro} />
      </ThemeProvider>
    );

    expect(queryByText('UUID:')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(
      <ThemeProvider>
        <NotaFiscalInfo nota={mockNota} />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
