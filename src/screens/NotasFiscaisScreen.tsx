import React from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNotasFiscais, useDeleteNotaFiscal } from '../hooks/api';
import Loading from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import { NotaFiscal } from '@/types';
import withErrorBoundary from '@/components/withErrorBoundary';
import NotaFiscalListHeader from '@/components/NotaFiscalListHeader';
import NotaFiscalListItem from '@/components/NotaFiscalListItem';
import EmptyState from '@/components/EmptyState';

function NotasFiscaisScreen() {
  const { data: notas, isLoading, isError, error, refetch } = useNotasFiscais();
  const deleteNotaMutation = useDeleteNotaFiscal();
  const navigation = useNavigation<any>();

  const handleDelete = (uuid: string) => {
    deleteNotaMutation.mutate(uuid);
  };

  const handleView = (nota: NotaFiscal) => {
    navigation.navigate('NotaFiscalDetail', { nota });
  };

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <ErrorState
        message={error?.message || 'Erro ao buscar notas fiscais'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <NotaFiscalListHeader />
      <FlatList
        data={notas}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }: { item: NotaFiscal }) => (
          <NotaFiscalListItem
            nota={item}
            onView={handleView}
            onDelete={handleDelete}
            isDeleting={deleteNotaMutation.isPending}
          />
        )}
        ListEmptyComponent={
          <EmptyState message="Nenhuma nota fiscal encontrada" />
        }
      />
    </View>
  );
}

export default withErrorBoundary(NotasFiscaisScreen);