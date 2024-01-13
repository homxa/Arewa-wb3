import { Button, Text, View } from "react-native"
import { auth } from "../creatAccount/config/config"
import { signOut } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { First } from "./HomeTabs/first" 
import { useDispatch } from "react-redux"
import { logOut } from "../redux_store/config_slices/authSlice"
export const Home = ({navigatin})=>{
  const dispatch = useDispatch()
 

  const Tab = createBottomTabNavigator()
const logOUt = async()=>{
try{
 AsyncStorage.removeItem('user').then((res)=> console.log('removed'))
      // Logout from Firebase
      await signOut(auth);
dispatch(logOut())
      // Navigate to the login screen

  
  
}catch(err){
  console.log(err)
}
}



return(
<>



  <View style={{flex:1, alignItems: "center",justifyContent: "center"}}>
   <Button title="Logout" onPress={logOUt}/>
      <Text>tttt</Text>
    </View>
    <Tab.Navigator>
      <Tab.Screen name="home" component={First}/>
      <Tab.Screen name="llf" component={First}/>
      <Tab.Screen name="ddd" component={First}/>

    </Tab.Navigator>
    </>
)

}