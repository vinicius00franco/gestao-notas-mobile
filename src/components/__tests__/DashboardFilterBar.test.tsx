import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DashboardFilterBar from '../DashboardFilterBar';

describe('DashboardFilterBar', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders filter buttons', () => {
    const { getByText } = render(
      <DashboardFilterBar filters={{ mes: 1, ano: 2024, status: '' }} onFilterChange={mockOnFilterChange} />
    );

    expect(getByText(/Mês Anterior/)).toBeTruthy();
    expect(getByText(/Próximo Mês/)).toBeTruthy();
  });

  it('calls onFilterChange when month button is pressed', () => {
    const { getByText } = render(
      <DashboardFilterBar filters={{ mes: 1, ano: 2024, status: '' }} onFilterChange={mockOnFilterChange} />
    );

    const prevButton = getByText('Mês Anterior');
    fireEvent.press(prevButton);

    expect(mockOnFilterChange).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <DashboardFilterBar filters={{ mes: 1, ano: 2024, status: '' }} onFilterChange={mockOnFilterChange} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});