// app/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAUvEORjfq41UdUmz-yJnG2HILQuOEFRnE",
  authDomain: "colook-80adb.firebaseapp.com",
  projectId: "colook-80adb",
  storageBucket: "colook-80adb.appspot.com",
  messagingSenderId: "882860334396",
  appId: "1:882860334396:web:bab8c879b35fdd74d71239",
  databaseURL: "https://colook-80adb-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
