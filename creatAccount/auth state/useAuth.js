import { useEffect, useState } from "react"
import { auth } from "../config/config"
import { useAuthState } from "react-firebase-hooks/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"


export const useAuth = ()=>{

  const [users] = useAuthState(auth)
  const [user,setUser] = useState(null)
const [manual,setManual] = useState(0)


if(users && users.emailVerified){
  AsyncStorage.setItem('User',JSON.stringify(user)).then((data)=> console.log('successful')).catch((err)=>console.log(err))


}


useEffect(()=>{
AsyncStorage.getItem('User').then((res)=>{
  const parse = JSON.parse(res)

  if(users){
    setUser(users)

      }
      else if(parse){
        setUser(parse)

      }
      else{
        setUser(null)
      }
}).catch((err)=>{
  console.log(err)
})



},[,users,manual])
const run = ()=>setManual((prev)=>prev + 1)
return [user,setUser,run]
}