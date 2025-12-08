import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface MainButtonProps {
  title: string;
  onPress: () => void;
}

export default function MainButton({ title, onPress }: MainButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: theme.colors.primary, marginBottom: theme.spacing.xl },
        theme.shadows.medium,
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={[styles.buttonText, theme.typography.h2, { color: theme.colors.onPrimary }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});