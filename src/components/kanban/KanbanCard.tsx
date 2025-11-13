import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '@/theme/ThemeProvider';
import { NotaFiscal } from '@/types';

interface KanbanCardProps {
  nota: NotaFiscal;
  index: number;
  columnIndex: number;
  onDragStart: (nota: NotaFiscal, columnIndex: number, itemIndex: number, x: number, y: number) => void;
  onDrag: (x: number, y: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  nota,
  index,
  columnIndex,
  onDragStart,
  onDrag,
  onDragEnd,
  isDragging,
}) => {
  const { colors, typography, shadows } = useTheme();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const zIndex = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return `R$ ${numValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const gestureHandler = (event: PanGestureHandlerGestureEvent) => {
    'worklet';
    if (event.nativeEvent.state === 2) {
      // ACTIVE
      translateX.value = startX.value + event.nativeEvent.translationX;
      translateY.value = startY.value + event.nativeEvent.translationY;
      
      // Tentar obter coordenadas absolutas
      const x = (event.nativeEvent as any).absoluteX ?? event.nativeEvent.x;
      const y = (event.nativeEvent as any).absoluteY ?? event.nativeEvent.y;
      runOnJS(onDrag)(x, y);
    } else if (event.nativeEvent.state === 1) {
      // START
      startX.value = translateX.value;
      startY.value = translateY.value;
      scale.value = withSpring(1.05);
      opacity.value = withSpring(0.9);
      zIndex.value = 1000;
      
      const x = (event.nativeEvent as any).absoluteX ?? event.nativeEvent.x;
      const y = (event.nativeEvent as any).absoluteY ?? event.nativeEvent.y;
      runOnJS(onDragStart)(nota, columnIndex, index, x, y);
    } else if (event.nativeEvent.state === 3 || event.nativeEvent.state === 5) {
      // END ou CANCELLED
      scale.value = withSpring(1);
      opacity.value = withSpring(1);
      zIndex.value = 0;
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      runOnJS(onDragEnd)();
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
      zIndex: zIndex.value,
    };
  });

  const cardStyle = useAnimatedStyle(() => ({
    elevation: isDragging ? 8 : 2,
    shadowOpacity: isDragging ? 0.3 : 0.1,
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} enabled={!isDragging}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: colors.surface },
            cardStyle,
            shadows.small,
          ]}
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
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  card: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});

export default KanbanCard;
