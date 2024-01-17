import { auth, db } from "../creatAccount/config/config"
import { signOut } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { logOut, loginSuccess2 } from "../redux_store/config_slices/authSlice"
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Profile } from "./HomeTabs/profile"
import { EditProfilr } from "./HomeTabs/editProfile"
import { Course } from "./HomeTabs/course"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
export const Home = ({navigatin})=>{
const dispatch = useDispatch()
const {user} = useSelector((state)=> state.auth);
const {userProfile} = useSelector((state)=> state.auth)

useEffect(()=>{
  console.log('this one',auth.currentUser)
const fectProfile = async()=>{
try{
  const docRef = collection(db,'userProfiles')
  const specified = query(docRef,where('userId','==', user.uid))
  const getten = await getDocs(specified);
  const create = getten.docs[0].data()
  const value = {
    UserName: create.userName,
    metaData: create.metaData,
    profilePic: create.profilePic,
    student: create.student

  }
  dispatch(loginSuccess2(  value
    ))
    console.log(value)

}catch(err){
  console.log(err)
  }
}

let isM = true

if(user && isM){
  fectProfile()

}
// // }// AsyncStorage.setItem()





// //   AsyncStorage.getItem('userProfile').then((res)=>{
// //     if(res){
// // dispatch(loginSuccess2(res))
// //     }else{
// //       console.log('no item found')
// //     }}).catch(err => console.log('error while gettin user proflie',err.message))
},[user])

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