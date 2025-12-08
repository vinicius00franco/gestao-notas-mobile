import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  overflow-x: auto;
`;

const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 10px 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`;

type FilterState = { mes: number; ano: number; status: string };

type Props = { filters: FilterState; onChange: (f: FilterState) => void };

export function FilterBar({ filters, onChange }: Props) {
  const handlePrev = () => onChange({ ...filters, mes: filters.mes === 1 ? 12 : filters.mes - 1 });
  const handleNext = () => onChange({ ...filters, mes: filters.mes === 12 ? 1 : filters.mes + 1 });
  const handleStatus = () => onChange({ ...filters, status: filters.status === 'Pendente' ? '' : 'Pendente' });

  return (
    <Bar>
      <Button onClick={handlePrev}>Mês Anterior</Button>
      <Button onClick={handleNext}>Próximo Mês</Button>
      <Button onClick={handleStatus}>Status: {filters.status || 'Todos'}</Button>
    </Bar>
  );
}
