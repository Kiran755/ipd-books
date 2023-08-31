// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjumHd7mEo6nECqINWRhGfcb_JBZ64kOY",
    authDomain: "flutter-project-notes-app-1212.firebaseapp.com",
    databaseURL: "https://flutter-project-notes-app-1212-default-rtdb.firebaseio.com",
    projectId: "flutter-project-notes-app-1212",
    storageBucket: "flutter-project-notes-app-1212.appspot.com",
    messagingSenderId: "757571063370",
    appId: "1:757571063370:web:9f07a88f5eba5a416a20b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db


