import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import JobActionButtons from '../JobActionButtons';

const mockJob = {
  uuid: 'job-123',
  status: { codigo: 'PENDENTE', descricao: 'Aguardando' },
};

describe('JobActionButtons', () => {
  it('renders reprocess and delete buttons', () => {
    const { getByText } = render(
      <JobActionButtons item={mockJob as any} />
    );

    expect(getByText('Processar')).toBeTruthy();
    expect(getByText('Excluir')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <JobActionButtons item={mockJob as any} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});