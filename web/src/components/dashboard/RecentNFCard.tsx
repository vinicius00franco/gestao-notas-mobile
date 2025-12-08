import React from 'react';
import styled from 'styled-components';
import { RecentNF } from '../../types';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const Meta = styled.div`
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  font-size: 14px;
  margin-bottom: 10px;
`;

const Value = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

type Props = { nota: RecentNF };

export function RecentNFCard({ nota }: Props) {
  const tone = nota.status === 'Pago' ? 'success' : nota.status === 'Pendente' ? 'warning' : 'error';

  return (
    <Card style={{ width: 280 }}>
      <Title>{nota.nome_razao_social}</Title>
      <Meta>{nota.numero_data}</Meta>
      <Value>R$ {nota.valor.toFixed(2)}</Value>
      <Tag tone={tone}>{nota.status}</Tag>
    </Card>
  );
}
