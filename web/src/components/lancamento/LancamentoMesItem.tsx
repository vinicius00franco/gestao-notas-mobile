import React from 'react';
import styled from 'styled-components';
import { Lancamento } from '../../api/calendar';

const ItemContainer = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const DateText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Value = styled.span<{ $isPagar: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: ${({ $isPagar, theme }) => $isPagar ? theme.colors.error : theme.colors.success};
`;

interface Props {
    item: Lancamento;
}

export const LancamentoMesItem: React.FC<Props> = ({ item }) => {
    const isPagar = item.clf_tipo.nome === 'A Pagar';
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    // Format date to DD/MM
    const dateFormatted = item.data_vencimento.split('-').reverse().slice(0, 2).join('/');

    return (
        <ItemContainer>
            <Description>
                <Title>{item.descricao}</Title>
                <DateText>{dateFormatted}</DateText>
            </Description>
            <Value $isPagar={isPagar}>{formatCurrency(item.valor)}</Value>
        </ItemContainer>
    );
};
