import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorButton from '../ErrorButton';

describe('ErrorButton', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders button with text', () => {
    const { getByText } = render(
      <ErrorButton onRetry={mockOnRetry} />
    );

    expect(getByText('Tentar Novamente')).toBeTruthy();
  });

  it('calls onRetry when pressed', () => {
    const { getByText } = render(
      <ErrorButton onRetry={mockOnRetry} />
    );

    const button = getByText('Tentar Novamente');
    fireEvent.press(button);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <ErrorButton onRetry={mockOnRetry} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});