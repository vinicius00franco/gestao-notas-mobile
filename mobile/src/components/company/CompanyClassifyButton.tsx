import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { UnclassifiedCompany } from '@/types';

interface CompanyClassifyButtonProps {
  company: UnclassifiedCompany;
  onClassify: (company: UnclassifiedCompany) => void;
}

const CompanyClassifyButton: React.FC<CompanyClassifyButtonProps> = ({ company, onClassify }) => {
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
        marginTop: 8,
      }}
      onPress={() => onClassify(company)}
      activeOpacity={0.7}>
      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
        Classificar
      </Text>
    </TouchableOpacity>
  );
};

export default CompanyClassifyButton;
