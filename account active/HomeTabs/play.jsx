import { Video, ResizeMode } from "expo-av";
import { useEffect, useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import VideoPlayer from "expo-video-player";
import { Fonts } from "../font";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../creatAccount/config/config";
import { useSelector } from "react-redux";
export const Play = ({ route,navigation }) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const [like, setLike] = useState(false);
  const [book, setBook] = useState(false);
  const { id,title } = route.params;
  const { profile } = useSelector((state) => state.userP);
  const [video, setVideo] = useState(null);
  const [geting, setGetting] = useState(false);
  const getVideo = async () => {
    setGetting(true);
    try {
      const collect = collection(db, profile.phase);
      const collecRef = query(collect, where("id", "==", id));
      const getDoc = await getDocs(collecRef);
      const getten = getDoc.docs[0].data().video;
      setVideo(getten);
    } catch (error) {
      console.log(error);
    }
    setGetting(false);
  };

  useEffect(() => {
    navigation.setOptions({
      title: title // Use the provided title or a default one
    });
    getVideo();
  }, []);
  if (geting) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          <ActivityIndicator size="large" />
        </Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoContainer}>
        {video && (
          <VideoPlayer
            videoProps={{
              shouldPlay: true,
              resizeMode: ResizeMode.CONTAIN,
              source: {
                uri: video,
              },
            }}
            slider={{
              visible: true,
            }}
            timeVisible={true}
            style={{ height: 220 }}
          />
        )}

        <View style={styles.bookmarkContainer}>
          <Text onPress={() => setLike((prev) => !prev)}>
            {like ? (
              <AntDesign name="heart" size={24} color="red" />
            ) : (
              <Feather
                name="heart"
                size={24}
                color="black"
                style={styles.icon}
              />
            )}
          </Text>

          <Text onPress={() => setBook((prev) => !prev)}>
            {book ? (
              <FontAwesome name="bookmark" size={24} color="black" />
            ) : (
              <Feather
                name="bookmark"
                size={24}
                color="black"
                style={styles.icon}
              />
            )}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
  },
  videoPlayer: {
    height: 220,
  },
  bookmarkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "hsl(0, 0%, 100%)",
  },
  icon: {
    marginRight: 16,
  },
});
