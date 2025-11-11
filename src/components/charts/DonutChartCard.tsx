import React from 'react';
import { View, Dimensions } from 'react-native';
import { Card } from '@/components/ui';
import { useTheme } from '@/theme/ThemeProvider';

// Dynamic require for Expo Go compatibility
let Victory: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Victory = require('victory-native');
} catch (e) {
  Victory = null;
}

type Props = {
  title?: string;
  data: { x: string; y: number; color?: string }[];
  height?: number;
  innerRadius?: number;
};

export default function DonutChartCard({ title = 'Metadata completeness', data, height = 220, innerRadius = 70 }: Props) {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = Math.max(240, screenWidth - 32);
  const colors = data.map(d => d.color || theme.colors.primary);
  const VictoryPie = Victory?.VictoryPie;
  return (
    <Card title={title}>
      <View accessible accessibilityLabel={title}>
        {VictoryPie ? (
          <VictoryPie
            width={chartWidth}
            height={height}
            data={data}
            colorScale={colors}
            innerRadius={innerRadius}
            labels={() => ''}
            padAngle={2}
            style={{
              labels: { fill: theme.colors.text },
            }}
          />
        ) : (
          <></>
        )}
      </View>
    </Card>
  );
}
