import { Button, Text, View } from "react-native"
import { auth } from "../creatAccount/config/config"
import { signOut } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuth } from "../creatAccount/auth state/useAuth"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { First } from "./HomeTabs/first" 
export const Home = ({navigatin})=>{
  const Tab = createBottomTabNavigator()
const [user,setUser,run] = useAuth()
const logOUt = async()=>{
try{
  await AsyncStorage.removeItem('User')

  await signOut(auth)

  run()

  
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