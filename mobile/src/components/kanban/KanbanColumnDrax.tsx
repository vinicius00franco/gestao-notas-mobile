import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DraxView, DraxList } from 'react-native-drax';
import { useTheme } from '@/theme/ThemeProvider';
import { NotaFiscal } from '@/types';
import KanbanCardDrax from './KanbanCardDrax';

interface KanbanColumnDraxProps {
  column: {
    id: string;
    nome: string;
    notas: NotaFiscal[];
  };
  columnIndex: number;
  onDrop: (
    fromColumnId: string,
    toColumnId: string,
    fromIndex: number,
    toIndex: number,
    item: NotaFiscal
  ) => void;
}

/**
 * KanbanColumnDrax - Coluna do Kanban com zona de soltura
 * 
 * Usa DraxView para criar uma zona onde cards podem ser soltos
 * e DraxList para gerenciar a lista de cards arrastáveis
 */
const KanbanColumnDrax: React.FC<KanbanColumnDraxProps> = ({
  column,
  columnIndex,
  onDrop,
}) => {
  const { colors, typography } = useTheme();

  /**
   * Handler quando um card é solto na coluna
   */
  const handleReceiveDragDrop = (event: any) => {
    const { dragged, receiver } = event;
    
    // Obter dados do item arrastado
    const fromColumnId = dragged.payload.columnId;
    const fromIndex = dragged.payload.index;
    const item = dragged.payload.item;
    
    // Determinar índice de destino
    // Se receiver.index existe, usar ele; caso contrário, adicionar no final
    const toIndex = receiver.index !== undefined ? receiver.index : column.notas.length;

    onDrop(fromColumnId, column.id, fromIndex, toIndex, item);
  };

  return (
    <View
      style={[
        styles.column,
        { backgroundColor: colors.background, borderColor: colors.border }
      ]}
    >
      {/* Cabeçalho da coluna */}
      <View style={[styles.header, { backgroundColor: colors.primaryVariant }]}>
        <Text style={[typography.h2, { color: colors.onPrimary, flex: 1 }]}>
          {column.nome}
        </Text>
        <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
          <Text style={[typography.caption, { color: colors.onSecondary, fontWeight: 'bold' }]}>
            {column.notas.length}
          </Text>
        </View>
      </View>

      {/* Lista de cards arrastáveis */}
      <DraxView
        style={styles.draxContainer}
        receivingStyle={styles.receiving}
        onReceiveDragDrop={handleReceiveDragDrop}
        receptive={true}
      >
        {column.notas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[typography.caption, { color: colors.placeholder }]}>
              Nenhuma nota fiscal
            </Text>
          </View>
        ) : (
          column.notas.map((nota, index) => (
            <KanbanCardDrax
              key={nota.uuid}
              nota={nota}
              index={index}
              columnId={column.id}
            />
          ))
        )}
      </DraxView>
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
    maxHeight: '90%',
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
  draxContainer: {
    flex: 1,
    padding: 8,
  },
  receiving: {
    backgroundColor: 'rgba(100, 200, 255, 0.2)',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 100,
  },
});

export default KanbanColumnDrax;
