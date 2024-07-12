import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";

import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

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

console.log("> Publishing inside firebase.js...");
setDoc(doc(db, "blogs", 'x86-64'), {
                title: 'test',
                article: 'test',
                bannerImage: 'test',
                publishedAt: `${new Date().toLocaleString()}`
            });

console.log("> Publishing complete!")
console.log(`> DB object before export: ${db}`)


var test = {
    "db": db,
    white: "#fff"
};

export {test, db};