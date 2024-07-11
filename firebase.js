import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
    apiKey: "AIzaSyD8EDAee7LfCed8mbhaJUyNj3sVGJ_D-ck",
    authDomain: "my-space-93113.firebaseapp.com",
    projectId: "my-space-93113",
    storageBucket: "my-space-93113.appspot.com",
    messagingSenderId: "571751105558",
    appId: "1:571751105558:web:0db6374bf691e6414aa137",
    measurementId: "G-5PBY62F5TB"
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
let db = getFirestore(app)