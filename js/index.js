import {getDocs, collection} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { test } from "./firebase.js";


const db = test.db;
const querySnapshot = await getDocs(collection(db, "blogs"));
const blogSection = document.querySelector(".blogs-section");



// Iterate over all blogs in the collection and create cards for them
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  if (doc.id != decodeURI(location.pathname.split("/").pop())){
    import("./functions.js").then((module) => {
      module.createBlog(doc);
    })
  }
});

