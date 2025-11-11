import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MainButton from '../MainButton';

describe('MainButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders button with text', () => {
    const { getByText } = render(
      <MainButton title="Entrar no App" onPress={mockOnPress} />
    );

    expect(getByText('Entrar no App')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <MainButton title="Entrar no App" onPress={mockOnPress} />
    );

    const button = getByText('Entrar no App');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <MainButton title="Entrar no App" onPress={mockOnPress} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});