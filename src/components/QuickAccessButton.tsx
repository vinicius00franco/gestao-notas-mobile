import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface QuickAccessButtonProps {
  title: string;
  onPress: () => void;
}

export default function QuickAccessButton({ title, onPress }: QuickAccessButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          width: '48%',
          marginBottom: theme.spacing.m,
        },
        theme.shadows.small,
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={[styles.buttonText, theme.typography.body, { color: theme.colors.primary }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: '600',
  },
});