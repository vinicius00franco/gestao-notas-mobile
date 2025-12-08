import React from 'react';
import styled from 'styled-components';
import { CalendarDiaItem } from '../../api/calendar';

const ItemContainer = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Value = styled.span<{ type: 'PAGAR' | 'RECEBER' }>`
  font-size: 16px;
  font-weight: 500;
  color: ${({ type, theme }) => type === 'PAGAR' ? theme.colors.error : theme.colors.success};
`;

interface Props {
    item: CalendarDiaItem;
}

export const LancamentoCalendarItem: React.FC<Props> = ({ item }) => {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <ItemContainer>
            <Name>{item.nome_fantasia}</Name>
            <Value type={item.tipo}>{formatCurrency(item.valor)}</Value>
        </ItemContainer>
    );
};
