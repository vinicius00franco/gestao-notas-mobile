import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { NotaFiscal } from '../types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  column: {
    id: string;
    nome: string;
    notas: NotaFiscal[];
  };
  columnIndex?: number;
  onDragStart?: (item: NotaFiscal, columnIndex: number, itemIndex: number) => void;
  onDragEnd?: (
    item: NotaFiscal,
    fromColumnIndex: number,
    toColumnIndex: number,
    fromIndex: number,
    toIndex: number
  ) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, columnIndex = 0, onDragStart, onDragEnd }) => {
  const { colors, typography } = useTheme();

  const renderNotaFiscal = ({ item, index }: { item: NotaFiscal; index: number }) => (
    <KanbanCard
      nota={item}
      onPress={() => {}}
      onLongPress={(nf) => onDragStart?.(nf, columnIndex, index)}
    />
  );

  return (
    <View testID="kanban-column" style={[styles.column, { backgroundColor: colors.background, borderColor: colors.border }]}>
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