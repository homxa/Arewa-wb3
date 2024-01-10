import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useState } from "react";

import { View, Text, TextInput, StyleSheet, Image,TouchableOpacity} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { deatail } from "./logindeatils";

// UI of the Logins
  const Render = ({item,errors,control,}) => {
  const [viseble, setVisible] = useState(false);

  return (
    <Controller
      control={control}
      render={({ field }) => (
        <>
          <View 
            style={[
              styles.Input,
              {
                position: "relative",
                overflow: "hidden",
                borderColor: errors[item.user]?.message ? "red" : "white",
              },
            ]}
          >
            <Text style={{ paddingLeft: 10 }}>
              {item.icon.fontName === "MaterialIcons" ? (
                <MaterialIcons
                  name={item.icon.name}
                  size={item.icon.size}
                  color= {errors[item.user]?.message ? "red" : "white"}
                />
              ) : null}
            </Text>
            <TextInput
              placeholder={`${item.user}`}
              onChangeText={(value) => {
                field.onChange(value);
              }}
              onBlur={field.onBlur}
              value={field.value}
              style={{ paddingLeft: 10, width: 195,color: 'white' }}
              secureTextEntry={
                item.passIcon && item.passIcon.fontName == "Feather"
                  ? viseble
                  : false
              }
              placeholderTextColor='gray'
              
            />
            {item.passIcon.fontName === "Feather" ? (
              <Text
                style={{
                  position: "absolute",
                  right: 20,
                  top: 6,
                  zIndex: 3,
                }}
                onPress={() => setVisible((prev) => !prev)}
              >
                {viseble ? (
                  <Feather name="eye-off" size={24} color="white" />
                ) : (
                  <Feather name="eye" size={24} color="white" />
                )}
              </Text>
            ) : (
              ""
            )}
          </View>
          <Text
            style={{
              marginBottom: 5,
              fontSize: 12,
              color: "red",
              fontWeight: 600,
            }}
          >
            {errors[item.user]?.message}
          </Text>
        </>
      )}
      name={`${item.user}`}
    />
  );
};



export const Login = ({navigation}) => {

  // input validating
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("invalid email")
      .required("Please Enter Your Email "),
    password: yup
      .string("enter password")
      .min(4)
      .max(10)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      )
      .required("Please Enter You Password"),
  
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  
 
  // recieved data
  const data = (dd) => {
    console.log(dd);
  };

  return (
    <>
<KeyboardAwareScrollView style={[{flex: 1,backgroundColor:'rgb(18,18,40)',}]}>
<View style={[styles.top,{marginTop: 30,alignItems: "center"}]}>
  {/* //Top image  */}
    <View style={{alignItems: 'center'}}>
      <Image source={require('../assets/ngn.jpg')} resizeMode="contain" style={{width: 300, height: 190, borderRadius: 5}}/>
<Text style={{color: 'white',fontSize: 10,fontWeight: 500, }}>Welcome back, Sign In.</Text>
</View>
        <View style={[styles.bg]}>
        {deatail.map((item,key) => <Render control={control} item={item} errors={errors} key={key}/>)}
     
      {/* //Buttons UI */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(data)}>
            <Text style={styles.buttonText}>SIGNUP</Text>
          </TouchableOpacity>

        </View>
        <Text style={{alignSelf: 'flex-start',color: 'white', marginLeft: 40,textDecorationColor: 'green',textDecorationLine:'underline'}}>Forget password?</Text>

        <Text style={styles.create}>OR</Text>
        <TouchableOpacity style={[styles.button,{backgroundColor: 'red',marginLeft: 20  }]} onPress={()=> navigation.navigate('Create Account')} >
  <Text style={[styles.buttonText,]}>Create Account</Text>
</TouchableOpacity> 
</View>   
</KeyboardAwareScrollView>
    
    </>
  );
};

 const styles = StyleSheet.create({
  top: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgb(18,18,40)'
    ,
    alignContent: "center",
  },
  bg: {

    paddingTop: 10,
    paddingLeft: 0,
    paddingBottom: 10,

    alignitems: "center",
    justifyContent: "center",
    position: "relative",
    left: 5,
  },
  Input: {
    backgroundColor: "inherit",
    // borderWidth: 1,
    // borderColor: 'rgb(40,40,40)',
    // borderCurve: 'solid',
    flexDirection: "row",
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10, // Adjust the padding as needed
    paddingHorizontal: 70, // Adjust the padding as needed
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: "bold"
  },
  create:{
    color: 'white',
    fontSize: 14,
    fontWeight: "bold",
    textAlign: 'center'
  }
});
