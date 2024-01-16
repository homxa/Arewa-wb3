import 'react-native-gesture-handler'

import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Screen } from './account active/screen';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { store } from './redux_store/auth state/store';
export default function App() {
  return (
<Provider store={store}>
  
<NavigationContainer>




<Screen/>


</NavigationContainer>
{/* <Drawer/> */}
</Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  
  },
});
