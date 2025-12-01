import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { NotaFiscal } from '@/types';
import { formatCurrencyBRL } from '@/utils/format';
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
    <View style={{ padding: 16, borderBottomWidth: 1, borderColor: colors.border }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, marginRight: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
            {nota.numero}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 8 }}>
            {formatCurrencyBRL(nota.valor_total)}
          </Text>
          <Text style={{ fontSize: 14, color: colors.placeholder }}>
            {nota.parceiro?.nome ?? ''} • {nota.parceiro?.cnpj ?? ''}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <NotaFiscalActionButtons
            nota={nota}
            onView={onView}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        </View>
      </View>
    </View>
  );
};

export default NotaFiscalListItem;
