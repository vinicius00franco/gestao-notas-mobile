import React, { useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, NativeSyntheticEvent, LayoutChangeEvent } from 'react-native';
import { NotaFiscal } from '@/types';
import { KanbanColumnData, moveNotaBetweenColumns } from '@/utils/moveBetweenColumns';
import KanbanColumn from './KanbanColumn';

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
  nota: NotaFiscal;
  columnIndex: number;
  itemIndex: number;
  startX: number;
  startY: number;
}

interface ColumnLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, onColumnsChange, onMoveEnd }) => {
  const [draggingItem, setDraggingItem] = useState<DragState | null>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);
  const [previewColumns, setPreviewColumns] = useState<KanbanColumnData[]>(columns);
  const columnLayouts = useRef<ColumnLayout[]>([]);
  const itemLayoutsRef = useRef<Array<Array<{ y: number; height: number }>>>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  // Inicializar layouts dos itens
  React.useEffect(() => {
    itemLayoutsRef.current = columns.map(() => []);
  }, [columns.length]);

  React.useEffect(() => {
    if (!draggingItem) {
      setPreviewColumns(columns);
    }
  }, [columns, draggingItem]);

  const handleDragStart = (
    nota: NotaFiscal,
    columnIndex: number,
    itemIndex: number,
    x: number,
    y: number
  ) => {
    // x e y já são coordenadas absolutas da tela
    setDraggingItem({ nota, columnIndex, itemIndex, startX: x, startY: y });
    setDragPosition({ x, y });
    setPreviewColumns(columns);
  };

  const handleDrag = (absoluteX: number, absoluteY: number) => {
    if (!draggingItem) return;

    // Usar coordenadas absolutas diretamente
    setDragPosition({ x: absoluteX, y: absoluteY });

    // Encontrar a coluna de destino baseado na posição X absoluta
    const targetColumnIndex = columnLayouts.current.findIndex(
      (layout) => absoluteX >= layout.x && absoluteX <= layout.x + layout.width
    );

    if (targetColumnIndex < 0) return;

    const targetColumn = columnLayouts.current[targetColumnIndex];
    const relativeYInColumn = absoluteY - targetColumn.y;

    // Encontrar a posição dentro da coluna baseado na posição Y
    const itemLayouts = itemLayoutsRef.current[targetColumnIndex] || [];
    let targetIndex = itemLayouts.length;

    for (let i = 0; i < itemLayouts.length; i++) {
      const itemLayout = itemLayouts[i];
      const itemCenterY = itemLayout.y + itemLayout.height / 2;

      // Se estamos arrastando o próprio item, pular
      if (
        draggingItem.columnIndex === targetColumnIndex &&
        draggingItem.itemIndex === i
      ) {
        continue;
      }

      if (relativeYInColumn < itemCenterY) {
        targetIndex = i;
        break;
      }
    }

    // Se está movendo para a mesma posição, não fazer nada
    if (
      draggingItem.columnIndex === targetColumnIndex &&
      draggingItem.itemIndex === targetIndex
    ) {
      return;
    }

    // Atualizar preview em tempo real
    const updatedColumns = moveNotaBetweenColumns(columns, {
      fromColumnIndex: draggingItem.columnIndex,
      fromIndex: draggingItem.itemIndex,
      toColumnIndex: targetColumnIndex,
      toIndex: targetIndex,
    });

    setPreviewColumns(updatedColumns);
  };

  const handleDragEnd = () => {
    if (!draggingItem) return;

    // Aplicar a mudança final
    onColumnsChange(previewColumns);

    // Calcular índices finais
    const finalColumnIndex = previewColumns.findIndex((col) =>
      col.notas.some((n) => n.uuid === draggingItem.nota.uuid)
    );
    const finalItemIndex = previewColumns[finalColumnIndex]?.notas.findIndex(
      (n) => n.uuid === draggingItem.nota.uuid
    ) ?? 0;

    if (
      draggingItem.columnIndex !== finalColumnIndex ||
      draggingItem.itemIndex !== finalItemIndex
    ) {
      onMoveEnd?.(
        draggingItem.nota,
        draggingItem.columnIndex,
        finalColumnIndex,
        draggingItem.itemIndex,
        finalItemIndex
      );
    }

    setDraggingItem(null);
    setDragPosition(null);
    setPreviewColumns(columns);
  };

  const handleColumnLayout = (index: number) => (e: NativeSyntheticEvent<LayoutChangeEvent['nativeEvent']>) => {
    const { x, y, width, height } = e.nativeEvent.layout;
    columnLayouts.current[index] = { x, y, width, height };
  };

  const handleItemLayout = (columnIndex: number, itemIndex: number, y: number, height: number) => {
    if (!itemLayoutsRef.current[columnIndex]) {
      itemLayoutsRef.current[columnIndex] = [];
    }
    itemLayoutsRef.current[columnIndex][itemIndex] = { y, height };
  };

  const columnsToRender = draggingItem ? previewColumns : columns;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        contentContainerStyle={styles.row}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={!draggingItem}
      >
        {columnsToRender.map((col, idx) => (
          <View key={col.id} onLayout={handleColumnLayout(idx)}>
            <KanbanColumn
              column={col}
              columnIndex={idx}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              draggingItem={draggingItem}
              dragPosition={dragPosition}
              itemLayouts={itemLayoutsRef.current[idx] || []}
              onItemLayout={(itemIndex, y, height) => handleItemLayout(idx, itemIndex, y, height)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    paddingHorizontal: 8,
  },
});

export default KanbanBoard;
