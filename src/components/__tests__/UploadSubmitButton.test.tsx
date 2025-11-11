import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import UploadSubmitButton from '../UploadSubmitButton';

describe('UploadSubmitButton', () => {
  it('renders button with default text', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <UploadSubmitButton onPress={mockOnPress} />
      </ThemeProvider>
    );

    expect(getByText('Processar Nota')).toBeTruthy();
  });

  it('disables button when disabled prop is true', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <UploadSubmitButton onPress={mockOnPress} disabled={true} />
      </ThemeProvider>
    );

    const button = getByTestId('submit-button');
    expect(button.props.disabled).toBe(true);
  });

  it('shows loading text when isLoading is true', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <UploadSubmitButton onPress={mockOnPress} isLoading={true} />
      </ThemeProvider>
    );

    expect(getByText('Enviando...')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <UploadSubmitButton onPress={mockOnPress} />
      </ThemeProvider>
    );

    fireEvent.press(getByText('Processar Nota'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const mockOnPress = jest.fn();
    const tree = render(
      <ThemeProvider>
        <UploadSubmitButton onPress={mockOnPress} />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
