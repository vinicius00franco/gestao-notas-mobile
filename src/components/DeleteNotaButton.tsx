import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

interface DeleteNotaButtonProps {
  uuid: string;
  onDelete: (uuid: string) => void;
  isDeleting?: boolean;
}

const DeleteNotaButton: React.FC<DeleteNotaButtonProps> = ({ uuid, onDelete, isDeleting = false }) => {
  const { colors } = useTheme();

  const handlePress = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir esta nota fiscal?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => onDelete(uuid),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      testID="delete-button"
      style={{
        backgroundColor: colors.error,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isDeleting ? 0.6 : 1,
      }}
      onPress={handlePress}
      disabled={isDeleting}
      activeOpacity={0.7}>
      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
        {isDeleting ? 'Excluindo...' : 'Excluir'}
      </Text>
    </TouchableOpacity>
  );
};

export default DeleteNotaButton;
