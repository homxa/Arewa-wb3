import {  db } from "../creatAccount/config/config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Profile } from "./HomeTabs/profile";
import { EditProfilr } from "./HomeTabs/editProfile";
import { Course } from "./HomeTabs/course";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UpdatePassword } from "./HomeTabs/updatePass";
import { HomeScreen } from "./house/home";
import { useNetwork } from "../creatAccount/config/network";
import { ActivityIndicator, Text } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { getting, gotten } from "../redux_store/config_slices/profile";

export const Home = ({ navigatin }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile,loading } = useSelector((state) => state.userP);

const fectProfile = async () => {
  dispatch(getting())
  try {
    const docRef = collection(db, "userProfiles");
    const specified = query(docRef, where("userId", "==", user.userId));
    const getten = await getDocs(specified);
    const create = getten.docs[0].data();
    console.log(create,'Create')
    const value = {
      userName: create.userName,
      student: create.student,
      uid: create.userId,
      profilePic: create.profilePic,
    };
    
    dispatch(gotten(value));

    

  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
   
    fectProfile();
  
  }, []);


  

  const Tab = createBottomTabNavigator();
 

  const [isConnected] = useNetwork();
  

  if (isConnected) {
return  (
  <>
    <Tab.Navigator
      screenOptions={{
        // tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarActiveTintColor: "blue",
        tabBarBadgeStyle: "dot",
        headerTitleAlign: 'center',
        tabBarStyle:{
         borderTopLeftRadius: 20,
         borderTopRightRadius: 20,
         backgroundColor: 'white'
        },
        headerStyle:{
          borderTopStartRadius: 10,
          borderRadius: 30
        }
        //tabBarActiveTintColor: 'red',
      }}
    >
      <Tab.Screen
        name="Arewa web3"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="cryto news"
        component={UpdatePassword}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather
              name="trending-up"
              size={24}
              color={color}
              style={{ position: "relative" }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notifications" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
          headerTitle: "Profile",
        }}
      />
    </Tab.Navigator>
  </>
)
  } else{
   return <Text>You are Offline</Text>;
  }
};
