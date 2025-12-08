import React from 'react';
import styled from 'styled-components';
import { NotaFiscal } from '../../types';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';

const Title = styled.div`
  font-weight: 700;
  margin-bottom: 4px;
`;

const Meta = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const Value = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 8px;
`;

type Props = { nota: NotaFiscal };

export function NotaListItem({ nota }: Props) {
  const tone = nota.status === 'Pago' ? 'success' : nota.status === 'Pendente' ? 'warning' : 'error';

  return (
    <Card>
      <Title>{nota.nome_emitente}</Title>
      <Meta>{nota.cnpj_emitente}</Meta>
      <Meta>NF {nota.numero}</Meta>
      <Value>R$ {nota.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Value>
      <Tag tone={tone}>{nota.status}</Tag>
    </Card>
  );
}
