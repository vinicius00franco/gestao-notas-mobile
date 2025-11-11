import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

interface UploadSubmitButtonProps {
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const UploadSubmitButton: React.FC<UploadSubmitButtonProps> = ({
  onPress,
  disabled = false,
  isLoading = false,
}) => {
  const { colors } = useTheme();

  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      testID="submit-button"
      style={{
        backgroundColor: isDisabled ? '#A0A0A0' : colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isDisabled ? 0.6 : 1,
      }}
      disabled={isDisabled}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '600',
        }}>
        {isLoading ? 'Enviando...' : 'Processar Nota'}
      </Text>
    </TouchableOpacity>
  );
};

export default UploadSubmitButton;
