// import 'firebaseui/dist/firebaseui.css'
import { test } from "./firebase.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import * as firebaseui from 'firebaseui';

// const app = test.app;
// const auth = getAuth(app)

// FirebaseUI config.
let uiConfig = {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // Other config options...
    callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectURL) => {     // Runs after successful login
            console.log(authResult);
            return false; // we don't want to redirect user anywhere

        }

    },
    signInFlow: "popup",

};

// const ui = firebaseui.auth.AuthUI(auth);

// console.log(firebaseui.auth.AuthUI(auth))
// The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig);


const db = test.db;
const authApp = test.auth;
// console.log(authApp)
const blogSection = document.querySelector(".blogs-section");
const login = document.querySelector(".login");

const setupLoginButton = () => {

    const ui = new firebaseui.auth.AuthUI(authApp);
    ui.start('#firebaseui-auth-container', uiConfig);
}



const authenticate = callback => {
    authApp.onAuthStateChanged((user) => {      // Check if user is logged in or not
        if (user) {
            // console.log(1);
            // console.log(user.email);
            login.style.display = "none";       // if user logged in, hide login element
            callback();
        }
        else {
            setupLoginButton();
        }

    });
};

const second = async () => {
    const blogsRef = collection(db, "blogs");

    // console.log(2);
    // Create a query against the collection
    // console.log(authApp.currentUser.email)
    const q = query(blogsRef, where("author", "==", `${authApp.currentUser.email.split('@')[0]}`));
    let blogCounter = 0;
    await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((blog) => {
            blogCounter += 1;
            // doc.data is never undefined for query doc snapshots
            import("./functions.js").then((module) => {
                module.createBlog(blog);
            })

        });
        console.log(`Total Blogs: ${blogCounter}`);
    })
        .catch((error) => {
            console.log("> Error fetching the blogs.");
            console.log(error);
        });

}

authenticate(second);

// authenticate(getUserWrittenBlogs);
// setTimeout(() => first(second), 0)
// getUserWrittenBlogs();
