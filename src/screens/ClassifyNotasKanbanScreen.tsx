import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, FlatList, Text } from 'react-native';
import { NotaFiscal, Classificacao } from '../types';
import { useNotasFiscais, useClassificacoes, useUpdateNotaFiscalClassificacao } from '../hooks/api';
import { useTheme } from '@/theme/ThemeProvider';
import NotaFiscalCard from '../components/NotaFiscalCard';
import KanbanColumn from '../components/KanbanColumn';

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

  const onDragEnd = (
    item: NotaFiscal,
    fromColumnIndex: number,
    toColumnIndex: number,
    fromIndex: number,
    toIndex: number
  ) => {
    const newData = [...data];
    const fromColumn = newData[fromColumnIndex];
    const toColumn = newData[toColumnIndex];

    // Remove from old column
    const [movedItem] = fromColumn.notas.splice(fromIndex, 1);

    // Add to new column
    toColumn.notas.splice(toIndex, 0, movedItem);

    setData(newData);

    if (fromColumn.id !== toColumn.id) {
      // Use uuid as the canonical identifier for notas when talking to the API
      updateClassificacao({ notaId: (item as any).uuid, classificacaoId: toColumn.id }, {
        onSuccess: () => refetchNotasFiscais(),
      });
    }
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
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {data.map(column => (
        <KanbanColumn key={column.id} column={column} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Estilos podem ser removidos se não forem usados
});

export default ClassifyNotasKanbanScreen;