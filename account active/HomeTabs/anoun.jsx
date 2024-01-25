import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../font";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEvent } from "react-native-reanimated";
import VideoPlayer from "expo-video-player";
import { ResizeMode } from "expo-av";
import Swiper from 'react-native-swiper';
import { collection, getDocs,onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../creatAccount/config/config";
import { AllGet,} from "./updatTabs/onlytext";
import { styles } from "./updatTabs/styles";
import { VideoandText } from "./updatTabs/vidandText";
import { ImageandText } from "./updatTabs/imageAndText";
import { OnlyText } from "./updatTabs/Text";
const ReadMoreText = ({ text }) => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const handleReadMore = () => {
    navigation.navigate('FullPostScreen', { fullText: text });
  };

  return (
    <View>
      <Text>{expanded ? text : text.slice(0, 10)}</Text>
      {text.length > 10 && (
        <TouchableOpacity onPress={handleReadMore}>
          <Text style={{ color: 'blue' }}>Read More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Usage example
const Post = () => {

 
  const [post,setPost] = useState()
 const [get,setGetting] = useState(false) 
 
  const [fullScreen,setShowFullContent] = useState(false)
//console.log(formated)
const fetchPost = async()=>{


}

useEffect(()=>{
  setGetting(true)

  const collect = collection(db,'posts')
  const collectTime = query(collect,orderBy('time','desc'))
 const unsubscribe = onSnapshot(collectTime,(snap)=>{
    const post = snap.docs.map((news)=> ({docId: news.id,...news.data()}))
    setPost(post)
    setGetting(false)
  })
  return ()=> (unsubscribe())
},[]) 


const render =(content)=>{
 if(content.length > 20 && !fullScreen){
  return(
    <View>
<Text>{content.slice(0,170)}</Text>
    </View>
  )
 }
else{
  return(
    <Text>{content}</Text>
  )
}
}

if(get){
  return <ActivityIndicator/>
}

  return (
    // <ScrollView >
    <View style={{ flex: 1, padding: 5,backgroundColor: 'hsl(227, 47%, 96%)' }}>
    { post? (<FlatList
      data={post}
      renderItem={({item})=>{
console.log(item)
if((item.image && item.video) && item.text){
return(
  <AllGet item={item}/>
)
  
 
}
 else if ((item.image && !item.video) && item.text){
 return(<ImageandText item={item}/>)
}

else if ((item.video && !item.image) && item.text){
 return(
  <VideoandText item={item}/>
 )
}
else if((!item.image && !item.video) && item.text){
 return(
  <OnlyText item={item}/>
 )
}

      }}
      
      />): ''}
     
     </View>  
     



     





     
    // </ScrollView>
  );
};


export default Post;
