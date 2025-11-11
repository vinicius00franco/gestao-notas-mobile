import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

interface SplashContentProps {
  text?: string;
}

const SplashContent: React.FC<SplashContentProps> = ({ text = 'Carregando...' }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[typography.body, { color: colors.text, marginTop: 16 }]}>
        {text}
      </Text>
    </View>
  );
};

export default SplashContent;
