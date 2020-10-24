import firebase from "firebase/app"; 
import "firebase/storage";
import "firebase/database";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAuu9SFYDjZp7qrdLlzNw5G-5PdbWxKOZ8",
    authDomain: "meichu-d3544.firebaseapp.com",
    databaseURL: "https://meichu-d3544.firebaseio.com",
    projectId: "meichu-d3544",
    storageBucket: "meichu-d3544.appspot.com",
    messagingSenderId: "72520882450",
    appId: "1:72520882450:web:b5db23fac6657858e8fbcb",
    measurementId: "G-RGEK4BMMJ3"
  };

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

export { database,storage, firebase as default };