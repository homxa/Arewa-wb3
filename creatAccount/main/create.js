
import { useState } from "react";
import { Render } from "../rigist and Login UI/signupUI";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
 
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { deatail2 } from "./logindeatils";

import { auth } from "../config/config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNetwork } from "../config/network";
import { EmailMOdel } from "../rigist and Login UI/model";
import { useSignUP } from "./schemas/Sschema";



export const Create = ({navigation}) => {
  // model for alaring user to chech eamik state
  const [model, setModel] = useState(false);
  const [error,setError] = useState('');
  const [creating,setCreating] = useState(false)
  const [connected] = useNetwork()
  // input validating
 const [control,handleSubmit,errors] =  useSignUP()

  // recieved data
  const data = async (dd) => {
   if(connected){
    try {
      setCreating(true)
      const current = await createUserWithEmailAndPassword(
        auth,
        dd.email,
        dd.password
      );
      await sendEmailVerification(current.user);
      setModel((prev) => !prev);
      console.log("Created");
      setCreating(false)
    } catch (err) {
      console.log(err);
      setCreating(false)
      setError(true)
    }
   }
  };

  return (
    <>
  // model for alaring user to chech eamil

    <EmailMOdel model={model} navigation={navigation} setModel={setModel}/>

    // form input field
      <KeyboardAwareScrollView style={[{ flex: 1,backgroundColor: 'rgb(18,18,40)',
 }] }>
        <View style={[styles.top, { alignItems: "center",marginTop: 50 }]}>
          <View>
            <Image
              source={require("../../assets/ngn.jpg")}
              resizeMode="contain"
              style={{ width: 300, height: 190, borderRadius: 5 }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: 900,
                textAlign: "center",
              }}
            >
              SIGNUP NOW!
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 10,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              We are happy to have you with us.
            </Text>
           {error && <Text   style={{
                color: "red",
                fontSize: 12,
                fontWeight: 500,
                textAlign: "center",
              }}>Email Aready Used</Text>}
          </View>
          <View style={[styles.bg]}>
            {deatail2.map((item, key) => (
              <Render control={control} item={item} errors={errors} key={key} styles={styles}/>
            ))}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(data)}
              disabled={creating}
            >
            {creating? <ActivityIndicator size='small'/>:  <Text style={styles.buttonText}>SIGNUP</Text>
           }
 </TouchableOpacity>
          
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export const styles = StyleSheet.create({
  // top: {
  //   flex: 1,
  //   justifyContent: "center",
  //   backgroundColor: "white",
  //   alignItems: "center",
  // },
  bg: {
    paddingRight: 5,
    paddingTop: 10,
    paddingLeft: 0,
    paddingBottom: 10,

    alignitems: "center",
    justifyContent: "center",
  },
  input: {
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

  top: {
    flex: 1,
    backgroundColor: "rgb(18,18,40)",
  },

  button: {
    backgroundColor: "white",
    paddingVertical: 10, // Adjust the padding as needed
    paddingHorizontal: 90, // Adjust the padding as needed
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});
