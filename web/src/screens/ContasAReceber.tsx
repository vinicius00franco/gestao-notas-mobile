import React from 'react';
import styled from 'styled-components';
import { contasAReceber } from '../data/contas';
import { LancamentoItem } from '../components/contas/LancamentoItem';
import { SectionTitle } from '../components/ui/SectionTitle';

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export function ContasAReceber() {
  return (
    <Grid>
      <SectionTitle>Contas a Receber</SectionTitle>
      {contasAReceber.map((item) => (
        <LancamentoItem key={item.uuid} lancamento={item} tone="success" />
      ))}
    </Grid>
  );
}
