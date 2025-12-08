import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DraxView } from 'react-native-drax';
import { useTheme } from '@/theme/ThemeProvider';
import { NotaFiscal } from '@/types';

interface KanbanCardDraxProps {
  nota: NotaFiscal;
  index: number;
  columnId: string;
}

/**
 * KanbanCardDrax - Card arrastável usando react-native-drax
 * 
 * Muito mais simples que a implementação manual!
 * O DraxView cuida automaticamente de:
 * - Detecção de gestos (long press + pan)
 * - Animações de arrasto
 * - Feedback visual
 * - Colisão com zonas de soltura
 */
const KanbanCardDrax: React.FC<KanbanCardDraxProps> = ({
  nota,
  index,
  columnId,
}) => {
  const { colors, typography, shadows } = useTheme();

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return `R$ ${numValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <View style={styles.wrapper}>
      <DraxView
        style={[
          styles.card,
          { backgroundColor: colors.surface },
          shadows.small,
        ]}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.released}
        hoverDraggingStyle={styles.hoverDragging}
        dragPayload={{ item: nota, index, columnId }}
        longPressDelay={250}
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
          {nota.parceiro?.cnpj || 'N/A'}
        </Text>
      </DraxView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  card: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  dragging: {
    opacity: 0.8,
    transform: [{ scale: 1.03 }],
  },
  released: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  hoverDragging: {
    borderColor: '#2196F3',
    borderWidth: 2,
  },
});

export default KanbanCardDrax;
