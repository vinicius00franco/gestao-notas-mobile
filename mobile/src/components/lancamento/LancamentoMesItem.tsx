import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Lancamento {
  uuid: string;
  descricao: string;
  valor: number;
  data_vencimento: string;
  data_pagamento: string | null;
  clf_tipo: { nome: string };
  clf_status: { nome: string };
  dt_criacao: string;
  dt_alteracao: string;
}

interface LancamentoMesItemProps {
  item: Lancamento;
}

const LancamentoMesItem: React.FC<LancamentoMesItemProps> = ({ item }) => {
  const isPagar = item.clf_tipo.nome === 'A Pagar';

  const formatCurrencyBRL = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <View style={styles.detailItem}>
      <Text style={[styles.text, styles.bold]}>
        {item.descricao} ({item.data_vencimento})
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

export default LancamentoMesItem;