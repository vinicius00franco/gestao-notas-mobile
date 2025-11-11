import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorState from '../ErrorState';

describe('ErrorState', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders error message and retry button', () => {
    const { getByText } = render(
      <ErrorState message="Erro ao buscar dados" onRetry={mockOnRetry} />
    );

    expect(getByText('Erro ao buscar dados')).toBeTruthy();
    expect(getByText('Tentar novamente')).toBeTruthy();
  });

  it('calls onRetry when retry button is pressed', () => {
    const { getByText } = render(
      <ErrorState message="Erro ao buscar dados" onRetry={mockOnRetry} />
    );

    const retryButton = getByText('Tentar novamente');
    fireEvent.press(retryButton);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <ErrorState message="Erro ao buscar dados" onRetry={mockOnRetry} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});