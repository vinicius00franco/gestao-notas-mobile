import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { NotaFiscal } from '@/types';
import { ListItem } from '@/components/ListItem';
import { formatCurrencyBRL } from '../utils/format';
import NotaFiscalActionButtons from './NotaFiscalActionButtons';

interface NotaFiscalListItemProps {
  nota: NotaFiscal;
  onView: (nota: NotaFiscal) => void;
  onDelete: (uuid: string) => void;
  isDeleting?: boolean;
}

const NotaFiscalListItem: React.FC<NotaFiscalListItemProps> = ({
  nota,
  onView,
  onDelete,
  isDeleting = false,
}) => {
  const { colors } = useTheme();

  return (
    <ListItem
      title={nota.numero}
      subtitle={`${nota.parceiro?.nome ?? ''} • ${nota.parceiro?.cnpj ?? ''}`}
      right={
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={{ color: colors.text }}>{formatCurrencyBRL(nota.valor_total)}</Text>
          <NotaFiscalActionButtons
            nota={nota}
            onView={onView}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        </View>
      }
    />
  );
};

export default NotaFiscalListItem;
