

import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image,useWindowDimensions, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
<FontAwesome name="play-circle" size={24} color="black" />
export const HomeScreen = ({ navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { profile,loading } = useSelector((state) => state.userP);
const deviceWidth = useWindowDimensions().width
 

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    async function prepare() {
      try {
        // Load custom font
       const font = await Font.loadAsync({
          'NotoSansJP': require('../../assets/font/NotoSansJP-VariableFont_wght.ttf'),
        });
console.log(font)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (loading) {
    return <Text>Loading.....</Text>;
  }

  return (
    <ScrollView style={{ flex: 1, padding: 5}}>
    <View style={{ flex: 1,}} onLayout={onLayoutRootView}>
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
<Text style={{fontSize: 18, marginBottom: 5}}>Check Out</Text>
<View style={{flexDirection: 'row'}}>
<View style={[styles.quiz,{width: deviceWidth * 0.3,backgroundColor:'#FAD02E'}]}>
<Feather name="book-open" size={45} color="black" />
<Text style={{fontSize: 15,fontWeight: 'bold'}}>Take a Qiuz</Text>
<Text style={{fontSize: 12}}>on what you have learned</Text>
<Feather name="arrow-right" size={20} color="#000000" style={{ marginTop: 5 }} />

</View>


{/* 2 */}
<View style={[styles.quiz,{width: deviceWidth * 0.3,backgroundColor:'#4CAF50'}]}>
<Ionicons name="bookmarks-sharp" size={45} color="white" />
<Text style={{fontSize: 15,fontWeight: 'bold'}}>Book Marks</Text>
<Text style={{fontSize: 12}}>read leatters</Text>
<Feather name="arrow-right" size={20} color="#000000" style={{ marginTop: 5 }} />

</View>

{/* 3 */}

<View style={[styles.quiz,{width: deviceWidth * 0.3,backgroundColor:'#3498DB' }]}>
<Feather name="trending-up" size={45} color="white" />
<Text style={[{fontSize: 15,fontWeight: 'bold'},]}>Tending</Text>
<Text style={[,{fontSize: 12}]}>market updates</Text>
<Feather name="arrow-right" size={20} color="#000000" style={{ marginTop: 5 }} />

</View>

</View>
      </View>


      {/* enrollled lessong */}

      <View>
<Text style={{fontSize: 17,fontWeight: 'bold'}}>Enrolled  Lessons from Phase 1</Text>
<View style={styles.lessons}>
  <View style={{flexDirection: 'row',}}>
  
  <Image source={require('../../assets/phaseOne/what2.jpeg')} style={styles.limages} resizeMode='contain'/>

<Text style={styles.lhead}>What is CrytoCurrency</Text>



</View>
<FontAwesome name="play-circle" size={30} color="red" style={{alignSelf: 'center'}}/>
</View>


<View style={styles.lessons}>
  <View style={{flexDirection: 'row',}}>
  
  <Image source={require('../../assets/phaseOne/images.jpeg')} style={styles.limages} resizeMode='contain'/>

<Text style={styles.lhead}>What is Blochain Technology</Text>



</View>
<FontAwesome name="play-circle" size={30} color="red" style={{alignSelf: 'center'}}/>
</View>
<View style={styles.lessons}>
  <View style={{flexDirection: 'row',}}>
  
  <Image source={require('../../assets/phaseOne/dif.png')} style={styles.limages} resizeMode='contain'/>

<Text style={styles.lhead}>Difference Between Centeralizes and decentralized Finance</Text>



</View>
<FontAwesome name="play-circle" size={30} color="red" style={{alignSelf: 'center'}}/>
</View>
<View style={styles.lessons}>
  <View style={{flexDirection: 'row',}}>
  
  <Image source={require('../../assets/phaseOne/cexdex.jpeg')} style={styles.limages} resizeMode='contain'/>

<Text style={styles.lhead}>Cex and Dex Terminology</Text>



</View>
<FontAwesome name="play-circle" size={30} color="red" style={{alignSelf: 'center'}}/>
</View>
<View style={styles.lessons}>
  <View style={{flexDirection: 'row',}}>
  
  <Image source={require('../../assets/phaseOne/smart.jpeg')} style={styles.limages} resizeMode='contain'/>

<Text style={styles.lhead}>Exploring Smart Contract and Their Application in Defi Projects </Text>



</View>
<FontAwesome name="play-circle" size={30} color="red" style={{alignSelf: 'center'}}/>
</View>
<View style={styles.lessons}>
  <View style={{flexDirection: 'row',}}>
  
  <Image source={require('../../assets/phaseOne/stablecoins.jpeg')} style={styles.limages} resizeMode='contain'/>

<Text style={styles.lhead}>Understanding Stable Coins and their Uses</Text>



</View>
<FontAwesome name="play-circle" size={30} color="red" style={{alignSelf: 'center'}}/>
</View>


<View style={styles.lessons}>
  <View style={{flexDirection: 'row',}}>
  
  <Image source={require('../../assets/phaseOne/flash.jpg')} style={styles.limages} resizeMode='contain'/>

<Text style={styles.lhead}>what is Flash Loans</Text>



</View>
<FontAwesome name="play-circle" size={30} color="red" style={{alignSelf: 'center'}}/>
</View>


<View style={styles.lessons}>
  <View style={{flexDirection: 'row',}}>
  
  <Image source={require('../../assets/phaseOne/liquidity.jpg')} style={styles.limages} resizeMode='contain'/>

<Text style={styles.lhead}>what is Liquidity or Liquidity Poool</Text>



</View>
<FontAwesome name="play-circle" size={30} color="red" style={{alignSelf: 'center'}}/>
</View>
      </View>

    </View></ScrollView>
  );
};

const styles = StyleSheet.create({
quiz:{
backgroundColor: 'hsl(0, 0%, 100%)',
height: 140,
alignItems: 'center',
padding: 5,
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
    height: 90,
    borderRadius: 10
  },
  lessons:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: ' hsl(0, 0%, 100%)',
    marginBottom: 10
  
  },

  textSize:{
fontSize: 10,
fontWeight: 'bold'
  },
  lhead:{alignSelf: 'center', marginLeft: 5, fontSize: 13,fontWeight: 'bold', width: 200},
 

});
