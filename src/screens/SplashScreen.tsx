import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import SplashContent from '@/components/SplashContent';

const SplashScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SplashContent />
    </View>
  );
};

export default SplashScreen;