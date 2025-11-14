import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  PanGestureHandler,
  LongPressGestureHandler,
  PanGestureHandlerGestureEvent,
  LongPressGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
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

/**
 * KanbanCard - Card arrastável no quadro Kanban
 * 
 * Este componente implementa a funcionalidade de arrastar e soltar usando:
 * - LongPressGestureHandler: Detecta quando o usuário pressiona e segura o card
 * - PanGestureHandler: Rastreia o movimento do dedo durante o arrasto
 * - Reanimated: Fornece animações suaves e feedback visual
 * 
 * Fluxo de eventos:
 * 1. Usuário pressiona e segura (300ms) -> onLongPress -> onDragStart
 * 2. Usuário move o dedo -> panHandler -> onDrag
 * 3. Usuário solta -> panHandler (END) -> onDragEnd
 */
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
  // Valores animados para controlar a aparência do card durante o arrasto
  const translateX = useSharedValue(0);  // Posição X do card
  const translateY = useSharedValue(0);  // Posição Y do card
  const scale = useSharedValue(1);       // Escala (aumenta durante arrasto)
  const opacity = useSharedValue(1);     // Opacidade (diminui durante arrasto)
  const zIndex = useSharedValue(0);      // Z-index (eleva card durante arrasto)
  const isDraggingRef = useSharedValue(false);  // Flag de controle de arrasto
  
  // Refs para os handlers de gesto (necessários para simultaneousHandlers)
  const longPressRef = React.useRef(null);
  const panRef = React.useRef(null);

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return `R$ ${numValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  /**
   * Handler de long press - Inicia o processo de arrasto
   * Chamado quando o usuário pressiona e segura o card por 300ms
   */
  const onLongPress = (event: LongPressGestureHandlerStateChangeEvent) => {
    'worklet';
    if (event.nativeEvent.state === State.ACTIVE) {
      isDraggingRef.value = true;
      // Feedback visual: aumenta o card e reduz opacidade
      scale.value = withSpring(1.05);
      opacity.value = withSpring(0.9);
      zIndex.value = 1000;  // Coloca o card na frente de tudo
      
      // Obtém coordenadas absolutas do toque
      const x = (event.nativeEvent as any).absoluteX ?? event.nativeEvent.x;
      const y = (event.nativeEvent as any).absoluteY ?? event.nativeEvent.y;
      runOnJS(onDragStart)(nota, columnIndex, index, x, y);
    }
  };

  /**
   * Handler de pan - Gerencia o movimento do card durante o arrasto
   * Rastreia a posição do dedo e notifica o KanbanBoard
   */
  const panHandler = (event: PanGestureHandlerGestureEvent) => {
    'worklet';
    const state = event.nativeEvent.state;
    
    if (state === State.BEGAN) {
      // Início do movimento (opcional)
      if (!isDraggingRef.value) {
        return;
      }
    } else if (state === State.ACTIVE) {
      // Durante o movimento: atualiza posição do card
      if (!isDraggingRef.value) {
        return;
      }
      translateX.value = event.nativeEvent.translationX;
      translateY.value = event.nativeEvent.translationY;
      
      // Calcula posição absoluta e notifica o board
      const x = (event.nativeEvent as any).absoluteX ?? event.nativeEvent.translationX;
      const y = (event.nativeEvent as any).absoluteY ?? event.nativeEvent.translationY;
      runOnJS(onDrag)(x, y);
    } else if (state === State.END || state === State.CANCELLED || state === State.FAILED) {
      // Fim do arrasto: restaura estado original
      if (!isDraggingRef.value) {
        return;
      }
      scale.value = withSpring(1);
      opacity.value = withSpring(1);
      zIndex.value = 0;
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      isDraggingRef.value = false;
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
    <LongPressGestureHandler
      ref={longPressRef}
      onHandlerStateChange={onLongPress}
      minDurationMs={300}
      maxDist={20}
      simultaneousHandlers={panRef}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={panHandler}
          onHandlerStateChange={panHandler}
          simultaneousHandlers={longPressRef}
          activeOffsetX={[-5, 5]}
          activeOffsetY={[-5, 5]}
          enabled={true}
        >
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
        </PanGestureHandler>
      </Animated.View>
    </LongPressGestureHandler>
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
