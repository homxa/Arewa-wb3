import {useEffect, useState } from 'react'
import {sendEmailVerification, signOut,} from 'firebase/auth'
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../config/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux_store/config_slices/authSlice'


export const EmailModel = ({navigation})=>{

  // if user have not yet verify their email this will show up
  const [model,setModel] = useState(true)
  const dispatch = useDispatch()

  // send recovery mail to that user 
const sendvery = async ()=>{
try{
  await sendEmailVerification(auth.currentUser)

}catch(err){
  console.log(err)
}

}
useEffect(()=>{

  sendvery()
},[])


// if clicked the loging in the model log them out
const logOUt = async()=>{
  try{
dispatch(logOut())
    await signOut(auth)

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