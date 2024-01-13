import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Login } from '../creatAccount/main/login'
import { Create } from '../creatAccount/main/create'
import { Reset } from '../creatAccount/rigist and Login UI/forgetPass'
import { EmailModel } from '../creatAccount/stack/verifyEmail'
import { Home } from './home'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect} from 'react'
import { ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loginFaild, loginSuccess, loginstart } from '../redux_store/config_slices/authSlice'
export const Screen =()=>{
  const Stack = createNativeStackNavigator()

  // getting the user if already login from storage
const dispatch = useDispatch()
  const getUser = async()=>{
    dispatch(loginstart())
    try{
      const user = await AsyncStorage.getItem('user')
      console.log(user)
      dispatch(loginSuccess(JSON.parse(user)))
    }catch(err){
      console.log(err)
      dispatch(loginFaild(err.message))
    }
  }
useEffect(()=>{
 
getUser()
},[])
const {user,loading} =useSelector((state)=> state.auth)

//const [user,setUser] = useState() 
console.log(user,loading)
  // if(user.ema
  // redenring the component base on user
if(loading){
  return <ActivityIndicator/>
}
  else if(user && !user.emailVerified){
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