import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NotaFiscal } from '@/types';
import withErrorBoundary from '@/components/withErrorBoundary';
import { useDeleteNotaFiscal } from '../hooks/api';
import NotaFiscalDetailHeader from '@/components/NotaFiscalDetailHeader';
import NotaFiscalInfo from '@/components/NotaFiscalInfo';
import DeleteNotaButton from '@/components/DeleteNotaButton';

function NotaFiscalDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { nota } = route.params as { nota: NotaFiscal };
  const deleteNotaMutation = useDeleteNotaFiscal();

  const handleDelete = (uuid: string) => {
    deleteNotaMutation.mutate(uuid, {
      onSuccess: () => {
        navigation.goBack();
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <NotaFiscalDetailHeader />
      <ScrollView>
        <NotaFiscalInfo nota={nota} />
        <View style={{ padding: 16 }}>
          <DeleteNotaButton
            uuid={nota.uuid}
            onDelete={handleDelete}
            isDeleting={deleteNotaMutation.isPending}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default withErrorBoundary(NotaFiscalDetailScreen);