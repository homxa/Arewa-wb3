import "react-native-get-random-values";

import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Video } from "expo-av";
import { v4} from "uuid";
import { getDownloadURL, ref, uploadBytes, } from "firebase/storage";
import { db, storage } from "../../creatAccount/config/config";
import { addDoc, collection,serverTimestamp } from "firebase/firestore";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

export const Created = () => {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
const {profile,loading} = useSelector((state)=> state.userP)
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
const [publish, setPublishing] = useState(false)
// to handle the text input
  const schema = yup.object().shape({
    text: yup.string().required("Enter text "),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
// asking for permition to access user storage before been able to get the fils
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access media library was denied.");
      }
    })();
  }, []);
// for selecting and getting image row files
  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
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
// for selecting and getting videos row files

  const pickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Videos",
        allowsEditing: true,
        aspect: [4, 5],
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
  const posting = async (dd) => {
    // getting th current time when post is created
  
    if (!image && !video && !dd.text) return;
    // boxs
    let img, vid = null;
// checking for what the user enter to perform specific acction

    if (image && video && dd.text) {
      // getting the downoad image url and send it to img  same with the rest with the rest condotions
      try {
        setPublishing(true)
        const enterdImage = await fetch(image);
        const enterImgBlob = await enterdImage.blob();
        const imageref = ref(storage, `image/${v4()}`);
        const addImg = await uploadBytes(imageref, enterImgBlob);
        const downloadImg = await getDownloadURL(addImg.ref);
        img = downloadImg;
      } catch (err) {
        console.error(err);
      }
      // getting the downoad video url and send it to vid  same with the rest condotions

      try {
        const enterdVideo = await fetch(video);
        const enterVidBlob = await enterdVideo.blob();
        const videoref = ref(storage, `Videos/${v4()}.mp4`);
        const addVid = await uploadBytes(videoref, enterVidBlob );
        const downloadvid = await getDownloadURL(addVid.ref);
        vid = downloadvid;
      } catch (err) {
        console.error(err);
      }
      try {
        const addPostRef = collection(db, "posts");
        await addDoc(addPostRef, {
          id: v4(),
          image: img,
          video: vid,
          text: dd.text,
          time: serverTimestamp(),
          userId: profile.userId
        });
      } catch (error) {
        console.log(error);
      }
      alert("done");
      setPublishing(false)
      return;
    }
      if (image && !video && dd.text) {
        setPublishing(true)
      try {

        const enterdImage = await fetch(image);
        const enterImgBlob = await enterdImage.blob();

        const imageref = ref(storage, `image/${v4()}`);
        const addImg = await uploadBytes(imageref,  enterImgBlob);

        const downloadImg = await getDownloadURL(addImg.ref);
        console.log(addImg.ref)

         img = downloadImg;
      } catch (err) {
        console.error(err);
      }

      try {
        const addPostRef = collection(db, "posts");
        await addDoc(addPostRef, {
          id:v4(),
          image: img,
          text: dd.text,
          time: serverTimestamp(),
          video: null,
          userId: profile.userId
        });
      alert("done");
      } catch (error) {
        console.log(error);
      }
      setPublishing(false)
      return
    }
     else if (!image && video && dd.text) {
    setPublishing(true)

      try {
        const enterdVideo = await fetch(video);
        const enterVidBlob = await enterdVideo.blob();
        const videoref = ref(storage, `Videos/${v4()}.mp4`);
        const addVid = await uploadBytes(videoref,  enterVidBlob);
        const downloadvid = await getDownloadURL(addVid.ref);
        vid = downloadvid;
      } catch (err) {
        console.error(err);
      }
      try {
        const addPostRef = collection(db, "posts");
        await addDoc(addPostRef, {
          id: v4(),
          video: vid,
          text: dd.text,
          time: serverTimestamp(),
          image: null,
          userId: profile.userId
        });
      } catch (error) {
        console.log(error);
      }
      alert("done");
      setPublishing(false)
      return;
    }
    else if (!image && !video && dd.text) {
     
      try {
        const addPostRef = collection(db, "posts");
        await addDoc(addPostRef, {
          id: v4(),
          text: dd.text,
          time: serverTimestamp(),
          image: null,
          video: null,
          userId: profile.userId
        });
      } catch (error) {
        console.log(error);
      }
      alert("done");
      return;
    }
   // let upload both image and video tostorage
  };

  return (
    <KeyboardAwareScrollView
      keyboardVerticalOffset={100}
      style={{ flex: 1, marginTop: 20 }}
    >
      <Controller
        control={control}
        render={({ field }) => (
          <>
            <Text>{errors.text?.message}</Text>
            <View
              style={{
                backgroundColor: "hsl(0, 0%, 100%)",
                height: 300,
                position: "relative",
                borderRadius: 30,
                padding: 10,
                marginBottom: 10,
              }}
            >
              <TextInput
                placeholderTextColor="black"
                placeholder="write here"
                style={{
                  height: 300,
                  width: "100%",
                  padding: 10,
                  fontSize: 15,
                }}
                multiline={true} // Set to true for multiline input
                textAlignVertical="top"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
              <View style={{ flexDirection: "row" }}>
                <Feather
                  name="link-2"
                  size={30}
                  color="black"
                  style={{
                    transform: [{ rotate: "90deg" }],
                    position: "absolute",
                    bottom: 20,
                    left: 55,
                    opacity: 0.6,
                  }}
                  onPress={pickVideo}
                />

                <Entypo
                  name="image"
                  size={30}
                  color="black"
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 10,
                    opacity: 0.6,
                  }}
                  onPress={openImagePicker}
                />
              </View>
            </View>
          </>
        )}
        name="text"
      />
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          paddingLeft: 20,
          width: width * 0.5,
        }}
      >
        {video && (
          <Video
            source={{ uri: video }}
            isLooping={true}
            resizeMode="cover"
            style={{ width: 100, height: 100, marginRight: 10 }}
          />
        )}
        {image && (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        )}
      </View>
      <TouchableOpacity
        style={{
          width: 100,
          backgroundColor: "blue",
          paddingTop: 10,
          paddingLeft: 15,
          paddingBottom: 10,
          paddingRight: 15,
          borderRadius: 5,
          elevation: 5,
          alignSelf: "flex-end",
          position: "relative",
          right: 10,
        }}
        onPress={handleSubmit(posting)}
        disabled={publish}
      >
     {publish? <ActivityIndicator/>   :<Text style={{ fontWeight: "bold", color: "white" }} 
>Punlish</Text>}
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};