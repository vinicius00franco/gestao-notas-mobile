import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import CompanyListItem from '../CompanyListItem';
import { UnclassifiedCompany } from '@/types';

const mockCompany: UnclassifiedCompany = {
  id: 1,
  nome_fantasia: 'Empresa XYZ',
  razao_social: 'XYZ Comércio LTDA',
  cnpj: '12.345.678/0001-99',
  logradouro: 'Rua A',
  numero: '123',
  bairro: 'Centro',
  cidade: 'São Paulo',
  uf: 'SP',
  cep: '01310-100',
  telefone: '(11) 3000-0000',
  email: 'contact@xyz.com',
  classification: 'Fornecedor',
};

describe('CompanyListItem', () => {
  it('renders company name and CNPJ', () => {
    const mockOnClassify = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <CompanyListItem company={mockCompany} onClassify={mockOnClassify} />
      </ThemeProvider>
    );

    expect(getByText('Empresa XYZ')).toBeTruthy();
    expect(getByText('12.345.678/0001-99')).toBeTruthy();
  });

  it('renders classify button', () => {
    const mockOnClassify = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <CompanyListItem company={mockCompany} onClassify={mockOnClassify} />
      </ThemeProvider>
    );

    expect(getByText('Classificar')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const mockOnClassify = jest.fn();
    const tree = render(
      <ThemeProvider>
        <CompanyListItem company={mockCompany} onClassify={mockOnClassify} />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
