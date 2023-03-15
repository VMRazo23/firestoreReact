// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBkKU0R7ZVRaPbzmlzxJfY93z4Aj3U7ksA",
    authDomain: "proyecto-react-c231a.firebaseapp.com",
    databaseURL: "https://proyecto-react-c231a-default-rtdb.firebaseio.com",
    projectId: "proyecto-react-c231a",
    storageBucket: "proyecto-react-c231a.appspot.com",
    messagingSenderId: "621073241018",
    appId: "1:621073241018:web:cf98886cc920c75f4c4383",
    measurementId: "G-Y1TRE97BPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const store =  getFirestore(app);

export { store };