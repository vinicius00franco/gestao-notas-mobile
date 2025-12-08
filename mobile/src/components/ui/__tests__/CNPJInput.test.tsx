import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import CNPJInput from '../CNPJInput';

describe('CNPJInput', () => {
  it('renders input with placeholder', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <ThemeProvider>
        <CNPJInput value="" onChangeText={mockOnChange} />
      </ThemeProvider>
    );

    expect(getByPlaceholderText('CNPJ (opcional)')).toBeTruthy();
  });

  it('displays provided value', () => {
    const mockOnChange = jest.fn();
    const { getByDisplayValue } = render(
      <ThemeProvider>
        <CNPJInput value="12.345.678/0001-99" onChangeText={mockOnChange} />
      </ThemeProvider>
    );

    expect(getByDisplayValue('12.345.678/0001-99')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const mockOnChange = jest.fn();
    const tree = render(
      <ThemeProvider>
        <CNPJInput value="" onChangeText={mockOnChange} />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
