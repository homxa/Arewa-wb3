import { Image, View,Text } from "react-native"
import { styles } from "./styles"
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { caluclatime } from "./timeCal";
import { deleteLike, getlike, setLikes } from "./likes";
import { useSelector } from "react-redux";
export const OnlyText = ({item})=>{
  const [like,setLike] = useState(null)
  const [book,setBook] = useState(false)
  const [postTime, setPostTime] = useState()
const {userId} = useSelector((state)=> state.userP.profile)

  useEffect(() => {
    // Update the relative time every minute 
    
  caluclatime(item,setPostTime)
    const intervalId = setInterval(() => {
     caluclatime(item,setPostTime)
    }, 60000); // Update every minute
caluclatime(item,setPostTime)
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [item.time]);

  // getting Likes
  useEffect(()=>{
    getlike(setLike,item)
   console.log( like,'likes')
    
    },[])
    const isLiked =  like?.find((user)=> user.userLikedId === userId)
    
  return(
    <View style={styles.allHead}>
    <View style={{ flexDirection: "row" }}>
      <Image
        source={require("../../../assets/de1.jpg")}
        style={{ width: 50, height: 50, borderRadius: 200 }}
        resizeMode="cover"
      />
      <View
        style={{
          marginLeft: 5,
          marginBottom: 10,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>savage</Text><Text>{postTime}</Text>
        <Text style={{ fontSize: 10, color: "red", opacity: 0.7 }}>
          Modrator
        </Text>
      </View>
    </View>

    <Text style={styles.textSize}>
    {item?.text}
    </Text>

    <View style={styles.top}>
      <Text onPress={() =>isLiked?deleteLike(item,userId) :setLikes(item,userId)}>
        {isLiked ? (
        <AntDesign name="heart" size={20} color="red" /> 
        ) : (
          <Feather
            name="heart"
            size={20}
            color="black"
           // style={styles.icon}
          />
        )} {like && (like?.length!== 0 ?like?.length: '')}
      </Text>

      <Text >
        {book ? (
          <FontAwesome name="bookmark" size={20} color="black" />
        ) : (
          <Feather
            name="bookmark"
            size={20}
            color="black"
           // style={styles.icon}
          />
        )}
      </Text>
    </View>
  </View>
  )
}