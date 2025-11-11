import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, FlatList, Text } from 'react-native';
import { NotaFiscal, Classificacao } from '../types';
import { useNotasFiscais, useClassificacoes, useUpdateNotaFiscalClassificacao } from '../hooks/api';
import { useTheme } from '@/theme/ThemeProvider';
import NotaFiscalCard from '../components/NotaFiscalCard';
import KanbanBoard from '../components/KanbanBoard';
import { moveNotaBetweenColumns, KanbanColumnData } from '../utils/moveBetweenColumns';

type KanbanColumn = Classificacao & { notas: NotaFiscal[] };

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

  const renderItem = ({ item }: { item: NotaFiscal }) => (
    <TouchableOpacity>
      <NotaFiscalCard item={item} />
    </TouchableOpacity>
  );

  if (isLoadingNotas || isLoadingClassificacoes) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <KanbanBoard
        columns={data as any}
        onColumnsChange={(cols) => handleColumnsChange(cols as any)}
        onMoveEnd={(item, fromColumnIndex, toColumnIndex) => {
          if (fromColumnIndex === toColumnIndex) return;
          const toColumn = data[toColumnIndex];
          updateClassificacao({ notaId: (item as any).uuid, classificacaoId: toColumn.id }, {
            onSuccess: () => refetchNotasFiscais(),
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos podem ser removidos se não forem usados
});

export default ClassifyNotasKanbanScreen;