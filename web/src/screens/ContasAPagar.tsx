import React from 'react';
import styled from 'styled-components';
import { contasAPagar } from '../data/contas';
import { LancamentoItem } from '../components/contas/LancamentoItem';
import { SectionTitle } from '../components/ui/SectionTitle';

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export function ContasAPagar() {
  return (
    <Grid>
      <SectionTitle>Contas a Pagar</SectionTitle>
      {contasAPagar.map((item) => (
        <LancamentoItem key={item.uuid} lancamento={item} tone="warning" />
      ))}
    </Grid>
  );
}
