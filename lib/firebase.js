import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const config = {
    apiKey: "AIzaSyAttqm-ABiULU-G2JtUScBhJnQgT9s2Hxw",
    authDomain: "fir-app-64223.firebaseapp.com",
    projectId: "fir-app-64223",
    storageBucket: "fir-app-64223.appspot.com",
    messagingSenderId: "191511527077",
    appId: "1:191511527077:web:29663c15bcf6e3edead74c"
}

firebase.initializeApp(config);
export default firebase;