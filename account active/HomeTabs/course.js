// SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, } from 'react-native';
import { Picker as Pick } from '@react-native-picker/picker';
export const Course = () => {
  const [selectedPhase, setSelectedPhase] = useState('phase1');
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  return (
    <View style={styles.container}>
    <Text style={styles.label}>Select Course Phase:</Text>
    <Pick
      style={styles.picker}
      selectedValue={selectedPhase}
      onValueChange={(itemValue) => setSelectedPhase(itemValue)}
      mode={'dropdown'}
    >
      <Pick.Item label="Phase 1" value="phase1" />
      <Pick.Item label="Phase 2" value="phase2" />
      <Pick.Item label="Phase 3" value="phase3" />
    </Pick>

    <Button title="Update Content" />
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    width: 200,
    height: 50,
    marginBottom: 20,
  },
})

