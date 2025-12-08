import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

interface FilePickerButtonProps {
  onPickFile: () => void;
  fileName?: string;
}

const FilePickerButton: React.FC<FilePickerButtonProps> = ({ onPickFile, fileName }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPickFile}
      activeOpacity={0.7}>
      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
        {fileName ? `Selecionado: ${fileName}` : 'Escolher arquivo'}
      </Text>
    </TouchableOpacity>
  );
};

export default FilePickerButton;
