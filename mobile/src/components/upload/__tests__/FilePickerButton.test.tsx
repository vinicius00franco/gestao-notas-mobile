import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@/theme/ThemeProvider';
import FilePickerButton from '../FilePickerButton';

describe('FilePickerButton', () => {
  it('renders button with default text', () => {
    const mockOnPick = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <FilePickerButton onPickFile={mockOnPick} />
      </ThemeProvider>
    );

    expect(getByText('Escolher arquivo')).toBeTruthy();
  });

  it('renders button with file name when selected', () => {
    const mockOnPick = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <FilePickerButton 
          onPickFile={mockOnPick} 
          fileName="nota_fiscal.xml"
        />
      </ThemeProvider>
    );

    expect(getByText('Selecionado: nota_fiscal.xml')).toBeTruthy();
  });

  it('calls onPickFile when pressed', () => {
    const mockOnPick = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <FilePickerButton onPickFile={mockOnPick} />
      </ThemeProvider>
    );

    fireEvent.press(getByText('Escolher arquivo'));
    expect(mockOnPick).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const mockOnPick = jest.fn();
    const tree = render(
      <ThemeProvider>
        <FilePickerButton onPickFile={mockOnPick} />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
