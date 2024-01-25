import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../../../creatAccount/config/config"
import { useSelector } from "react-redux"

export const setLikes = async(item,userId)=>{

  const collect = collection(db,'likes')
  try{
    await addDoc(collect,{
      id: item.id,
      userLikedId: userId 
    })
  }catch(err){
    console.log(err)
  }
  
    }


    // deleting Likes

    export const deleteLike = async(item,userId)=>{

      const collect = collection(db,'likes')
      const specified = query(collect,where('userLikedId','==',userId),where('id','==',item.id))
     try {
      const getdocs = (await (getDocs(specified))).docs[0].id
      const remove = doc(db,'likes',getdocs)
      await deleteDoc(remove)
     } catch (error) {
      console.log(error)
     }
    }

    // getting doc
    export const getlike = async(setLike,item)=>{

      const collect = collection(db,'likes')
      const specified = query(collect,where('id','==',item.id))
      onSnapshot(specified,(snap)=>{
       const likers = snap.docs.map((doc)=> ({docId: doc.id,...doc.data()}))
       setLike(likers) 
      
       })
       }