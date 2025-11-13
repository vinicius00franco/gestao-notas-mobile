import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useContasAReceber } from '../hooks/api';
import Loading from '@/components/ui/Loading';
import ErrorState from '@/components/ui/ErrorState';
import AccountItem from '@/components/account/AccountItem';

export default function ContasAReceberScreen() {
  const { data, isLoading, isError, refetch } = useContasAReceber();

  if (isLoading) return <Loading />;

  if (isError) {
    return <ErrorState message="Erro ao buscar contas a receber" onRetry={() => refetch()} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => <AccountItem item={item} />}
        ListEmptyComponent={<Text style={{ padding: 16 }}>Nenhuma conta a receber.</Text>}
      />
    </View>
  );
}
