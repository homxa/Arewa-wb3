import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Login } from '../creatAccount/main/login'
import { Create } from '../creatAccount/main/create'
import { Reset } from '../creatAccount/rigist and Login UI/forgetPass'
import { EmailModel } from '../creatAccount/stack/verifyEmail'
import { Home } from './home'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState} from 'react'
import { ActivityIndicator, ImageBackground, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loginFaild, loginSuccess,} from '../redux_store/config_slices/authSlice'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Settings } from './setting/setting'
import { EditProfilr } from './HomeTabs/editProfile'
const Stack = createNativeStackNavigator()

export const Screen =()=>{

  // getting the user if already login from storage
const dispatch = useDispatch()
const {user} =useSelector((state)=> state.auth)
const [get,setGetting] = useState(false)
  const getUser = async()=>{
  setGetting(true)
    try{
      const user = await AsyncStorage.getItem('user')
      if(user){
        dispatch(loginSuccess(JSON.parse(user)))

      }
    }catch(err){
      console.log(err)
      dispatch(loginFaild(err.message))
    }finally{
      await new Promise((resovle)=> setTimeout(resovle,2000))
      setGetting(false)

    }
  }
useEffect(()=>{
  getUser()

},[])

if(get){
  return (<ImageBackground source={require('../assets/ngn.jpg')} style={{flex: 1}}/>)
}
  if(user && !user.emailVerified){
return( 
<>
  
  <Stack.Navigator>

<Stack.Screen name='Very Password' component={ EmailModel} options={{headerShown: true}}/>

</Stack.Navigator></>)

 }
 else if(user && user.emailVerified){



return(
  <>
 
  <Stack.Navigator>
  
  
    <Stack.Screen name='Main' component={Home} options={{headerShown: false}}/>
    <Stack.Screen name='Settings' component={Settings}/>
    <Stack.Screen name='Edit Profile' component={EditProfilr}/>
  
  </Stack.Navigator>  
  
  </>
)

 } 
 else{
  return(

    <Stack.Navigator>
  
    <Stack.Screen name='Login' component={Login}/>
    <Stack.Screen name='Create Account' component={Create}/>
    <Stack.Screen name='Password Reset' component={Reset}/>
  
  
  </Stack.Navigator>
  )
 }

}





