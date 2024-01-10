import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Create } from './creatAccount/create';
import { Login } from './creatAccount/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function App() {
  const Stack = createNativeStackNavigator()
  return (
<NavigationContainer>
<Stack.Navigator>
  <Stack.Screen name='Login' component={Login}/>
  <Stack.Screen name='Create Account' component={Create}/>


</Stack.Navigator>


</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  
  },
});
