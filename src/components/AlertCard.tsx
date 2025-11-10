import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { AlertItem } from '@/types';

type Props = {
  alert: AlertItem;
  width?: number;
};

/**
 * Componente de card para exibir um alerta fiscal.
 * Princípio de responsabilidade única: apenas exibe um alerta.
 */
export default function AlertCard({ alert, width = 280 }: Props) {
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
    title: {
      ...theme.typography.h2,
      color: theme.colors.error,
      marginBottom: theme.spacing.s,
    },
    badge: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.error,
      paddingHorizontal: theme.spacing.s,
      paddingVertical: 4,
      borderRadius: 12,
      marginBottom: theme.spacing.s,
    },
    badgeText: {
      ...theme.typography.caption,
      color: theme.colors.onError,
      fontWeight: 'bold',
    },
    description: {
      ...theme.typography.body,
      color: theme.colors.onSurface, // Preto sobre surface verde
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{alert.tipo}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{alert.quantidade} ocorrências</Text>
      </View>
      <Text style={styles.description}>{alert.descricao}</Text>
    </View>
  );
}
