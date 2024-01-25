import "react-native-get-random-values";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../../creatAccount/config/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Video } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { withRepeat } from "react-native-reanimated";
import { gotten } from "../../redux_store/config_slices/profile";

export const Test = () => {
  const { profile } = useSelector((state) => state.userP);

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTittle] = useState("");
  const dispatch = useDispatch()
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
        allowsMultipleSelection: false,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error reading an image", error);
    }
  };
  // video

  const pickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Videos",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Handle the selected video URI here
        setVideo(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking video", error);
    }
  };

  
  const upload = async () => {
    const collec = collection(db,"userProfiles");
    try {
      const queryRef = query(collec,where("userId", "==", profile.userId));

      const getDocss = await getDocs(queryRef);
      const gottent = doc(db, "userProfiles", getDocss.docs[0].id);
      let newName = 'suleiman'
    await updateDoc(gottent,{
      userName: newName
     })
    
     dispatch(gotten({...profile, userName:newName }))
     const  nowUpdate = getDocss.docs[0].data()
    } catch (err) {
      console.log(err);
    }
  };
  console.log(profile)

  return (
    <>
      <TextInput
        placeholder="enter the tille"
        style={{ width: 200, height: 100 }}
        onChangeText={setTittle}
      />

      <Video
        source={{ uri: video }}
        shouldPlay={true}
        isLooping={true}
        resizeMode="cover"
        style={{ width: 100, height: 100 }}
      />

      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      <Button title="upload image" onPress={openImagePicker} />
      <Button title="upload Video" onPress={pickVideo} />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="upload" onPress={upload} />
      )}
    </>
  );
};
