import * as NetWork from 'expo-network'
import { useEffect, useState } from 'react'

export const useNetwork = ()=>{
 const [isConnected,setIsConnected] = useState()
 const state = async()=>{
  try{
  const gett =  await NetWork.getNetworkStateAsync()
  const availabe = 
  setIsConnected(gett.isInternetReachable)
  }catch(err){
    console.log(err)
  }

 } 
 useEffect(()=>{
  state()
 },[])
 return [isConnected]
}