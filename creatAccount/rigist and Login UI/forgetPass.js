import { useState } from "react";
import { ActivityIndicator, Button, Image, Text, TextInput, View } from "react-native";
import * as yup from 'yup'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { auth } from "../config/config";
import {sendPasswordResetEmail} from 'firebase/auth'
import { useNetwork } from "../config/network";
export const Reset = ({navigation}) => {
  const [connected] = useNetwork()
  const [send,setSend] = useState(false)
  const schema= yup.object().shape({
    email: yup.string().email('Enter valid Email').required('please Enter Your Email')
  })
  const {control,handleSubmit,formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  })
  const data= async (dd) => {
if(connected){
  try{
    setSend(true)
    await sendPasswordResetEmail(auth,dd.email)
   alert('Rest password link sent')
    console.log(dd)

    setTimeout(()=>{
navigation.navigate('Login')
setSend(false)
    },1000)
  }catch(err){
    console.log(err)
  }
}
 
  };
  console.log(auth.currentUser?.email)
  return (
    <View style={{ flex: 1, backgroundColor: "rgb(18,18,40)" }}>
      <View style={{ padding: 16, marginTop: 10 }}>
        <Image
          source={require("../../assets/ngn.jpg")}
          style={{
            width: 100,
            height: 100,
            marginBottom: 10,
            alignSelf: "center",
          }}
        />

        <Text
          style={{
            fontSize: 24,
            marginBottom: 5,
            alignSelf: "flex-start",
            color: "white",
          }}
        >
          Forgot Password
        </Text>
        <Text style={{ color: "white", marginBottom: 10 }}>
          Enter your email address below to receive a password reset link. Check
          your inbox and follow the instructions to reset your password.
        </Text>
      <Controller
      control={control}
      
      render={({field})=>(
<>
        <View
        style={{
          maxWidth: 300,
          paddingVertical: 10,
          borderRadius: 10,
          borderColor: errors.email?.message? 'red':"white",
          borderWidth: 2,
          marginBottom: 4,
        }}
      >
        <TextInput
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
          placeholder="Enter Forgetten Password"
          placeholderTextColor="white"
          style={{ color: "white", paddingLeft: 10 }}
        />
      </View>
     
      </>

   ) }
   name ='email'
      />
       <View>
     
       {send? <ActivityIndicator/> :<Button title="Continue" color="green" onPress={handleSubmit(data)} />}
      </View>
      </View>
    </View>
  );
};
