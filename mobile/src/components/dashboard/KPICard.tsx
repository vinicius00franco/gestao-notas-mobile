import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface KPICardProps {
  label: string;
  value: string | number;
}

export default function KPICard({ label, value }: KPICardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <Text style={[styles.value, { color: theme.colors.text }]}>
        {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
      </Text>
      <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '45%',
    margin: 4,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
  },
});