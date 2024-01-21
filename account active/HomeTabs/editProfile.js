import { useEffect, useState } from "react";
import { Alert, Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import "react-native-get-random-values";
import {v4} from 'uuid'
import * as ImagePicker from "expo-image-picker";

import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { db, storage } from "../../creatAccount/config/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { gotten } from "../../redux_store/config_slices/profile";
export const EditProfilr = () => {
  const dispatch = useDispatch()
const {profile} = useSelector((state)=> state.userP)
const [updating,setUpdating] = useState(false)
const [selectedImage, setSelectedImage] = useState(profile.profilePic);

const [newName,setNewName] = useState(profile.userName)

const schema = yup.object().shape({
  userName: yup.string().min(4).optional()
})
const {control,handleSubmit,formState:{errors}} = useForm({
  resolver: yupResolver(schema)
})


  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access media library was denied.");
      }
    })();
  }, []);

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: false
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error reading an image", error);
    }
  };

  

  // State to track changes to the username

 

  // Function to save changes
  const saveChanges = async(data) => {
    // Assume you have a function to update the user details in your backend or state
    // updateUserDetails({ ...userDetails, userName: editedUserName });
    setUpdating(true)
    let image = null
    try {
      const imageRef = ref(storage,`image/${v4()}`)
const selectedImg = await fetch(selectedImage);
const blob = await selectedImg.blob()
const uploading =  await uploadBytes(imageRef,blob)
const downloadURI = await getDownloadURL(uploading.ref)
image = downloadURI
    } catch (error) {
    console.log(error)  
    }


    try {
      
// updating in Firestore
const collections = collection(db,'userProfiles')
const specified = query(collections,where('userId','==', profile.userId));
// get the doc id
const docId = (await getDocs(specified)).docs[0].id;
const gettenId = doc(db,'userProfiles',docId);
if(data.userName){
  await updateDoc(gettenId,{
    profilePic: image,
    userName: data.userName
  })
 dispatch(gotten({...profile,profilePic: selectedImage,userName: data.userName}))
  } else{
    await updateDoc(gettenId,{
      profilePic: image,
    })
 dispatch(gotten({...profile,profilePic: selectedImage}))

}
Alert.alert('Updated succecfully')
    } catch (error) {
      
    }
setUpdating(false)
    console.log("Changes saved:", data);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(10,17,29)", padding: 10 }}>
      <View
        style={{ alignItems: "center", marginBottom: 20, position: "relative" }}
      >
       <Image
          source={{uri: selectedImage}}
          style={styles.profileIMg}
        />


        <Pressable  style={{
            position: "absolute",
            top: 150,
            left: 210,
            width: 40,
            height: 40,
            backgroundColor: "white",
            borderRadius: 50,
            alignItems: "center",
          }} onPress={openImagePicker}>
       
          <Ionicons name="camera-reverse-sharp" size={34} color="black" />
       </Pressable>
      </View>

      <View>
       
<Controller
control={control}
render={({field})=>(
  <View style={styles.inputField}>
  <Text style={{color: 'red'}}>{errors.userName?.message}</Text>

<TextInput
 onChangeText={field.onChange}
 onBlur={field.onBlur}
 value = {field.value}
style={{color: 'white'}}
placeholder="Update Your UserName"
placeholderTextColor='gray'
defaultValue={newName}
/>
</View>

)}
name="userName"

/>







        <Button title="Update Changes" onPress={handleSubmit(saveChanges)} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  profileIMg: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  inputField: {},
});
