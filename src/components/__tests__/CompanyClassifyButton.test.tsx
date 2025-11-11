import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import CompanyClassifyButton from '../CompanyClassifyButton';
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

describe('CompanyClassifyButton', () => {
  it('renders classify button', () => {
    const mockOnClassify = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <CompanyClassifyButton company={mockCompany} onClassify={mockOnClassify} />
      </ThemeProvider>
    );

    expect(getByText('Classificar')).toBeTruthy();
  });

  it('calls onClassify when pressed', () => {
    const mockOnClassify = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <CompanyClassifyButton company={mockCompany} onClassify={mockOnClassify} />
      </ThemeProvider>
    );

    fireEvent.press(getByText('Classificar'));
    expect(mockOnClassify).toHaveBeenCalledWith(mockCompany);
  });

  it('matches snapshot', () => {
    const mockOnClassify = jest.fn();
    const tree = render(
      <ThemeProvider>
        <CompanyClassifyButton company={mockCompany} onClassify={mockOnClassify} />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
