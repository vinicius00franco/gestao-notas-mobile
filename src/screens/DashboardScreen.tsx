import { ActivityIndicator, FlatList, StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDashboard } from '../hooks/api';
import { useTheme } from '../theme/ThemeProvider';
import { TopFornecedor, DashboardData, RecentNF, AlertItem } from '../types';
import Card from '../components/Card';
// Conditionally import chart components only for native platforms
let LineChartCard: any = null;
let BarChartCard: any = null;
let DonutChartCard: any = null;

if (Platform.OS !== 'web') {
  try {
    LineChartCard = require('../components/charts/LineChartCard').default;
    BarChartCard = require('../components/charts/BarChartCard').default;
    DonutChartCard = require('../components/charts/DonutChartCard').default;
  } catch (e) {
    console.warn('Chart components not available');
  }
}

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
    header: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 8 },
    title: { ...theme.typography.h2 },
    scrollContainer: { flex: 1 },
    section: { marginVertical: 8 },
    sectionTitle: { ...theme.typography.h2, marginHorizontal: 16, marginBottom: 8 },
    kpisContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16 },
    kpiCard: { flex: 1, minWidth: '45%', margin: 4, padding: 16, backgroundColor: theme.colors.surface, borderRadius: 8, borderWidth: 1, borderColor: theme.colors.border },
    kpiValue: { ...theme.typography.h1, color: theme.colors.primary },
    kpiLabel: { ...theme.typography.body, color: theme.colors.onSurface },
    filtersContainer: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 8 },
    filterButton: { padding: 8, marginRight: 8, backgroundColor: theme.colors.surface, borderRadius: 4, borderWidth: 1, borderColor: theme.colors.border },
    filterText: { ...theme.typography.body, color: theme.colors.onSurface },
    alertItem: { padding: 16, marginVertical: 4, marginHorizontal: 16, backgroundColor: theme.colors.surface, borderRadius: 8, borderWidth: 1, borderColor: theme.colors.border },
    alertTitle: { ...theme.typography.h2, color: theme.colors.error },
    alertDesc: { ...theme.typography.body, color: theme.colors.onSurface },
    nfItem: { padding: 16, marginVertical: 4, marginHorizontal: 16, backgroundColor: theme.colors.surface, borderRadius: 8, borderWidth: 1, borderColor: theme.colors.border },
    nfText: { ...theme.typography.body, color: theme.colors.onSurface },
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

  const renderKPI = (label: string, value: string | number) => (
    <View style={styles.kpiCard}>
      <Text style={styles.kpiValue}>{typeof value === 'number' ? value.toLocaleString('pt-BR') : value}</Text>
      <Text style={styles.kpiLabel}>{label}</Text>
    </View>
  );

  const renderAlert = ({ item }: { item: AlertItem }) => (
    <View style={styles.alertItem}>
      <Text style={styles.alertTitle}>{item.tipo} ({item.quantidade})</Text>
      <Text style={styles.alertDesc}>{item.descricao}</Text>
    </View>
  );

  const renderRecentNF = ({ item }: { item: RecentNF }) => (
    <View style={styles.nfItem}>
      <Text style={styles.nfText}>{item.nome_razao_social}</Text>
      <Text style={styles.nfText}>{item.numero_data}</Text>
      <Text style={styles.nfText}>R$ {item.valor.toFixed(2)}</Text>
      <Text style={styles.nfText}>{item.status}</Text>
    </View>
  );

  const tendenciaData = data.charts.tendencia_valor_imposto.map(d => ({ x: d.mes, y: d.valor_bruto }));
  const impostosData = data.charts.tendencia_valor_imposto.map(d => ({ x: d.mes, y: d.valor_impostos }));
  const volumeData = data.charts.volume_tipo_nf.filter(d => d.mes === 'Dez').map(d => ({ x: d.tipo, y: d.quantidade })); // Example for current month

  // Aggregate impostos by tipo
  const impostosAgg = data.charts.distribuicao_impostos.reduce((acc, d) => {
    acc[d.tipo] = (acc[d.tipo] || 0) + d.valor;
    return acc;
  }, {} as Record<string, number>);
  const impostosDonutData = Object.entries(impostosAgg).map(([tipo, valor]) => ({ x: tipo, y: valor }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard de Gestão de NF</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {/* Filters */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilters({ ...filters, mes: filters.mes - 1 || 12 })}>
            <Text style={styles.filterText}>Mês Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilters({ ...filters, mes: filters.mes + 1 > 12 ? 1 : filters.mes + 1 })}>
            <Text style={styles.filterText}>Próximo Mês</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilters({ ...filters, status: filters.status === 'Pendente' ? '' : 'Pendente' })}>
            <Text style={styles.filterText}>Status: {filters.status || 'Todos'}</Text>
          </TouchableOpacity>
        </View>

        {/* KPIs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumos</Text>
          <View style={styles.kpisContainer}>
            {renderKPI('NF Emitidas', data.kpis.nf_emitidas)}
            {renderKPI('NF Recebidas', data.kpis.nf_recebidas)}
            {renderKPI('Valor Total NF Saída', `R$ ${(data.kpis.valor_total_saida / 1000).toFixed(0)}K`)}
            {renderKPI('Impostos Retidos', `R$ ${(data.kpis.impostos_retidos / 1000).toFixed(0)}K`)}
          </View>
        </View>

        {/* Charts */}
        {LineChartCard && BarChartCard && DonutChartCard ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gráficos</Text>
            <LineChartCard title="Tendência: Valor vs. Imposto (Mensal)" data={tendenciaData} />
            <DonutChartCard title="Distribuição de Impostos" data={impostosDonutData} />
            <BarChartCard title="Volume vs. Tipo de NF" data={volumeData} />
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gráficos</Text>
            <Text style={styles.nfText}>Gráficos não disponíveis no Expo Go. Use um build de desenvolvimento nativo.</Text>
          </View>
        )}

        {/* Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alertas Fiscais</Text>
          <FlatList
            data={data.alerts}
            renderItem={renderAlert}
            keyExtractor={(item) => item.tipo}
            scrollEnabled={false}
          />
        </View>

        {/* Recent NFs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notas Fiscais Recentes</Text>
          <FlatList
            data={data.recent_nfs}
            renderItem={renderRecentNF}
            keyExtractor={(item) => item.numero_data}
            scrollEnabled={false}
          />
        </View>

        {/* Top Fornecedores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top 5 Fornecedores Pendentes</Text>
          <FlatList
            data={data.top_5_fornecedores_pendentes}
            renderItem={({ item }: { item: TopFornecedor }) => (
              <View style={styles.nfItem}>
                <Text style={styles.nfText}>{item.nome}</Text>
                <Text style={styles.nfText}>CNPJ: {item.cnpj}</Text>
                <Text style={styles.nfText}>Total a Pagar: R$ {item.total_a_pagar.toFixed(2)}</Text>
              </View>
            )}
            keyExtractor={(item) => item.cnpj}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}