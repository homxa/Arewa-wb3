import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
interface Storevalue{
  item: any;
  key: string;

}

export async function setItem({key,item}: Storevalue){
 try{
  await AsyncStorage.setItem(key,JSON.stringify(item))
 }catch(err){
  console.log(err)
 }

}
interface Getvalue{
  key: string;
}
// getting item array
export const useGet = (params:Getvalue)=>{
  const [value,setValue] = useState<any>()
const getItem = async()=>{
  try{
    const get = await AsyncStorage.getItem(params.key)
setValue(JSON.parse(get))
  }catch(err){
    console.log(err)
  }
  
}
useEffect(()=>{
getItem()

},[value,params.key])
return {value}
}

// removing item
export async function removeUser(params:Getvalue) {
  try{
    await AsyncStorage.removeItem(params.key)
  }catch(err){
    console.log(err)
  }
}
