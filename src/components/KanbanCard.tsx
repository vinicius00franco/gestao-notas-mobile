import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { NotaFiscal } from '../types';

interface KanbanCardProps {
  nota: NotaFiscal;
  onPress: (nota: NotaFiscal) => void;
  onLongPress: (nota: NotaFiscal) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ nota, onPress, onLongPress }) => {
  const { colors, spacing, typography, shadows } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return `R$ ${numValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const animateScale = (to: number) => {
    Animated.spring(scale, {
      toValue: to,
      useNativeDriver: true,
      friction: 6,
      tension: 200,
    }).start();
  };

  return (
    <Animated.View style={[styles.animated, { transform: [{ scale }] }]}> 
      <TouchableOpacity
        testID="kanban-card"
        style={[styles.card, { backgroundColor: colors.surface, ...shadows.small }]}
        onPress={() => onPress(nota)}
        onLongPress={() => onLongPress(nota)}
        onPressIn={() => animateScale(0.97)}
        onPressOut={() => animateScale(1)}
        activeOpacity={0.8}
      >
        <Text style={[typography.body, { color: colors.onSurface, fontWeight: 'bold' }]}>
          {nota.nome_emitente}
        </Text>
        <Text style={[typography.caption, { color: colors.onSurfaceVariant }]}>
          NF: {nota.numero}
        </Text>
        <Text style={[typography.body, { color: colors.primary, fontWeight: 'bold' }]}>
          {formatCurrency(nota.valor_total)}
        </Text>
        <Text style={[typography.caption, { color: colors.onSurfaceVariant }]}>
          {nota.parceiro.cnpj}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animated: {
    borderRadius: 8,
  },
  card: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});

export default KanbanCard;