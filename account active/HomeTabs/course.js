// SettingsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, } from 'react-native';
import { Picker as Pick } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../creatAccount/config/config';
import { gotten } from '../../redux_store/config_slices/profile';


export const Course = () =>  {
  const {phase,userId,courese} = useSelector((state)=> state.userP.profile)
  const {profile} = useSelector((state)=> state.userP)

  const [selectedPhase, setSelectedPhase] = useState(phase);
  const dispatch = useDispatch()
const updatePhase = async()=>{
  // if the same phase dont do anything
if(selectedPhase === phase)return
const collections = collection(db,selectedPhase)
try {
const getDoc = await getDocs(collections)
  const getItem = getDoc.docs.map((item)=> item.data())
  const sorted =getItem.sort((a, b) => a.ids - b.ids)


  // collecting the header of the selected phase

  console.log(sorted)
  dispatch(gotten({...profile,phase:selectedPhase,courese: sorted}))
} catch (error) {
  console.log(error)
}
// updating the user phase in his profile
try {
  const userProfile = collection(db,'userProfiles')
  const getdoc = query(userProfile,where('userId','==',userId))
  const getten = (await (getDocs(getdoc))).docs[0].id
  await updateDoc(doc(db,'userProfiles',getten),{
    phase:selectedPhase

  })
  alert('done')
  
} catch (error) {
  console.error(error)
}

}
useEffect(()=>{

  updatePhase()
},[])
  return (
    <View style={{paddingLeft: 10}}>
      <Text style={styles.textTop}>Select Course Phase:</Text>
      <Pick
        selectedValue={selectedPhase}
        onValueChange={(itemValue) => setSelectedPhase(itemValue)}
        mode={Platform.OS === 'ios' ? 'modal' : 'dropdown'} // Specify mode based on platform
style={styles.text}      >
        <Pick.Item label="Phase 1" value="phase1"  />
        <Pick.Item label="Phase 2" value="phase2" />
        <Pick.Item label="Phase 3" value="phase3" />
      </Pick>

     

      <Button title='Update Course' onPress={updatePhase}/>
    </View> 
  );
};;
const styles = StyleSheet.create({
 text:{
  color: 'white',
  fontWeight: 'bold',
 },
 textTop:{
  fontSize: 17,
  color: 'white'
 }
})

