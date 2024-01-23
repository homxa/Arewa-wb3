

import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image,useWindowDimensions, ScrollView, FlatList, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fonts } from '../font';
import { collection, getDocs,orderBy, query, where } from 'firebase/firestore';
import { db } from '../../creatAccount/config/config';
import { gotten } from '../../redux_store/config_slices/profile';
export const HomeScreen = ({ navigation }) => {
  const { profile,loading } = useSelector((state) => state.userP);
const deviceWidth = useWindowDimensions().width
 const dispatch = useDispatch()
const getItem = async()=>{
  if(profile){
    // getting the courses of each phase
    const colletio = collection(db,profile.phase);
    try{
   const collectRef =  query(colletio,orderBy('ids', 'asc'))

      const gettenDoc = await getDocs(collectRef)
      const getData = gettenDoc.docs.map((doc)=> doc.data())
      const sortedData = getData.sort((a, b) => a.ids - b.ids);
      console.log(sortedData)

      // geting header of each course now
      const collect = collection(db,'couseHead')
      const speci = query(collect,where('phase','==',profile.phase))
      const header = (await (getDocs(speci))).docs[0].data()
      dispatch(gotten({...profile,courese:sortedData,header: header}))
    
    }catch(err){
      console.log('falid to get course',err)
    }
   
  }


}

 useEffect(() => {
  getItem();
}, [dispatch, profile?.phase]);
if(loading){
  return <ActivityIndicator/>
 }
  return (
    <ScrollView style={{ flex: 1, padding: 5}}>
    <View style={{ flex: 1,}} >
      <View style={styles.profileTop}>
        <Image source={{ uri: profile?.profilePic }} style={styles.profile} />
        <Text style={styles.hello}>
          Hello,
          <Text style={[styles.userName, { fontFamily: 'NotoSansJP' }]}>
            {profile?.userName}
          </Text>
          <Text style={{ fontSize: 17 }}>&#x1F44B;</Text>
        </Text>
      </View>
      {/* catigories */}
      <View style={{marginTop: 20,marginBottom: 30}}>
  <View style={{flexDirection: 'row',marginBottom: 10}}>
  <Text style={{fontSize: 15}}>Current:</Text> 
  <Text style={{fontSize: 15,fontWeight: 'bold', alignSelf: 'center',letterSpacing: 2}}>{profile.phase}</Text>
    </View>      
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
    <View style={[styles.quiz,{width: deviceWidth * 0.3,backgroundColor:'#FAD02E',elevation: 5}]}>
<Feather name="book-open" size={30} color="black" />
<Text style={{fontSize: 14,fontWeight: 'bold'}}>Take a Qiuz</Text>
<Text style={{fontSize: 13,fontFamily:  Fonts.italic }}>on what you have learned</Text>
<Feather name="arrow-right" size={20} color="#000000" style={{ marginTop: 3 }} />

</View>


{/* 2 */}
<View style={[styles.quiz,{width: deviceWidth * 0.3,backgroundColor:'#4CAF50',elevation: 5}]}>
<Ionicons name="bookmarks-sharp" size={30} color="white" />
<Text style={{fontSize: 14,fontWeight: 'bold'}}>Book Marks</Text>
<Text style={{fontSize: 12,fontFamily:  Fonts.italic }}>read leatters</Text>
<Feather name="arrow-right" size={20} color="#000000" style={{ marginTop: 5 }} />

</View>

{/* 3 */}

<View style={[styles.quiz,{width: deviceWidth * 0.3,backgroundColor:'#3498DB',elevation: 5 }]}>
<Feather name="trending-up" size={30} color="white" />
<Text style={[{fontSize: 14,fontWeight: 'bold'},]}>Tending</Text>
<Text style={[,{fontSize: 12,fontFamily:  Fonts.italic }]}>market updates</Text>
<Feather name="arrow-right" size={20} color="#000000" style={{ marginTop: 5 }} />

</View>

</View>
      </View>


      {/* enrollled lessong */}

      <View>
<Text style={{fontSize: 15,fontWeight: 'bold',fontFamily:Fonts.italic}}>{profile?.header?.header}</Text>

{ 
profile?.courese &&(
profile?.courese.map((item,key)=>{
  return(
    <Pressable onPress={()=> (navigation.navigate('Play',{id: item.id,title: item.under})
    ) } key={key}>
    <View style={styles.lessons}>
  <View style={{flexDirection: 'row',}}>
  
  <Image source={{uri: item.image}} style={styles.limages} resizeMode='cover'/>
<View style={{justifyContent: 'center',paddingLeft: 10}}>
<Text style={[styles.lhead,{fontFamily:'sans-serif'}]}>{item.title}</Text>
<Text style={{fontSize: 10}}>{item.under}</Text>
<View style={{flexDirection: 'row'}}>
<Ionicons name="time-outline" size={18} color="black" /><Text style={{fontSize: 12, fontWeight: 'bold'}}>{item.time}</Text></View>

</View>
</View>
<FontAwesome name="play-circle" size={30} color="red" style={{alignSelf: 'center'}}/>
</View></Pressable>
  )
})

)}




      </View>

    </View></ScrollView>
  );
};

const styles = StyleSheet.create({
quiz:{
backgroundColor: 'hsl(0, 0%, 100%)',
height: 140,
paddingTop: 5,
alignItems: 'center',
justifyContent: 'center',
marginLeft: 5,
borderRadius: 10
},
textColor:{
  color: 'white'
},
  profileTop: {
    flexDirection: 'row',
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  hello: {
    fontSize: 13,
    alignSelf: 'center',
    marginLeft: 5
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  limages:{
    width: 90,
    height: 100,
    borderRadius: 10
  },
  lessons:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: 'hsl(0, 0%, 100%)',
    marginBottom: 10,
    elevation: 5

  
  },

  textSize:{
fontSize: 10,
fontWeight: 'bold'
  },
  lhead:{alignSelf: 'center', marginLeft: 5, fontSize: 13,fontWeight: 'bold', width: 200},
 

});
