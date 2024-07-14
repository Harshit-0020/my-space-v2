import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Create firestore database here
const firebaseConfig = {
  apiKey: "AIzaSyCMZS2dsjOONYXNTEWykuhe_c6gS3vRbE4",

  authDomain: "my-space-40ad1.firebaseapp.com",

  projectId: "my-space-40ad1",

  storageBucket: "my-space-40ad1.appspot.com",

  messagingSenderId: "646230291297",

  appId: "1:646230291297:web:ed11ae122b8be8b7578b20",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authInstance = getAuth(app)

export function logoutUser(){
  authInstance.signOut();
  location.reload();
}

// setDoc(doc(db, "blogs", "test"), {
//   title: "test",
//   article: "test",
//   bannerImage: "test",
//   publishedAt: `${new Date().toLocaleString()}`
// });
// console.log("> Blog pushed from inside Firebase.js")

var test = {
  "db": db,
  "config": firebaseConfig,
  "app": app,
  "auth": authInstance
};
export { test };