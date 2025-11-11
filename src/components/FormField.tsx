import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface FormFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  editable = true
}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      editable={editable}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
});

export default FormField;