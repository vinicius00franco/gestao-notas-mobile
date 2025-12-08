import React from 'react';
import { Text } from 'react-native';
import { ListItem } from '@/components/ui';
import { formatCurrencyBRL } from '@/utils/format';

interface AccountItemProps {
  item: {
    uuid: string;
    descricao: string;
    data_vencimento: string;
    valor: number | string | null;
  };
}

export default function AccountItem({ item }: AccountItemProps) {
  return (
    <ListItem
      title={item.descricao}
      subtitle={`Venc.: ${new Date(item.data_vencimento).toLocaleDateString('pt-BR')}`}
      right={<Text>{formatCurrencyBRL(item.valor)}</Text>}
    />
  );
}