// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth as second, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyBN_kwy2waSy6wDz-Xzo_IqQemnlRk2Edc",
  authDomain: "ngn-app.firebaseapp.com",
  projectId: "ngn-app",
  storageBucket: "ngn-app.appspot.com",
  messagingSenderId: "132684450676",
  appId: "1:132684450676:web:0397b3357b46acecc13a21",
  measurementId: "G-Y42S676YGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = second(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)