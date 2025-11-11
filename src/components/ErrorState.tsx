import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={{ fontSize: 16, marginBottom: 16 }}>{message}</Text>
      <TouchableOpacity onPress={onRetry} style={{ padding: 12, backgroundColor: '#6200ee', borderRadius: 8 }}>
        <Text style={{ color: 'white' }}>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );
}