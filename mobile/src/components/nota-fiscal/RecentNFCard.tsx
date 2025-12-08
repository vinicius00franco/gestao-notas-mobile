import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { RecentNF } from '@/types';

type Props = {
  nota: RecentNF;
  width?: number;
};

/**
 * Componente de card para exibir uma nota fiscal recente.
 * Princípio de responsabilidade única: apenas exibe uma NF.
 */
export default function RecentNFCard({ nota, width = 280 }: Props) {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago':
        return theme.colors.primary;
      case 'Pendente':
        return '#FF6B35'; // Laranja vibrante que contrasta bem com o verde #99CD85
      case 'Cancelado':
        return theme.colors.error;
      default:
        return theme.colors.onSurfaceVariant;
    }
  };

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
    empresa: {
      ...theme.typography.h2,
      color: theme.colors.onSurface, // Preto sobre surface verde
      marginBottom: theme.spacing.xs,
    },
    numero: {
      ...theme.typography.body,
      color: theme.colors.onSurfaceVariant,
      marginBottom: theme.spacing.s,
    },
    valor: {
      ...theme.typography.h1,
      color: theme.colors.text, // Preto para melhor contraste
      marginBottom: theme.spacing.s,
    },
    statusContainer: {
      alignSelf: 'flex-start',
      paddingHorizontal: theme.spacing.s,
      paddingVertical: 4,
      borderRadius: 4,
      backgroundColor: theme.colors.primaryContainer,
    },
    status: {
      ...theme.typography.caption,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.empresa} numberOfLines={1}>{nota.nome_razao_social}</Text>
      <Text style={styles.numero}>{nota.numero_data}</Text>
      <Text style={styles.valor}>R$ {nota.valor.toFixed(2)}</Text>
      <View style={[styles.statusContainer, { backgroundColor: getStatusColor(nota.status) + '20' }]}>
        <Text style={[styles.status, { color: getStatusColor(nota.status) }]}>{nota.status}</Text>
      </View>
    </View>
  );
}
