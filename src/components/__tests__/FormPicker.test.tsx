import React from 'react';
import { render } from '@testing-library/react-native';
import FormPicker from '../FormPicker';

describe('FormPicker', () => {
  const mockItems = [
    { label: 'Fornecedor', value: 'fornecedor' },
    { label: 'Cliente', value: 'cliente' },
    { label: 'Outra Empresa', value: 'outra_empresa' },
  ];

  it('deve renderizar corretamente com itens', () => {
    const { getByTestId } = render(
      <FormPicker
        selectedValue="fornecedor"
        onValueChange={() => {}}
        items={mockItems}
        testID="form-picker"
      />
    );

    expect(getByTestId('form-picker')).toBeTruthy();
  });

  it('deve renderizar com diferentes valores selecionados', () => {
    const { getByTestId, rerender } = render(
      <FormPicker
        selectedValue="fornecedor"
        onValueChange={() => {}}
        items={mockItems}
        testID="form-picker"
      />
    );

    expect(getByTestId('form-picker')).toBeTruthy();

    // Re-render com valor diferente
    rerender(
      <FormPicker
        selectedValue="cliente"
        onValueChange={() => {}}
        items={mockItems}
        testID="form-picker"
      />
    );

    expect(getByTestId('form-picker')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <FormPicker
        selectedValue="fornecedor"
        onValueChange={() => {}}
        items={mockItems}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot with different selection', () => {
    const { toJSON } = render(
      <FormPicker
        selectedValue="cliente"
        onValueChange={() => {}}
        items={mockItems}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});