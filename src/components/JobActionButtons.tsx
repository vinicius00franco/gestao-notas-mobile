import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { JobStatus } from '../types';

interface JobActionButtonsProps {
  item: JobStatus;
  onReprocess?: (uuid: string) => void;
  onDelete?: (uuid: string) => void;
  isReprocessing?: boolean;
  isDeleting?: boolean;
}

export default function JobActionButtons({
  item,
  onReprocess,
  onDelete,
  isReprocessing = false,
  isDeleting = false,
}: JobActionButtonsProps) {
  const handleReprocess = () => {
    onReprocess?.(item.uuid);
  };

  const handleDelete = () => {
    Alert.alert('Excluir job', `Confirmar exclusão do job ${item.uuid}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => onDelete?.(item.uuid),
      },
    ]);
  };

  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        style={[styles.button, isReprocessing && styles.buttonDisabled]}
        onPress={handleReprocess}
        disabled={isReprocessing}
        activeOpacity={0.7}>
        <Text style={[styles.buttonText, isReprocessing && styles.buttonTextDisabled]}>
          Processar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonDestructive, isDeleting && styles.buttonDisabled]}
        onPress={handleDelete}
        disabled={isDeleting}
        activeOpacity={0.7}>
        <Text style={[styles.buttonText, isDeleting && styles.buttonTextDisabled]}>
          Excluir
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDestructive: {
    backgroundColor: '#FF3B30',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  buttonTextDisabled: {
    opacity: 0.6,
  },
});