import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import { NotaFiscal } from '@/types';
import { KanbanColumnData } from '@/utils/moveBetweenColumns';
import KanbanColumnDrax from './KanbanColumnDrax';

interface KanbanBoardDraxProps {
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

/**
 * KanbanBoardDrax - Quadro Kanban usando react-native-drax
 * 
 * Esta implementação usa a biblioteca react-native-drax que fornece:
 * - Drag and drop fluido e performático
 * - Suporte nativo para zonas de soltura (droppable zones)
 * - Animações suaves automáticas
 * - Detecção de colisão precisa
 * 
 * Vantagens sobre implementação manual:
 * - Menos código e complexidade
 * - Performance otimizada
 * - Funciona out-of-the-box sem configurações complexas
 * - Melhor experiência do usuário
 */
const KanbanBoardDrax: React.FC<KanbanBoardDraxProps> = ({ 
  columns, 
  onColumnsChange, 
  onMoveEnd 
}) => {
  /**
   * Handler quando um card é solto em uma coluna
   * 
   * @param fromColumnId - ID da coluna de origem
   * @param toColumnId - ID da coluna de destino
   * @param fromIndex - Índice do item na coluna de origem
   * @param toIndex - Índice de destino na coluna de destino
   * @param item - O card que foi movido
   */
  const handleDrop = (
    fromColumnId: string,
    toColumnId: string,
    fromIndex: number,
    toIndex: number,
    item: NotaFiscal
  ) => {
    const fromColumnIndex = columns.findIndex(col => col.id === fromColumnId);
    const toColumnIndex = columns.findIndex(col => col.id === toColumnId);

    if (fromColumnIndex === -1 || toColumnIndex === -1) return;

    // Criar cópia das colunas
    const updatedColumns = columns.map(col => ({ ...col, notas: [...col.notas] }));

    // Remover da coluna de origem
    const [movedItem] = updatedColumns[fromColumnIndex].notas.splice(fromIndex, 1);

    // Adicionar na coluna de destino
    updatedColumns[toColumnIndex].notas.splice(toIndex, 0, movedItem);

    // Atualizar estado
    onColumnsChange(updatedColumns);

    // Notificar callback
    if (fromColumnIndex !== toColumnIndex || fromIndex !== toIndex) {
      onMoveEnd?.(item, fromColumnIndex, toColumnIndex, fromIndex, toIndex);
    }
  };

  return (
    <DraxProvider>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {columns.map((column, index) => (
            <KanbanColumnDrax
              key={column.id}
              column={column}
              columnIndex={index}
              onDrop={handleDrop}
            />
          ))}
        </ScrollView>
      </View>
    </DraxProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

export default KanbanBoardDrax;
