import React, { useMemo } from 'react';
import { Dimensions, Text, StyleSheet, View } from 'react-native';
import { Card } from '@/components/ui';
import { useTheme } from '@/theme/ThemeProvider';

// Dynamic require to improve compatibility in Expo Go
let Victory: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Victory = require('victory-native');
} catch (e) {
  Victory = null;
}

type Point = { x: string | number; y: number };

type Props = {
  title?: string;
  data: Point[];
  height?: number;
};

export default function LineChartCard({ title = 'Average of Sales by month', data, height = 200 }: Props) {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = Math.max(240, screenWidth - 32);

  const VictoryChart = Victory?.VictoryChart;
  const VictoryLine = Victory?.VictoryLine;
  const VictoryAxis = Victory?.VictoryAxis;
  const VictoryGroup = Victory?.VictoryGroup;
  const VictoryArea = Victory?.VictoryArea;

  const stroke = theme.colors.primary;

  const chartData = useMemo(() => data, [data]);

  const styles = StyleSheet.create({
    fallbackContainer: {
      height,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    fallbackText: {
      ...theme.typography.body,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
    },
    dataList: {
      marginTop: 12,
      width: '100%',
    },
    dataRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
    },
    dataLabel: {
      ...theme.typography.caption,
      color: theme.colors.text,
      flex: 1,
    },
    dataValue: {
      ...theme.typography.caption,
      color: theme.colors.primary,
      fontWeight: 'bold',
      textAlign: 'right',
      flex: 1,
    },
  });

  return (
    <Card title={title}>
      {VictoryChart && VictoryLine && VictoryAxis && VictoryGroup && VictoryArea ? (
        <VictoryChart width={chartWidth} padding={{ top: 10, bottom: 40, left: 40, right: 16 }} height={height}>
          <VictoryAxis style={{ tickLabels: { fontSize: 10, fill: theme.colors.onSurfaceVariant } }} />
          <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 10, fill: theme.colors.onSurfaceVariant } }} />
          <VictoryGroup>
            <VictoryArea data={chartData} style={{ data: { fill: theme.colors.primaryContainer, strokeWidth: 0 } }} />
            <VictoryLine data={chartData} style={{ data: { stroke, strokeWidth: 3 } }} interpolation="natural" />
          </VictoryGroup>
        </VictoryChart>
      ) : (
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>
            📈 Tendência de Valores Mensais
          </Text>
          <View style={styles.dataList}>
            {chartData.map((point, index) => (
              <View key={index} style={styles.dataRow}>
                <Text style={styles.dataLabel}>{point.x}</Text>
                <Text style={styles.dataValue}>R$ {point.y.toLocaleString('pt-BR')}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Card>
  );
}
