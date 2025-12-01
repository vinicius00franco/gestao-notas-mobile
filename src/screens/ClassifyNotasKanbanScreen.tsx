import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NotaFiscal, Classificacao } from '../types';
import { useNotasFiscais, useClassificacoes, useUpdateNotaFiscalClassificacao } from '../hooks/api';
import { useTheme } from '@/theme/ThemeProvider';
import KanbanBoard from '@/components/kanban/KanbanBoardDrax';
import { KanbanColumnData } from '@/utils/moveBetweenColumns';

type KanbanColumn = Classificacao & { notas: NotaFiscal[] };

/**
 * ClassifyNotasKanbanScreen - Tela de classificação de notas fiscais usando Kanban
 * 
 * Esta tela usa a implementação manual com gesture-handler e reanimated
 * para drag-and-drop performático.
 * 
 * Funcionalidades:
 * - Arrastar e soltar cards entre colunas (classificações)
 * - Reordenar cards dentro da mesma coluna
 * - Sincronização automática com o backend ao mover entre classificações
 * - Feedback visual durante o arrasto
 */
const ClassifyNotasKanbanScreen = () => {
  const { colors } = useTheme();
  const { data: notasFiscais, isLoading: isLoadingNotas, refetch: refetchNotasFiscais } = useNotasFiscais();
  const { data: classificacoes, isLoading: isLoadingClassificacoes } = useClassificacoes();
  const { mutate: updateClassificacao } = useUpdateNotaFiscalClassificacao();

  const [data, setData] = useState<KanbanColumn[]>([]);

  useEffect(() => {
    if (notasFiscais && classificacoes) {
      const unclassifiedId = 'unclassified';
      const allClassificacoes = [
        { id: unclassifiedId, nome: 'Não Classificado' },
        ...classificacoes,
      ];

      const groupedData = allClassificacoes.map(c => ({
        ...c,
        notas: notasFiscais.filter((n: NotaFiscal) => ((n as any).classificacao_id || unclassifiedId) === c.id),
      }));
      setData(groupedData);
    }
  }, [notasFiscais, classificacoes]);

  const handleColumnsChange = (cols: KanbanColumn[]) => {
    setData(cols);
  };

  /**
   * Handler quando um card é movido entre colunas
   * Sincroniza com o backend se houver mudança de classificação
   */
  const handleMoveEnd = (
    item: NotaFiscal, 
    fromColumnIndex: number, 
    toColumnIndex: number
  ) => {
    // Se moveu para a mesma coluna, não precisa atualizar no backend
    if (fromColumnIndex === toColumnIndex) return;

    const toColumn = data[toColumnIndex];
    
    // Atualizar no backend
    updateClassificacao(
      { 
        notaId: (item as any).uuid, 
        classificacaoId: toColumn.id 
      }, 
      {
        onSuccess: () => {
          // Refetch para garantir sincronização
          refetchNotasFiscais();
        },
        onError: (error) => {
          console.error('Erro ao atualizar classificação:', error);
          // Em caso de erro, reverter para os dados originais
          refetchNotasFiscais();
        }
      }
    );
  };

  if (isLoadingNotas || isLoadingClassificacoes) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <KanbanBoard
        columns={data as any}
        onColumnsChange={(cols) => handleColumnsChange(cols as any)}
        onMoveEnd={handleMoveEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClassifyNotasKanbanScreen;