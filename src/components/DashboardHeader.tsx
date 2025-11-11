import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function DashboardHeader() {
  const theme = useTheme();

  return (
    <View style={[styles.header, { paddingHorizontal: theme.spacing.m }]}>
      <Text style={[styles.title, theme.typography.h2, { color: theme.colors.text }]}>
        Dashboard de Gestão de NF
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 4,
    paddingBottom: 8,
  },
  title: {},
});