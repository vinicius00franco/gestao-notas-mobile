import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface FilterState {
  mes: number;
  ano: number;
  status: string;
}

interface DashboardFilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

export default function DashboardFilterBar({ filters, onFilterChange }: DashboardFilterBarProps) {
  const theme = useTheme();

  const handlePrevMonth = () => {
    onFilterChange({
      ...filters,
      mes: filters.mes - 1 || 12,
    });
  };

  const handleNextMonth = () => {
    onFilterChange({
      ...filters,
      mes: filters.mes + 1 > 12 ? 1 : filters.mes + 1,
    });
  };

  const handleStatusToggle = () => {
    onFilterChange({
      ...filters,
      status: filters.status === 'Pendente' ? '' : 'Pendente',
    });
  };

  return (
    <View style={[styles.container, { paddingHorizontal: theme.spacing.m, marginBottom: theme.spacing.m }]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
        onPress={handlePrevMonth}>
        <Text style={[styles.text, { color: theme.colors.text }]}>Mês Anterior</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
        onPress={handleNextMonth}>
        <Text style={[styles.text, { color: theme.colors.text }]}>Próximo Mês</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
        onPress={handleStatusToggle}>
        <Text style={[styles.text, { color: theme.colors.text }]}>Status: {filters.status || 'Todos'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
  },
});