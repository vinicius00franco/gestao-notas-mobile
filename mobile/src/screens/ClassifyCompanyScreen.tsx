import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useClassifyCompany } from '../hooks/api';
import { UnclassifiedCompany } from '../types';
import FormField from '@/components/ui/FormField';
import FormPicker from '@/components/ui/FormPicker';
import FormButton from '@/components/ui/FormButton';

export default function ClassifyCompanyScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { company } = route.params;

  const [formData, setFormData] = useState<UnclassifiedCompany>({
    ...company,
    classification: 'fornecedor', // default classification
  });

  const { mutate: classifyCompany, isPending } = useClassifyCompany();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    classifyCompany(formData, {
      onSuccess: () => {
        navigation.goBack();
        Alert.alert('Success', 'Company classified successfully.');
      },
      onError: () => {
        Alert.alert('Error', 'Failed to classify company.');
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormField
        placeholder="Nome Fantasia"
        value={formData.nome_fantasia}
        onChangeText={(value: string) => handleInputChange('nome_fantasia', value)}
      />
      <FormField
        placeholder="Razão Social"
        value={formData.razao_social}
        onChangeText={(value: string) => handleInputChange('razao_social', value)}
      />
      <FormField
        placeholder="CNPJ"
        value={formData.cnpj}
        onChangeText={(value: string) => handleInputChange('cnpj', value)}
        editable={false}
      />
      <FormField
        placeholder="Logradouro"
        value={formData.logradouro}
        onChangeText={(value: string) => handleInputChange('logradouro', value)}
      />
      <FormField
        placeholder="Número"
        value={formData.numero}
        onChangeText={(value: string) => handleInputChange('numero', value)}
      />
      <FormField
        placeholder="Bairro"
        value={formData.bairro}
        onChangeText={(value: string) => handleInputChange('bairro', value)}
      />
      <FormField
        placeholder="Cidade"
        value={formData.cidade}
        onChangeText={(value: string) => handleInputChange('cidade', value)}
      />
      <FormField
        placeholder="UF"
        value={formData.uf}
        onChangeText={(value: string) => handleInputChange('uf', value)}
      />
      <FormField
        placeholder="CEP"
        value={formData.cep}
        onChangeText={(value: string) => handleInputChange('cep', value)}
      />
      <FormField
        placeholder="Telefone"
        value={formData.telefone}
        onChangeText={(value: string) => handleInputChange('telefone', value)}
      />
      <FormField
        placeholder="Email"
        value={formData.email}
        onChangeText={(value: string) => handleInputChange('email', value)}
      />
      <FormPicker
        selectedValue={formData.classification}
        onValueChange={(value: string) => handleInputChange('classification', value)}
        items={[
          { label: 'Fornecedor', value: 'fornecedor' },
          { label: 'Cliente', value: 'cliente' },
          { label: 'Outra Empresa', value: 'outra_empresa' },
          { label: 'Outro', value: 'outro' },
        ]}
      />
      <FormButton
        title="Save"
        onPress={handleSubmit}
        disabled={isPending}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});