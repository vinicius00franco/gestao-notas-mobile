import React from 'react';
import styled from 'styled-components';
import { AlertItem } from '../../types';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  font-size: 14px;
`;

type Props = { alert: AlertItem };

export function AlertCard({ alert }: Props) {
  return (
    <Card style={{ width: 280 }}>
      <Title>{alert.tipo}</Title>
      <Tag tone={alert.quantidade > 0 ? 'warning' : 'info'}>
        {alert.quantidade} alerta{alert.quantidade === 1 ? '' : 's'}
      </Tag>
      <Description>{alert.descricao}</Description>
    </Card>
  );
}
