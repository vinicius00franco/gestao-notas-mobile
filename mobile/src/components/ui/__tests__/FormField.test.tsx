import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FormField from '../FormField';

describe('FormField', () => {
  it('deve renderizar corretamente com placeholder', () => {
    const { getByPlaceholderText } = render(
      <FormField
        placeholder="Nome Fantasia"
        value=""
        onChangeText={() => {}}
      />
    );

    expect(getByPlaceholderText('Nome Fantasia')).toBeTruthy();
  });

  it('deve renderizar com valor fornecido', () => {
    const { getByDisplayValue } = render(
      <FormField
        placeholder="Nome Fantasia"
        value="Empresa Teste"
        onChangeText={() => {}}
      />
    );

    expect(getByDisplayValue('Empresa Teste')).toBeTruthy();
  });

  it('deve chamar onChangeText quando o texto muda', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <FormField
        placeholder="Nome Fantasia"
        value=""
        onChangeText={mockOnChange}
      />
    );

    const input = getByPlaceholderText('Nome Fantasia');
    fireEvent.changeText(input, 'Novo valor');

    expect(mockOnChange).toHaveBeenCalledWith('Novo valor');
  });

  it('deve ser editável por padrão', () => {
    const { getByPlaceholderText } = render(
      <FormField
        placeholder="Nome Fantasia"
        value=""
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText('Nome Fantasia');
    expect(input.props.editable).toBe(true);
  });

  it('deve respeitar prop editable', () => {
    const { getByDisplayValue } = render(
      <FormField
        placeholder="CNPJ"
        value="12.345.678/0001-99"
        onChangeText={() => {}}
        editable={false}
      />
    );

    const input = getByDisplayValue('12.345.678/0001-99');
    expect(input.props.editable).toBe(false);
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <FormField
        placeholder="Nome Fantasia"
        value=""
        onChangeText={() => {}}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot with value', () => {
    const { toJSON } = render(
      <FormField
        placeholder="Nome Fantasia"
        value="Empresa Teste"
        onChangeText={() => {}}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});