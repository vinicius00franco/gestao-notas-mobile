import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { TopFornecedor } from '@/types';

type Props = {
  fornecedor: TopFornecedor;
  width?: number;
};

/**
 * Componente de card para exibir um fornecedor pendente.
 * Princípio de responsabilidade única: apenas exibe dados de um fornecedor.
 */
export default function FornecedorCard({ fornecedor, width = 280 }: Props) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    card: {
      width,
      padding: theme.spacing.m,
      marginRight: theme.spacing.m,
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.small,
    },
    nome: {
      ...theme.typography.h2,
      color: theme.colors.onSurface, // Preto sobre surface verde
      marginBottom: theme.spacing.xs,
    },
    cnpj: {
      ...theme.typography.body,
      color: theme.colors.onSurfaceVariant,
      marginBottom: theme.spacing.m,
    },
    label: {
      ...theme.typography.caption,
      color: theme.colors.onSurfaceVariant,
      marginBottom: theme.spacing.xs,
    },
    valor: {
      ...theme.typography.h1,
      color: theme.colors.text, // Preto para melhor contraste
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.nome} numberOfLines={2}>{fornecedor.nome}</Text>
      <Text style={styles.cnpj}>CNPJ: {fornecedor.cnpj}</Text>
      <Text style={styles.label}>Total a Pagar</Text>
      <Text style={styles.valor}>R$ {fornecedor.total_a_pagar.toFixed(2)}</Text>
    </View>
  );
}
