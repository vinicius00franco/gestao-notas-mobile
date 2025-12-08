import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

interface PickerItem {
  label: string;
  value: string;
}

interface FormPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: PickerItem[];
  testID?: string;
}

const FormPicker: React.FC<FormPickerProps> = ({
  selectedValue,
  onValueChange,
  items,
  testID
}) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
      testID={testID}
    >
      {items.map(item => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 12,
  },
});

export default FormPicker;