import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Login } from '../creatAccount/main/login'
import { Create } from '../creatAccount/main/create'
import { Reset } from '../creatAccount/rigist and Login UI/forgetPass'
import { EmailModel } from '../creatAccount/stack/verifyEmail'
import { Home } from './home'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState} from 'react'
import { ActivityIndicator, Image, ImageBackground, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loginFaild, loginSuccess,} from '../redux_store/config_slices/authSlice'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Settings } from './setting/setting'
import { EditProfilr } from './HomeTabs/editProfile'
import { Play } from './HomeTabs/play'
import * as Font from 'expo-font'
import { Fonts } from './font'
const Stack = createNativeStackNavigator()

export const Screen =()=>{

  // getting the user if already login from storage
const dispatch = useDispatch()
const {user} =useSelector((state)=> state.auth)
const {loading} =useSelector((state)=> state.userP)

// loading fonts functions
const loadFonts = async () => {
  try{
    await Font.loadAsync({
      [Fonts.regular]: require('../assets/Fira_Sans/FiraSans-Black.ttf'), // Adjust the path
    [Fonts.italic]: require('../assets/font/NotoSansJP-VariableFont_wght.ttf')
    
     // italic: require('./path/to/ItalicFont.ttf'), // Adjust the path
      // Add more fonts as needed
    })

  }catch(err){
    console.log('faild to get font',err)
  };
};

const [get,setGetting] = useState(false)
// getting userDetails  from storage and loading all fonts in it
  const getUser = async()=>{
  setGetting(true)
    try{
      await loadFonts()

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
// splash sceen
if(get){
  return ( <View style={{flex: 1,backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}><Image source={require('../assets/ngn.jpg')} style={{flex: 1}} resizeMode='contain'/></View>)
}

// display tabs base on the user verification
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
 
  <Stack.Navigator >
  
  
    <Stack.Screen name='Main' component={Home} options={{headerShown: false}}/>
    <Stack.Screen name='Play' component={Play} />

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





