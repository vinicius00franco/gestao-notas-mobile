import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useContasAPagar } from '../hooks/api';
import Loading from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import AccountItem from '@/components/AccountItem';

export default function ContasAPagarScreen() {
  const { data, isLoading, isError, refetch } = useContasAPagar();

  if (isLoading) return <Loading />;

  if (isError) {
    return <ErrorState message="Erro ao buscar contas a pagar" onRetry={() => refetch()} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => <AccountItem item={item} />}
        ListEmptyComponent={<Text style={{ padding: 16 }}>Nenhuma conta a pagar.</Text>}
      />
    </View>
  );
}
