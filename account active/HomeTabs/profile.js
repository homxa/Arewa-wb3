import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { logOut } from "../../redux_store/config_slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth, } from "../../creatAccount/config/config";
import {  useEffect, useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { Course } from "./course";


export const Profile = ({navigation})=>{
  const [select,setSelect] = useState(false)
  const dispatch = useDispatch()
const {profile} = useSelector((state)=> state.userP)

  // logOut btn
  const logOUt = async()=>{
    try{
     AsyncStorage.removeItem('user').then((res)=> console.log('removed'))
          // Logout from Firebase
          await signOut(auth);
    dispatch(logOut())
          // Navigate to the login screen
    
      
      
    }catch(err){
      console.log(err)
    }
    }
    
return(
<>
<ScrollView style={{flex: 1}} showsHorizontalScrollIndicator={true}>
      <View style={styles.cover}>
        {/* heading and profile of user */}
        <ImageBackground
          source={require("../../assets/b.jpg")}
          style={styles.firstTop}
        >
          <Image
            source={{uri: profile?.profilePic}}
            style={[styles.headImage]}
            resizeMode="contain"
          />

          <View>
            <Text style={styles.userName}>{profile?.userName}</Text>
          </View>
        </ImageBackground>
        <View
          style={{
            paddingLeft: 5,
            paddingRight: 5,
            maxWidth: 400,
          }}
        >
        <View style={styles.sections}> 
          {/* 1st */}
          <View
            style={styles.first2}
          >
            <View style={styles.iconsbg}>
              <Feather
                name="moon"
                size={28}
                color="white"
                style={{ alignSelf: "center" }}
              />
            </View>
            <Switch
              value={true}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>





          {/* 2sond */}
          <Pressable onPress={()=> navigation.navigate('Edit Profile')}>
          <View style={styles.arrowIcon}>
            <View style={styles.normal}>
              <View
                style={[
                  styles.iconsbg,
                  {
                    backgroundColor: "rgb(255, 71, 76)",
                    width: 45,
                    height: 45,
                    flexDirection: "row",
                  },
                ]}
              >
                <FontAwesome5 name="edit" size={20} color="white" />
              </View>
              <Text style={styles.iconText}>Edit Profile</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={26}
              color="white"
              style={styles.arroSelf}
            />
          </View>
          </Pressable>
          {/* //3 */}
          <View style={{marginBottom: 15,backgroundColor: 'hsl(230, 17%, 14%) '}}>
          <View style={[styles.arrowIcon,{marginBottom: 0}]}>

          <View style={[styles.normal,{flexDirection: "row"}]}>

            <View style={[styles.iconsbg, { backgroundColor: "gray" }]}>
              <FontAwesome name="book" size={20} color="white" />
            </View>
            <Text style={styles.iconText}>Select Course</Text>
          </View><Text   onPress={()=> setSelect((prev)=> !prev)} style={{alignSelf: "center"}}>
      {select ? 
      <AntDesign name="down" size={20} color="white"  style={styles.arroSelf} />:
      
      <MaterialIcons
              name="navigate-next"
              size={26}
              color="white"
              style={styles.arroSelf}
               
              /> 

}</Text></View>
{select && (

<Course/>

)}
        </View>
          {/* //4 */}
          <Pressable onPress={()=> navigation.navigate('Settings')} >

        <View style={styles.arrowIcon}>
            <View style={styles.normal}>
              <View
                style={[
                  styles.iconsbg,
                  {
                    backgroundColor: "red",
                    width: 45,
                    height: 45,
                    flexDirection: "row",
                  },
                ]}
              >
         <Feather name="settings" size={20} color="black" />
              </View>
              <Text style={styles.iconText}>Settings</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={26}
              color="white"
              style={styles.arroSelf}
            />
          </View>
        </Pressable>

          {/* //5 */}
<Pressable onPress={logOUt}>
        <View style={styles.arrowIcon}>

<View style={[styles.normal,{flexDirection: "row"}]}>

  <View style={[styles.iconsbg, { backgroundColor: "rgba(0,0,0,0.67)" }]}>
  <Entypo name="log-out" size={20} color="white" />
  </View>
  <Text style={styles.iconText}>Sign Out</Text>
</View>
<MaterialIcons
    name="navigate-next"
    size={26}
    color="white"
    style={styles.arroSelf}
  />

</View>
</Pressable>
       </View>






       
       </View>
         </View>
                
    </ScrollView>
</>

)


}


const styles = StyleSheet.create({
  cover: {
    backgroundColor: "rgb(10,17,29)",
    flex: 1,
    marginRight: -5
  },
  headImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 5,
  },
  userName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    marginBottom: 7,
    alignSelf: "flex-start",
    marginTop: 5
  },
  editBtn: {
    backgroundColor: "rgb(0,100,0)",
    width: 150,
    paddingTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
    textAlign: "center",
    borderRadius: 10,
  },
  editText: {
    textAlign: "center",
    fontSize: 10,
  },
  first2:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  backgroundColor: "hsl(230, 17%, 14%)",
  padding: 10,
  borderRadius: 20

  },
  firstTop: {
    maxWidth: 500,
    height: 150,
    paddingLeft: 30,
    paddingTop: 15,
    marginBottom: 30,
    borderBottomRightRadius: 10,
  },
  iconsbg: {
    width: 55,
    height: 55,
    backgroundColor: "hsl(228, 28%, 20%))",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 0,
  },
  normal: { flexDirection: "row", marginBottom: 10 },
  iconText: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  arrowIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
            backgroundColor: "hsl(230, 17%, 14%)",
            marginBottom: 15,
            padding: 10,
            borderRadius: 20

  },
  arroSelf: {
    alignSelf: "center",
    paddingRight: 10,
  },
  sections:{backgroundColor:'hsl(228, 28%, 20%)',padding: 3, marginBottom: 10},
  secText:{color: 'white', fontWeight: "bold",fontSize: 10,marginBottom: 5}
});
