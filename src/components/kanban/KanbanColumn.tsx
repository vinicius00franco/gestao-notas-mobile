import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, NativeSyntheticEvent, LayoutChangeEvent } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { NotaFiscal } from '@/types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  column: {
    id: string;
    nome: string;
    notas: NotaFiscal[];
  };
  columnIndex: number;
  onDragStart: (item: NotaFiscal, columnIndex: number, itemIndex: number, x: number, y: number) => void;
  onDrag: (x: number, y: number) => void;
  onDragEnd: () => void;
  draggingItem: { nota: NotaFiscal; columnIndex: number; itemIndex: number } | null;
  dragPosition: { x: number; y: number } | null;
  itemLayouts: Array<{ y: number; height: number }>;
  onItemLayout: (index: number, y: number, height: number) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  columnIndex,
  onDragStart,
  onDrag,
  onDragEnd,
  draggingItem,
  dragPosition,
  itemLayouts,
  onItemLayout,
}) => {
  const { colors, typography } = useTheme();
  const columnLayoutRef = useRef<{ y: number; height: number } | null>(null);

  const handleColumnLayout = (e: NativeSyntheticEvent<LayoutChangeEvent>) => {
    const { y, height } = e.nativeEvent.layout;
    columnLayoutRef.current = { y, height };
  };

  const isDraggingFromThisColumn =
    draggingItem && draggingItem.columnIndex === columnIndex;

  const renderNotaFiscal = ({ item, index }: { item: NotaFiscal; index: number }) => {
    const isDraggingThisItem =
      isDraggingFromThisColumn && draggingItem?.itemIndex === index;

    return (
      <View
        onLayout={(e) => {
          const { y, height } = e.nativeEvent.layout;
          onItemLayout(index, y, height);
        }}
        style={isDraggingThisItem ? { opacity: 0.3 } : {}}
      >
        <KanbanCard
          nota={item}
          index={index}
          columnIndex={columnIndex}
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          isDragging={isDraggingThisItem}
        />
      </View>
    );
  };

  return (
    <View
      testID="kanban-column"
      style={[styles.column, { backgroundColor: colors.background, borderColor: colors.border }]}
      onLayout={handleColumnLayout}
    >
      <View style={[styles.header, { backgroundColor: colors.primaryVariant }]}>
        <Text style={[typography.h2, { color: colors.onPrimary, flex: 1 }]}>{column.nome}</Text>
        <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
          <Text style={[typography.caption, { color: colors.onSecondary, fontWeight: 'bold' }]}>
            {column.notas.length}
          </Text>
        </View>
      </View>

      <FlatList
        data={column.notas}
        renderItem={renderNotaFiscal}
        keyExtractor={(item) => item.uuid}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!draggingItem}
        simultaneousHandlers={[]}
        waitFor={draggingItem ? undefined : []}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[typography.caption, { color: colors.placeholder }]}>Nenhuma nota fiscal</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    width: 280,
    margin: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  listContainer: {
    padding: 8,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default KanbanColumn;
