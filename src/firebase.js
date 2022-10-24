// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAhJzxkE6HxpMot4KKPhYIkohTOI3DBdFA",
    authDomain: "clone-816a9.firebaseapp.com",
    projectId: "clone-816a9",
    storageBucket: "clone-816a9.appspot.com",
    messagingSenderId: "363025513893",
    appId: "1:363025513893:web:9b9045040e1808c4d4fc4c",
    measurementId: "G-WMK7VJ3W70"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth}