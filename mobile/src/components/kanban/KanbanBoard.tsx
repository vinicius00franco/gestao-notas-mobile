import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, NativeSyntheticEvent, LayoutChangeEvent } from 'react-native';
import { NotaFiscal } from '@/types';
import { KanbanColumnData, moveNotaBetweenColumns } from '@/utils/moveBetweenColumns';
import KanbanColumn from './KanbanColumn';
import Animated, { useSharedValue, runOnJS, useAnimatedScrollHandler } from 'react-native-reanimated';

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
  debug?: boolean;
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

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, onColumnsChange, onMoveEnd, debug = false }) => {
  // Add debug flag support
  const debugRef = useRef(debug);
  const debugSV = useSharedValue(debug);
  useEffect(() => { debugRef.current = debug; debugSV.value = debug; }, [debug]);
  const [draggingItem, setDraggingItem] = useState<DragState | null>(null);
  const [previewColumns, setPreviewColumns] = useState<KanbanColumnData[]>(columns);
  
  // Shared Values for Layouts and Dragging State
  const columnLayouts = useSharedValue<ColumnLayout[]>([]);
  const itemLayouts = useSharedValue<Array<Array<{ y: number; height: number }>>>([]);
  const draggingMeta = useSharedValue<{ columnIndex: number; itemIndex: number; startY: number } | null>(null);
  const scrollX = useSharedValue(0);
  // Shared value used to store the scroll view's left offset so we can convert
  // absolute screen coordinates into scroll content coordinates correctly.
  const scrollViewLeft = useSharedValue(0);
  // Shared value to store the window (screen) coordinates for columns.
  // This is used to compare absoluteX / absoluteY directly against measured columns.
  const columnWindowLayouts = useSharedValue<ColumnLayout[]>([]);
  // Refs for the column wrappers so we can measure them in window coordinates.
  const columnRefs = React.useRef<Array<any>>([]);

  const previewColumnsRef = useRef(previewColumns);

  // Update ref when previewColumns changes
  useEffect(() => {
    previewColumnsRef.current = previewColumns;
  }, [previewColumns]);

  // Initialize layouts structure
  useEffect(() => {
    const current = itemLayouts.value;
    if (current.length !== columns.length) {
       const newLayouts = new Array(columns.length).fill(0).map((_, i) => current[i] || []);
       itemLayouts.value = newLayouts;
    }
  }, [columns.length]);

  // Measure columns in window coordinates whenever the rendered columns change
  useEffect(() => {
    const refs = columnRefs.current;
    if (!refs || refs.length === 0) return;
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    const attempts = [50, 150, 400];
    const measureAllColumns = () => {
      refs.forEach((ref: any, idx: number) => {
        if (ref && typeof ref.measureInWindow === 'function') {
          try {
            ref.measureInWindow((wx: number, wy: number, wWidth: number, wHeight: number) => {
              const winCurrent = [...columnWindowLayouts.value];
              winCurrent[idx] = { x: wx, y: wy, width: wWidth, height: wHeight };
              columnWindowLayouts.value = winCurrent;
            });
          } catch (err) {
            // ignore
          }
        }
      });
    };

    // Schedule multiple measurements with increasing delays to handle initial layout races
    attempts.forEach((delay) => {
      const t = setTimeout(() => measureAllColumns(), delay);
      timeouts.push(t);
    });

    // Do an immediate measurement as well
    measureAllColumns();

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [columns]);

  useEffect(() => {
    if (!draggingItem) {
      setPreviewColumns(columns);
    }
  }, [columns, draggingItem]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleDragStart = (
    nota: NotaFiscal,
    columnIndex: number,
    itemIndex: number,
    x: number,
    y: number
  ) => {
    setDraggingItem({ nota, columnIndex, itemIndex, startX: x, startY: y });
    draggingMeta.value = { columnIndex, itemIndex, startY: y };
    setPreviewColumns(columns);
    if (debugRef.current) console.log('[KanbanBoard] onDragStart', { uuid: nota.uuid, columnIndex, itemIndex, x, y });
  };

  const updateColumnsJS = useCallback((fromCol: number, fromIndex: number, toCol: number, toIndex: number) => {
    const currentCols = previewColumnsRef.current;
    
    // Validate indices to prevent crashes
    if (!currentCols[fromCol] || !currentCols[fromCol].notas[fromIndex]) return;
    if (!currentCols[toCol]) return;

    const updatedColumns = moveNotaBetweenColumns(currentCols, {
      fromColumnIndex: fromCol,
      fromIndex: fromIndex,
      toColumnIndex: toCol,
      toIndex: toIndex,
    });

    setPreviewColumns(updatedColumns);
    // Update shared value to reflect the new position
    // Keep startY from previous value
    const currentMeta = draggingMeta.value;
    if (currentMeta) {
        draggingMeta.value = { columnIndex: toCol, itemIndex: toIndex, startY: currentMeta.startY };
    }
    if (debugRef.current) console.log('[KanbanBoard] updateColumnsJS', { fromCol, fromIndex, toCol, toIndex });
  }, []);

  // Criar função worklet para handleDrag
  const handleDragWorklet = React.useMemo(() => {
    return (absoluteX: number, absoluteY: number) => {
      'worklet';
      if (!draggingMeta.value) return;

      const { columnIndex, itemIndex, startY } = draggingMeta.value;
      const currentScrollX = scrollX.value;
      // Debugging: report basic coordinates
      if (debugSV.value) {
        runOnJS((...args:any[]) => console.log('[KanbanBoard Worklet]', ...args))('drag coords', { absoluteX, absoluteY, currentScrollX });
      }

      // Prefer to use measured window coordinates for column detection.
      const winLayouts = columnWindowLayouts.value;
      let targetColumnIndex = -1;
      if (Array.isArray(winLayouts) && winLayouts.length) {
        targetColumnIndex = winLayouts.findIndex(
          (layout) => layout && absoluteX >= layout.x && absoluteX <= layout.x + layout.width
        );
      }

      // Fallback to content-based detection if window coords not available
      if (targetColumnIndex < 0) {
        const layouts = columnLayouts.value;
        // Adjust absoluteX to content coordinates by:
        // contentX = absoluteX - scrollViewLeft + currentScrollX
        const contentX = absoluteX - scrollViewLeft.value + currentScrollX;

        targetColumnIndex = layouts.findIndex(
          (layout) => layout && contentX >= layout.x && contentX <= layout.x + layout.width
        );
      }

      if (targetColumnIndex < 0) return;

      const startColItems = itemLayouts.value[columnIndex];
      if (!startColItems || !startColItems[itemIndex]) return;
      
      const startItemLayout = startColItems[itemIndex];
      
      // Calculate dragged item center Y in WINDOW coordinates
      // Use column window position + item layout (y) + delta of touch
      const startColWin = columnWindowLayouts.value[columnIndex];
      let draggedItemCenterYInWindow: number | null = null;
      if (startColWin) {
        draggedItemCenterYInWindow = startColWin.y + startItemLayout.y + startItemLayout.height / 2 + (absoluteY - startY);
      } else {
        // Fallback: compute with content coords (less reliable)
        const draggedItemCenterY = startItemLayout.y + (startItemLayout.height / 2) + (absoluteY - startY);
        draggedItemCenterYInWindow = draggedItemCenterY;
      }

      // Find target index
      const colItems = itemLayouts.value[targetColumnIndex] || [];
      let targetIndex = colItems.length;

      for (let i = 0; i < colItems.length; i++) {
        const itemLayout = colItems[i];
        if (!itemLayout) continue;
        
        // Compute item center in window coordinates if possible
        const targetColWin = columnWindowLayouts.value[targetColumnIndex];
        let itemCenterYInWindow = itemLayout.y + itemLayout.height / 2;
        if (targetColWin) {
          itemCenterYInWindow = targetColWin.y + itemLayout.y + itemLayout.height / 2;
        }

        // Skip if it's the item itself
        if (columnIndex === targetColumnIndex && itemIndex === i) continue;

        if ((draggedItemCenterYInWindow ?? draggedItemCenterYInWindow) < itemCenterYInWindow) {
          targetIndex = i;
          break;
        }
      }

      if (columnIndex === targetColumnIndex && itemIndex === targetIndex) {
        return;
      }
      if (debugSV.value) {
        runOnJS((...args:any[]) => console.log('[KanbanBoard Worklet] target', ...args))({
          columnIndex, itemIndex, targetColumnIndex, targetIndex
        });
      }
      runOnJS(updateColumnsJS)(columnIndex, itemIndex, targetColumnIndex, targetIndex);
    };
  }, [updateColumnsJS]);

  const handleDragEnd = () => {
    if (!draggingItem) return;

    onColumnsChange(previewColumns);

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
    if (debugRef.current) console.log('[KanbanBoard] dragEnd', { uuid: draggingItem.nota.uuid, from: draggingItem.columnIndex, to: finalColumnIndex, fromIndex: draggingItem.itemIndex, toIndex: finalItemIndex });

    setDraggingItem(null);
    draggingMeta.value = null;
    setPreviewColumns(columns);
  };

  const handleColumnLayout = (index: number) => (e: NativeSyntheticEvent<LayoutChangeEvent['nativeEvent']>) => {
    const { x, y, width, height } = e.nativeEvent.layout;
    const current = [...columnLayouts.value];
    current[index] = { x, y, width, height };
    columnLayouts.value = current;
    if (debugRef.current) console.log('[KanbanBoard] handleColumnLayout', { index, x, y, width, height });
    // Try to measure this column in window coords as well, if we have a ref.
    const ref = columnRefs.current[index];
    if (ref && typeof ref.measureInWindow === 'function') {
      try {
        ref.measureInWindow((wx: number, wy: number, wWidth: number, wHeight: number) => {
          const winCurrent = [...columnWindowLayouts.value];
          winCurrent[index] = { x: wx, y: wy, width: wWidth, height: wHeight };
          columnWindowLayouts.value = winCurrent;
          if (debugRef.current) console.log('[KanbanBoard] measureInWindow', { index, wx, wy, wWidth, wHeight });
        });
      } catch (err) {
        // ignore measurement errors
      }
    }
  };

  const handleItemLayout = (columnIndex: number, itemIndex: number, y: number, height: number) => {
    const current = [...itemLayouts.value];
    if (!current[columnIndex]) current[columnIndex] = [];
    
    const colLayouts = [...current[columnIndex]];
    colLayouts[itemIndex] = { y, height };
    current[columnIndex] = colLayouts;
    
    itemLayouts.value = current;
    if (debugRef.current) console.log('[KanbanBoard] itemLayout', { columnIndex, itemIndex, y, height });
  };

  const columnsToRender = draggingItem ? previewColumns : columns;

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        contentContainerStyle={styles.row}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={!draggingItem}
        onScroll={scrollHandler}
        onLayout={(e) => {
          const { x } = e.nativeEvent.layout;
          scrollViewLeft.value = x;
        }}
        scrollEventThrottle={16}
      >
        {columnsToRender.map((col, idx) => (
          <View
            key={col.id}
            ref={(el) => { columnRefs.current[idx] = el; }}
            onLayout={handleColumnLayout(idx)}
          >
            <KanbanColumn
              column={col}
              columnIndex={idx}
              debug={debug}
              onDragStart={handleDragStart}
              onDrag={handleDragWorklet}
              onDragEnd={handleDragEnd}
              draggingItem={draggingItem}
              onItemLayout={(itemIndex, y, height) => handleItemLayout(idx, itemIndex, y, height)}
            />
          </View>
        ))}
      </Animated.ScrollView>
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
