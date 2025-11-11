import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { NotaFiscal } from '@/types';

interface NotaFiscalInfoProps {
  nota: NotaFiscal;
}

const NotaFiscalInfo: React.FC<NotaFiscalInfoProps> = ({ nota }) => {
  const { colors, typography } = useTheme();

  const renderField = (label: string, value: string | number | undefined) => (
    <View style={styles.field}>
      <Text style={[typography.caption, { color: colors.placeholder }]}>{label}</Text>
      <Text style={[typography.body, { color: colors.text }]}>{value || 'N/A'}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {renderField('UUID:', nota.uuid)}
      {renderField('Número:', nota.numero)}
      {renderField('Valor Total:', String(nota.valor_total))}
      {renderField('CNPJ Emitente:', nota.parceiro?.cnpj)}
      {renderField('Nome Emitente:', nota.parceiro?.nome)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  field: {
    marginBottom: 8,
  },
});

export default NotaFiscalInfo;
