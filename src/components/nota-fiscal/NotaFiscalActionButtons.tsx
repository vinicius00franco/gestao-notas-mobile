import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { NotaFiscal } from '@/types';

interface NotaFiscalActionButtonsProps {
  nota: NotaFiscal;
  onView: (nota: NotaFiscal) => void;
  onDelete: (uuid: string) => void;
  isDeleting?: boolean;
}

const NotaFiscalActionButtons: React.FC<NotaFiscalActionButtonsProps> = ({
  nota,
  onView,
  onDelete,
  isDeleting = false,
}) => {
  const { colors } = useTheme();

  const handleDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir esta nota fiscal?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => onDelete(nota.uuid),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => onView(nota)}
        activeOpacity={0.7}>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>Ver</Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="delete-button"
        style={{
          backgroundColor: colors.error,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isDeleting ? 0.6 : 1,
        }}
        onPress={handleDelete}
        disabled={isDeleting}
        activeOpacity={0.7}>
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>
          {isDeleting ? 'Excluindo...' : 'Excluir'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotaFiscalActionButtons;
