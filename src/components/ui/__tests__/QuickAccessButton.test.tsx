import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QuickAccessButton from '../QuickAccessButton';

describe('QuickAccessButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders button title', () => {
    const { getByText } = render(
      <QuickAccessButton title="Dashboard" onPress={mockOnPress} />
    );

    expect(getByText('Dashboard')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <QuickAccessButton title="Dashboard" onPress={mockOnPress} />
    );

    const button = getByText('Dashboard');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <QuickAccessButton title="Dashboard" onPress={mockOnPress} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});