import { View,Text,Button,Modal,TouchableOpacity,Image } from "react-native"

export const EmailMOdel = ({model,setModel,navigation})=>{
return(
  <Modal
        visible={model}
        animationType="slide"
        style={{ flex: 1, maxHeight: 100 }}
        onRequestClose={() =>{setModel((prev) => !prev)
          navigation.navigate('Login')}}
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
            navigation.navigate('Login')}}
            
          >
            <Text style={{ color: "black" }}>Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>


)
}