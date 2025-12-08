import React from 'react';
import styled from 'styled-components';
import { TopFornecedor } from '../../types';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';

const Name = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
`;

const Cnpj = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-bottom: 12px;
`;

const Value = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

type Props = { fornecedor: TopFornecedor };

export function FornecedorCard({ fornecedor }: Props) {
  return (
    <Card style={{ width: 280 }}>
      <Name>{fornecedor.nome}</Name>
      <Cnpj>{fornecedor.cnpj}</Cnpj>
      <Value>R$ {fornecedor.total_a_pagar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Value>
      <Tag tone="info">Pendente</Tag>
    </Card>
  );
}
