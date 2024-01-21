// SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, } from 'react-native';
import { Picker as Pick } from '@react-native-picker/picker';


export const Course = () =>  {
  const [selectedPhase, setSelectedPhase] = useState('phase2');
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  return (
    <View style={{paddingLeft: 10}}>
      <Text style={styles.textTop}>Select Course Phase:</Text>
      <Pick
        selectedValue={selectedPhase}
        onValueChange={(itemValue) => setSelectedPhase(itemValue)}
        mode={Platform.OS === 'ios' ? 'modal' : 'dropdown'} // Specify mode based on platform
style={styles.text}      >
        <Pick.Item label="Phase 1" value="phase1"  />
        <Pick.Item label="Phase 2" value="phase2" />
        <Pick.Item label="Phase 3" value="phase3" />
      </Pick>

      <Text style={styles.textTop}>Select Language:</Text>
      <Pick
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
        mode={Platform.OS === 'ios' ? 'modal' : 'dropdown'} // Specify mode based on platform
        style={styles.text}  >
        <Pick.Item label="English" value="english"/>
        <Pick.Item label="Hause" value="Hausa" />
      </Pick>

      <Button title='Update Course'/>
    </View> 
  );
};;
const styles = StyleSheet.create({
 text:{
  color: 'white',
  fontWeight: 'bold',
 },
 textTop:{
  fontSize: 17,
  color: 'white'
 }
})

