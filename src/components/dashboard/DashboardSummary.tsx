import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import KPICard from './KPICard';
import { LineChartCard } from '../charts';
import { DashboardData } from '../../types';

type Props = {
  data: DashboardData;
};

export default function DashboardSummary({ data }: Props) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    section: { marginVertical: 8 },
    sectionTitle: { ...theme.typography.h2, marginHorizontal: 16, marginBottom: 8, color: theme.colors.text },
    kpisContainer: { paddingHorizontal: 16 },
    row: { flexDirection: 'row', marginVertical: 4 },
  });

  return (
    <>
      {/* KPIs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumos</Text>
        <View style={styles.kpisContainer}>
          <View style={styles.row}>
            <KPICard label="NF Emitidas" value={data.kpis.nf_emitidas} />
            <KPICard label="NF Recebidas" value={data.kpis.nf_recebidas} />
          </View>
          <View style={styles.row}>
            <KPICard label="Valor Total NF Saída" value={`R$ ${(data.kpis.valor_total_saida / 1000).toFixed(0)}K`} />
            <KPICard label="Impostos Retidos" value={`R$ ${(data.kpis.impostos_retidos / 1000).toFixed(0)}K`} />
          </View>
        </View>
      </View>

      {/* Gráfico de Valores por Mês */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tendência de Valores por Mês</Text>
        <LineChartCard
          title="Valor Bruto Mensal"
          data={data.charts.tendencia_valor_imposto.map(item => ({ x: item.mes, y: item.valor_bruto }))}
        />
      </View>
    </>
  );
}