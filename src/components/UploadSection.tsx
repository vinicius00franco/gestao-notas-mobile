import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

interface UploadSectionProps {
  label: string;
  children: React.ReactNode;
}

const UploadSection: React.FC<UploadSectionProps> = ({ label, children }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={{ gap: 8, marginBottom: 12 }}>
      <Text style={[typography.body, { color: colors.text, fontWeight: '600' }]}>
        {label}
      </Text>
      {children}
    </View>
  );
};

export default UploadSection;
