import React, { useMemo, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, NativeSyntheticEvent, LayoutChangeEvent } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import KanbanColumn from './KanbanColumn';
import { NotaFiscal } from '@/types';
import { KanbanColumnData, moveNotaBetweenColumns } from '../utils/moveBetweenColumns';

interface KanbanBoardProps {
  columns: KanbanColumnData[];
  onColumnsChange: (cols: KanbanColumnData[]) => void;
  onMoveEnd?: (
    item: NotaFiscal,
    fromColumnIndex: number,
    toColumnIndex: number,
    fromIndex: number,
    toIndex: number
  ) => void;
}

interface DragState {
  item: NotaFiscal;
  fromColumnIndex: number;
  fromIndex: number;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, onColumnsChange, onMoveEnd }) => {
  const [dragging, setDragging] = useState<DragState | null>(null);
  const currentX = useRef(0);
  const columnLayouts = useRef<{ x: number; width: number }[]>([]);

  const handleGestureEvent = (e: PanGestureHandlerGestureEvent) => {
    currentX.current = e.nativeEvent.x;
  };

  const handleStateChange = (e: PanGestureHandlerGestureEvent) => {
    if (e.nativeEvent.state === State.END && dragging) {
      const x = currentX.current;
      const targetIndex = columnLayouts.current.findIndex((c) => x >= c.x && x <= c.x + c.width);
      const toColumnIndex = targetIndex >= 0 ? targetIndex : dragging.fromColumnIndex;
      const toIndex = columns[toColumnIndex]?.notas.length ?? 0;
      const next = moveNotaBetweenColumns(columns, {
        fromColumnIndex: dragging.fromColumnIndex,
        fromIndex: dragging.fromIndex,
        toColumnIndex,
        toIndex,
      });
      onColumnsChange(next);
      onMoveEnd?.(dragging.item, dragging.fromColumnIndex, toColumnIndex, dragging.fromIndex, toIndex);
      setDragging(null);
    }
  };

  const onColumnLayout = (index: number) => (e: NativeSyntheticEvent<LayoutChangeEvent['nativeEvent']>) => {
    const { x, width } = e.nativeEvent.layout;
    columnLayouts.current[index] = { x, width };
  };

  return (
    <PanGestureHandler onGestureEvent={handleGestureEvent} onHandlerStateChange={handleStateChange} enabled={!!dragging}>
      <View>
        <ScrollView horizontal contentContainerStyle={styles.row} showsHorizontalScrollIndicator={false}>
          {columns.map((col, idx) => (
            <View key={col.id} onLayout={onColumnLayout(idx)}>
              <KanbanColumn
                column={col}
                columnIndex={idx}
                onDragStart={(item, columnIndex, itemIndex) => setDragging({ item, fromColumnIndex: columnIndex, fromIndex: itemIndex })}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 8,
  },
});

export default KanbanBoard;
