import React from 'react';
import { TextInput, Platform } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

interface CNPJInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const CNPJInput: React.FC<CNPJInputProps> = ({ value, onChangeText }) => {
  const { colors } = useTheme();

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="CNPJ (opcional)"
      keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        padding: 12,
        borderRadius: 8,
        color: colors.text,
        fontSize: 16,
      }}
      placeholderTextColor={colors.placeholder}
    />
  );
};

export default CNPJInput;
