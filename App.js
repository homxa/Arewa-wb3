import { ActivityIndicator, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Screen } from './account active/screen';
import {Provider, useDispatch} from 'react-redux'
import { store } from './redux_store/auth state/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  
  return (
<Provider store={store}>
<NavigationContainer>
<Screen/>


</NavigationContainer>
</Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  
  },
});
