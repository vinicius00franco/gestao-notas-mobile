import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useUploadNota } from '../hooks/api';
import FilePickerButton from '@/components/FilePickerButton';
import CNPJInput from '@/components/CNPJInput';
import UploadSubmitButton from '@/components/UploadSubmitButton';
import UploadSection from '@/components/UploadSection';

export default function UploadNotaScreen() {
  const [cnpj, setCnpj] = useState('');
  const [file, setFile] = useState<{ uri: string; name: string; type: string } | null>(null);
  const nav = useNavigation<any>();
  const { mutateAsync, isPending } = useUploadNota();

  async function pickFile() {
    console.log('[UploadNotaScreen] Iniciando seleção de arquivo');
    const res = await DocumentPicker.getDocumentAsync({ multiple: false });
    if (res.assets && res.assets[0]) {
      const a = res.assets[0];
      console.log('[UploadNotaScreen] Arquivo selecionado:', { name: a.name, size: a.size, mimeType: a.mimeType });
      setFile({ uri: a.uri, name: a.name || 'nota', type: a.mimeType || 'application/octet-stream' });
    } else {
      console.log('[UploadNotaScreen] Nenhum arquivo selecionado');
    }
  }

  async function onSubmit() {
    if (!file) return;
    console.log('[UploadNotaScreen] Iniciando upload da nota fiscal', {
      fileName: file.name,
      cnpj: cnpj || 'não informado',
    });
    try {
      const data: any = { file };
      if (cnpj) data.meu_cnpj = cnpj;
      const out = await mutateAsync(data);
      console.log('[UploadNotaScreen] Upload concluído com sucesso', {
        job_uuid: out.job_uuid,
        message: out.message,
      });
      showMessage({
        message: out.message,
        type: 'success',
      });
      nav.navigate('JobStatus', { uuid: out.job_uuid });
    } catch (error: any) {
      console.error('[UploadNotaScreen] Erro no upload da nota fiscal', {
        error: error.message,
        response: error.response?.data,
      });
      showMessage({
        message: error.response?.data?.detail || 'An error occurred',
        type: 'danger',
      });
    }
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16, gap: 12 }}>
      <UploadSection label="Selecione o arquivo da Nota Fiscal">
        <FilePickerButton onPickFile={pickFile} fileName={file?.name} />
      </UploadSection>

      <UploadSection label="Informe o CNPJ da sua empresa (opcional)">
        <CNPJInput value={cnpj} onChangeText={setCnpj} />
      </UploadSection>

      <View style={{ marginTop: 12 }}>
        <UploadSubmitButton
          onPress={onSubmit}
          disabled={!file}
          isLoading={isPending}
        />
      </View>
    </ScrollView>
  );
}
