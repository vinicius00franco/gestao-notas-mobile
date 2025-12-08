import React from 'react';
import styled from 'styled-components';
import { Lancamento } from '../../types';
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

type Props = { lancamento: Lancamento; tone?: 'success' | 'warning' | 'error' | 'info' };

export function LancamentoItem({ lancamento, tone = 'info' }: Props) {
  return (
    <Card>
      <Title>{lancamento.descricao}</Title>
      <Meta>Vencimento: {new Date(lancamento.data_vencimento).toLocaleDateString('pt-BR')}</Meta>
      <Meta>Tipo: {lancamento.clf_tipo.nome}</Meta>
      <Value>R$ {lancamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Value>
      <Tag tone={tone}>{lancamento.clf_status.nome}</Tag>
    </Card>
  );
}
