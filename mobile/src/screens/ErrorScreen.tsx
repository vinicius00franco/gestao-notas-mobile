import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import ErrorMessage from '@/components/ui/ErrorMessage';
import ErrorButton from '@/components/ui/ErrorButton';

interface Props {
  onRetry: () => void;
}

const ErrorScreen: React.FC<Props> = ({ onRetry }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.l,
    },
  });

  return (
    <View style={styles.container}>
      <ErrorMessage title="Oops! Algo deu errado." message="Não foi possível concluir sua solicitação. Por favor, tente novamente." />
      <ErrorButton onRetry={onRetry} />
    </View>
  );
};

export default ErrorScreen;