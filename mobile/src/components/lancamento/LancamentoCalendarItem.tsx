import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CalendarDiaItem {
  nome_fantasia: string;
  cnpj: string;
  valor: number;
  data: string;
  tipo: 'PAGAR' | 'RECEBER' | null;
}

interface LancamentoCalendarItemProps {
  item: CalendarDiaItem;
}

const LancamentoCalendarItem: React.FC<LancamentoCalendarItemProps> = ({ item }) => {
  const isPagar = item.tipo === 'PAGAR';

  const formatCurrencyBRL = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <View style={styles.detailItem}>
      <Text style={[styles.text, styles.bold]}>
        {item.nome_fantasia}
      </Text>
      <Text style={[styles.text, isPagar ? styles.error : styles.secondary]}>
        {formatCurrencyBRL(item.valor)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  text: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  error: {
    color: '#FF0000',
  },
  secondary: {
    color: '#00FF00',
  },
});

export default LancamentoCalendarItem;