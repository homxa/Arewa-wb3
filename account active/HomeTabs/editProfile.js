import { useEffect, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { Ionicons } from "@expo/vector-icons";
export const EditProfilr = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access media library was denied.");
      }
    })();
  }, []);
  console.log(selectedImage)

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: false
      });
      console.log(result)

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error reading an image", error);
    }
  };

  const [userDetails, setUserDetails] = useState({
    userName: "CurrentUserName", // Replace with actual username
    // Other user details...
  });

  // State to track changes to the username
  const [editedUserName, setEditedUserName] = useState(userDetails.userName);

  // Function to handle username change
  const handleUserNameChange = (text) => {
    setEditedUserName(text);
  };

  // Function to save changes
  const saveChanges = () => {
    // Assume you have a function to update the user details in your backend or state
    // updateUserDetails({ ...userDetails, userName: editedUserName });
    console.log("Changes saved:", editedUserName);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(10,17,29)", padding: 10 }}>
      <View
        style={{ alignItems: "center", marginBottom: 20, position: "relative" }}
      >
       <Image
          source={require("../../assets/user.jpg")}
          style={styles.profileIMg}
        />

{selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}

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
        <View style={styles.inputField}>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              paddingLeft: 20,
              color: "white",
            }}
            value={editedUserName}
            onChangeText={handleUserNameChange}
          />
        </View>
        <Button title="Update Changes" onPress={saveChanges} />
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
