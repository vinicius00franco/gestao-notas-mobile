import React from 'react';
import { View, Text, StyleSheet, BackHandler, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme/ThemeProvider';
import MainButton from '@/components/MainButton';
import QuickAccessButton from '@/components/QuickAccessButton';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { colors, spacing, typography, shadows } = useTheme();

  const entrar = (tab?: string) => {
    if (tab) {
      navigation.navigate('App', {
        screen: 'Main',
        params: { screen: tab },
      });
    } else {
      navigation.navigate('App');
    }
  };

  const sairDoApp = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      Alert.alert('Indisponível', 'Encerrar o app programaticamente não é permitido no iOS.');
    }
  };

  const quickAccessButtons = [
    { title: 'Dashboard', screen: 'Dashboard' },
    { title: 'A Pagar', screen: 'Pagar' },
    { title: 'A Receber', screen: 'Receber' },
    { title: 'Upload', screen: 'Upload' },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { padding: spacing.l }]}>
        <Text style={[styles.title, typography.h1, { color: colors.primary, marginBottom: spacing.xl }]}>
          Bem-vindo ao Gestão de Notas
        </Text>
        <Text style={[styles.subtitle, typography.body, { color: colors.text, marginBottom: spacing.xxl, textAlign: 'center' }]}>
          Acesse rapidamente as principais funcionalidades do app.
        </Text>

        <MainButton title="Entrar no App" onPress={() => entrar()} />

        <View style={styles.quickAccessContainer}>
          {quickAccessButtons.map((button, index) => (
            <QuickAccessButton
              key={index}
              title={button.title}
              onPress={() => entrar(button.screen)}
            />
          ))}
        </View>

        <QuickAccessButton
          title="Sair do App"
          onPress={sairDoApp}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  quickAccessContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
});