import React from 'react';
import { render } from '@testing-library/react-native';
import JobItemComponent from '../JobItemComponent';

const mockJob = {
  uuid: 'job-123',
  status: { codigo: 'PENDENTE', descricao: 'Aguardando' },
  numero_nota: 'NF-001',
  erro: null,
};

describe('JobItemComponent', () => {
  it('renders job uuid', () => {
    const { getByText } = render(
      <JobItemComponent item={mockJob as any} />
    );

    expect(getByText(/UUID: job-123/)).toBeTruthy();
  });

  it('renders status code', () => {
    const { getByText } = render(
      <JobItemComponent item={mockJob as any} />
    );

    expect(getByText(/Status: PENDENTE/)).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <JobItemComponent item={mockJob as any} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});