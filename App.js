import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Create } from './All code/account/login_create/create';
import { SafeAreaView } from 'react-native';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
     


      <Create/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  
  },
});
