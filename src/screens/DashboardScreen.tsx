import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDashboard } from '../hooks/api';
import { useTheme } from '../theme/ThemeProvider';
import Card from '@/components/ui/Card';
import HorizontalScrollCards from '@/components/ui/HorizontalScrollCards';
import AlertCard from '@/components/ui/AlertCard';
import RecentNFCard from '@/components/nota-fiscal/RecentNFCard';
import FornecedorCard from '@/components/company/FornecedorCard';
import KPICard from '@/components/dashboard/KPICard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFilterBar from '@/components/dashboard/DashboardFilterBar';

import { useState } from 'react';

export default function DashboardScreen() {
  const theme = useTheme();
  const { data, isLoading, isError } = useDashboard();
  const [filters, setFilters] = useState({ mes: new Date().getMonth() + 1, ano: new Date().getFullYear(), status: '' });

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { ...theme.typography.h2, color: theme.colors.error },
    scrollContainer: { flex: 1 },
    section: { marginVertical: 8 },
    sectionTitle: { ...theme.typography.h2, marginHorizontal: 16, marginBottom: 8, color: theme.colors.text },
    kpisContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16 },
  });

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar os dados.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <DashboardHeader />
      <ScrollView style={styles.scrollContainer}>
        <DashboardFilterBar filters={filters} onFilterChange={setFilters} />

        {/* KPIs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumos</Text>
          <View style={styles.kpisContainer}>
            <KPICard label="NF Emitidas" value={data.kpis.nf_emitidas} />
            <KPICard label="NF Recebidas" value={data.kpis.nf_recebidas} />
            <KPICard label="Valor Total NF Saída" value={`R$ ${(data.kpis.valor_total_saida / 1000).toFixed(0)}K`} />
            <KPICard label="Impostos Retidos" value={`R$ ${(data.kpis.impostos_retidos / 1000).toFixed(0)}K`} />
          </View>
        </View>

        {/* Alerts */}
        <HorizontalScrollCards title="Alertas Fiscais">
          {data.alerts.map((alert, index) => (
            <AlertCard key={`${alert.tipo}-${index}`} alert={alert} />
          ))}
        </HorizontalScrollCards>

        {/* Recent NFs */}
        <HorizontalScrollCards title="Notas Fiscais Recentes">
          {data.recent_nfs.map((nota, index) => (
            <RecentNFCard key={`${nota.numero_data}-${index}`} nota={nota} />
          ))}
        </HorizontalScrollCards>

        {/* Top Fornecedores */}
        <HorizontalScrollCards title="Top 5 Fornecedores Pendentes">
          {data.top_5_fornecedores_pendentes.map((fornecedor, index) => (
            <FornecedorCard key={`${fornecedor.cnpj}-${index}`} fornecedor={fornecedor} />
          ))}
        </HorizontalScrollCards>
      </ScrollView>
    </SafeAreaView>
  );
}