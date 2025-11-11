import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { UnclassifiedCompany } from '@/types';
import CompanyClassifyButton from './CompanyClassifyButton';

interface CompanyListItemProps {
  company: UnclassifiedCompany;
  onClassify: (company: UnclassifiedCompany) => void;
}

const CompanyListItem: React.FC<CompanyListItemProps> = ({ company, onClassify }) => {
  const { colors, typography } = useTheme();

  return (
    <View
      style={{
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{ flex: 1 }}>
        <Text style={[typography.body, { color: colors.text, fontWeight: '600', marginBottom: 4 }]}>
          {company.nome_fantasia}
        </Text>
        <Text style={[typography.caption, { color: colors.placeholder }]}>
          {company.cnpj}
        </Text>
      </View>
      <CompanyClassifyButton company={company} onClassify={onClassify} />
    </View>
  );
};

export default CompanyListItem;
