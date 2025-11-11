import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

const NotaFiscalListHeader = () => {
  const { colors, typography } = useTheme();

  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <Text style={[typography.h2, { color: colors.text }]}>Notas Fiscais</Text>
    </View>
  );
};

export default NotaFiscalListHeader;
