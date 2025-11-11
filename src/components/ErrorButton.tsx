import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface ErrorButtonProps {
  onRetry: () => void;
}

export default function ErrorButton({ onRetry }: ErrorButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.colors.primary }]}
      onPress={onRetry}
      activeOpacity={0.7}>
      <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>
        Tentar Novamente
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});