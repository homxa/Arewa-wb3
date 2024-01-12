import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Screen } from './account active/screen';

export default function App() {
  
  
  return (
<NavigationContainer>
<Screen/>


</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  
  },
});
