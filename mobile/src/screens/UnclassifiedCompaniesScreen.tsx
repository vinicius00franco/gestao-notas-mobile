import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useUnclassifiedCompanies } from '../hooks/api';
import { UnclassifiedCompany } from '../types';
import Loading from '@/components/ui/Loading';
import ErrorState from '@/components/ui/ErrorState';
import CompanyListHeader from '@/components/company/CompanyListHeader';
import CompanyListItem from '@/components/company/CompanyListItem';
import EmptyState from '@/components/ui/EmptyState';

export default function UnclassifiedCompaniesScreen() {
  const navigation = useNavigation<any>();
  const { data, error, isLoading, refetch } = useUnclassifiedCompanies();

  const handleClassify = (company: UnclassifiedCompany) => {
    navigation.navigate('ClassifyCompany', { company });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorState
        message="Erro ao buscar empresas"
        onRetry={() => refetch()}
      />
    );
  }

  const companies = (data as UnclassifiedCompany[]) || [];

  return (
    <View style={{ flex: 1 }}>
      <CompanyListHeader count={companies.length} />
      <FlatList
        data={companies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CompanyListItem
            company={item}
            onClassify={handleClassify}
          />
        )}
        ListEmptyComponent={
          <EmptyState message="Nenhuma empresa para classificar" />
        }
      />
    </View>
  );
}