import React from 'react';
import styled from 'styled-components';
import { DashboardKPIs } from '../../types';
import { Card } from '../ui/Card';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
`;

const Label = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const Value = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-top: 8px;
`;

type Props = { kpis: DashboardKPIs };

export function KpiGrid({ kpis }: Props) {
  const items = [
    { label: 'NF Emitidas', value: kpis.nf_emitidas.toLocaleString('pt-BR') },
    { label: 'NF Recebidas', value: kpis.nf_recebidas.toLocaleString('pt-BR') },
    { label: 'Valor Total Saída', value: `R$ ${kpis.valor_total_saida.toLocaleString('pt-BR')}` },
    { label: 'Impostos Retidos', value: `R$ ${kpis.impostos_retidos.toLocaleString('pt-BR')}` },
  ];

  return (
    <Grid>
      {items.map((item) => (
        <Card key={item.label}>
          <Label>{item.label}</Label>
          <Value>{item.value}</Value>
        </Card>
      ))}
    </Grid>
  );
}
