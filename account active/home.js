import { auth } from "../creatAccount/config/config"
import { signOut } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { logOut } from "../redux_store/config_slices/authSlice"
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Profile } from "./HomeTabs/profile"
import { EditProfilr } from "./HomeTabs/editProfile"
import { Course } from "./HomeTabs/course"
export const Home = ({navigatin})=>{
 

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

    <Tab.Navigator screenOptions={
    {
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'black',
      tabBarShowLabel: false,
   tabBarActiveTintColor: 'white',
   tabBarActiveBackgroundColor: 'rgb(18,18,40)',  
    }
    }>
 

      <Tab.Screen name="Home" component={EditProfilr} options={{
        tabBarIcon: ({color})=><Feather name="home" size={24} color={color} />

      }}/>

<Tab.Screen name="Profile" component={Profile}   options={{
        tabBarIcon: ({color})=> <FontAwesome name="user" size={24} color={color} />,
headerTitle: 'Profile'
        


      }}/>
        <Tab.Screen name="cryto news" component={Course}   options={{
        tabBarIcon: ({color})=><Feather name="trending-up" size={24} color={color} style={{position: 'relative'}}/>,


      }}/>


<Tab.Screen name="Notifications" component={Profile}   options={{
        tabBarIcon: ({color})=><MaterialIcons name="notifications" size={24} color={color} />
      }}/>
     


    
    
     
     

    </Tab.Navigator>
    </>
)

}