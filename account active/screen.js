import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Login } from '../creatAccount/main/login'
import { Create } from '../creatAccount/main/create'
import { Reset } from '../creatAccount/rigist and Login UI/forgetPass'
import { EmailModel } from '../creatAccount/stack/verifyEmail'
import { Home } from './home'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../creatAccount/auth state/useAuth'
import { useEffect, useState } from 'react'

export const Screen =()=>{
  const Stack = createNativeStackNavigator()
const [user] = useAuth()
//const [user,setUser] = useState() 

console.log(user)
  // if(user.ema)
 if(user && !user.emailVerified){
return( 
  <Stack.Navigator>

<Stack.Screen name='Very Password' component={ EmailModel} options={{headerShown: true}}/>

</Stack.Navigator>)

 }
 else if(user && user.emailVerified){



return(
  <Stack.Navigator>
  
  
    <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
  
  </Stack.Navigator> 
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

// }
// else{

// }
}