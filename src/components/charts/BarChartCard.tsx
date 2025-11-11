import React from 'react';
import { Dimensions } from 'react-native';
import { Card } from '@/components/ui';
import { useTheme } from '@/theme/ThemeProvider';

// Dynamically require victory-native to avoid ESM/CJS interop issues in Expo Go
let Victory: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Victory = require('victory-native');
} catch (e) {
  Victory = null;
}

type BarData = { x: string | number; y: number };

type Props = {
  title?: string;
  data: BarData[];
  height?: number;
};

export default function BarChartCard({
  title,
  data,
  height = 220,
}: Props) {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = Math.max(240, screenWidth - 32);
  const VictoryChart = Victory?.VictoryChart;
  const VictoryAxis = Victory?.VictoryAxis;
  const VictoryBar = Victory?.VictoryBar;
  return (
    <Card title={title}>
      {VictoryChart && VictoryBar && VictoryAxis ? (
        <VictoryChart width={chartWidth} height={height} domainPadding={{ x: 20 }} padding={{ top: 10, bottom: 40, left: 40, right: 16 }}>
          <VictoryAxis style={{ tickLabels: { fontSize: 10, fill: theme.colors.onSurfaceVariant } }} />
          <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 10, fill: theme.colors.onSurfaceVariant } }} />
          <VictoryBar data={data} style={{ data: { fill: theme.colors.primary } }} />
        </VictoryChart>
      ) : (
        <></>
      )}
    </Card>
  );
}