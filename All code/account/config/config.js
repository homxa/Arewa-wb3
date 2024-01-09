import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBN_kwy2waSy6wDz-Xzo_IqQemnlRk2Edc",
  authDomain: "ngn-app.firebaseapp.com",
  projectId: "ngn-app",
  storageBucket: "ngn-app.appspot.com",
  messagingSenderId: "132684450676",
  appId: "1:132684450676:web:0397b3357b46acecc13a21",
  measurementId: "G-Y42S676YGG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);