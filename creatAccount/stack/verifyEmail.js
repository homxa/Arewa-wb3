import {useEffect, useState } from 'react'
import {sendEmailVerification, signOut,} from 'firebase/auth'
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../config/config'
import { useAuth } from '../auth state/useAuth'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const EmailModel = ({navigation})=>{
  const [model,setModel] = useState(true)
  const [user] = useAuth()
const sendvery = async ()=>{
await sendEmailVerification(user)

}
useEffect(()=>{

  sendvery()
},[])
const logOUt = async()=>{
  try{
    await signOut(auth)
   await AsyncStorage.removeItem('User')
   navigation.navigate('Login')


  }catch(err){
    console.log(err)
  }
  }
return(
  <Modal
        visible={model}
        animationType="slide"
        style={{ flex: 1, maxHeight: 100 }}
        onRequestClose={() =>{setModel((prev) => !prev)
          logOUt()}}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgb(18,18,40)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={require('../../assets/ngn.jpg')} resizeMode="contain" style={{width: 100,height: 100,}}/>
          <Text style={{ color: "white" }}>
            Hi there! A verification email has been sent to your email address.
            Please check your inbox and follow the instructions to complete the
            verification process. If you don't see the email, kindly check your
            spam folder as well. Thank you!
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              backgroundColor: "white",
              paddingLeft: 50,
              paddingRight: 50,
              paddingVertical: 10,
              marginRight: 30,
            }}
            onPress={() => {setModel((prev) => !prev)
            logOUt()

          }}
            
          >
            <Text style={{ color: "black" }}>Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>


)
  }