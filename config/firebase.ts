// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIX5Hnz2XSvk_p1nm_pFVueBalUuujVbI",
  authDomain: "ascilo-esperanza.firebaseapp.com",
  projectId: "ascilo-esperanza",
  storageBucket: "ascilo-esperanza.appspot.com",
  messagingSenderId: "201103434701",
  appId: "1:201103434701:web:3aaf0f255553633e481a84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default { app, auth };