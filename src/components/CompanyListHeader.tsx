import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

interface CompanyListHeaderProps {
  count?: number;
}

const CompanyListHeader: React.FC<CompanyListHeaderProps> = ({ count = 0 }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <Text style={[typography.h2, { color: colors.text }]}>
        Empresas Não Classificadas {count > 0 && `(${count})`}
      </Text>
    </View>
  );
};

export default CompanyListHeader;
