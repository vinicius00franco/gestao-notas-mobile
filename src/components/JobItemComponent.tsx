import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { JobStatus } from '../types';
import JobActionButtons from './JobActionButtons';

interface JobItemComponentProps {
  item: JobStatus;
}

export default function JobItemComponent({ item }: JobItemComponentProps) {
  return (
    <View style={styles.jobItem}>
      <Text style={styles.jobUuid}>UUID: {item.uuid}</Text>
      {item.numero_nota && <Text style={styles.jobNumero}>Número: {item.numero_nota}</Text>}
      <Text>Status: {item.status.codigo}</Text>
      {item.erro && <Text style={{ color: 'red' }}>Erro: {item.erro}</Text>}
      <JobActionButtons item={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  jobItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  jobUuid: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobNumero: {
    marginBottom: 4,
  },
});