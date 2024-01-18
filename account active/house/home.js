

import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import * as Font from 'expo-font';
import { useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';

export const HomeScreen = ({ navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { profile,loading } = useSelector((state) => state.userP);

 

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
    <View style={{ flex: 1, padding: 10 ,paddingTop: 40}} onLayout={onLayoutRootView}>
      <View style={styles.profileTop}>
        <Image source={{ uri: profile?.profilePic }} style={styles.profile} />
        <Text style={styles.hello}>
          Hello,
          <Text style={[styles.userName, { fontFamily: 'NotoSansJP' }]}>
            {profile?.userName}
          </Text>
          <Text style={{ fontSize: 20 }}>&#x1F44B;</Text>
        </Text>
      </View>
      <Text style={ { fontFamily: 'NotoSansJP' }}>rrrrff</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileTop: {
    flexDirection: 'row',
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  hello: {
    fontSize: 15,
    alignSelf: 'center',
  },
  userName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
