import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  title?: string;
  children: ReactNode;
  cardWidth?: number;
};

/**
 * Componente reutilizável para exibir cards em um scroll horizontal.
 * Segue o princípio de composição permitindo que qualquer tipo de card seja passado como children.
 */
export default function HorizontalScrollCards({ title, children, cardWidth = 280 }: Props) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginVertical: theme.spacing.m,
    },
    title: {
      ...theme.typography.h2,
      marginHorizontal: theme.spacing.m,
      marginBottom: theme.spacing.s,
    },
    scrollView: {
      paddingHorizontal: theme.spacing.m,
    },
    scrollContent: {
      paddingRight: theme.spacing.m,
    },
  });

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {children}
      </ScrollView>
    </View>
  );
}
