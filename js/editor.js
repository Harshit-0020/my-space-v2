import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { test } from "./firebase.js";

const blogTitleField = document.querySelector(".title");
const articleFeild = document.querySelector('.article');

const bannerImage = document.querySelector("#banner-upload");
console.log(bannerImage);
const banner = document.querySelector(".banner");
let bannerPath;

// Select elements by ID using #
const publishBtn = document.querySelector(".publish-btn");
const uploadInput = document.querySelector("#image-upload");


// // Create firestore database here
// const firebaseConfig = {

//     apiKey: "AIzaSyCMZS2dsjOONYXNTEWykuhe_c6gS3vRbE4",

//     authDomain: "my-space-40ad1.firebaseapp.com",

//     projectId: "my-space-40ad1",

//     storageBucket: "my-space-40ad1.appspot.com",

//     messagingSenderId: "646230291297",

//     appId: "1:646230291297:web:ed11ae122b8be8b7578b20"

// };


// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
const db = test.db;
console.log(`> This is the initial db object: ${db.toString()}`)



const uploadImage = (uploadFile, uploadType) => {
    console.log(`Upload Image called and returned ${uploadFile}`)
    const [file] = uploadFile.files; //Gets the first array element from files into variable called file
    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append('image', file);

        // Make a POST http request and
        // Body is the thing client sends to the server : send file (previously stored in formdata) inside the body
        fetch('/upload', {
            method: 'POST',
            body: formdata
        }).then(res => res.json()) //here the then method is calling an anonymous arrow function with res as a parameter here the return statement is also implied automatically : no need for return res.json()
            .then(data => {
                console.log(`Upload type for the image was: ${uploadType}`);
                if (uploadType == "image") {
                    addImage(data, file.name);
                } else {
                    // Handle upload image for banner
                    console.log("> Uploaded banner image on server.");
                    console.log(`> Current location.origin: ${location.origin}`);
                    console.log(`> Json response from the server (image upload location): ${data}`);
                    console.log(`> IMAGE DATA from server: ${data}`);
                    bannerPath = `${location.origin}/${encodeURIComponent(data)}`;
                    console.log(`Banner image URL: ${bannerPath}`);
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                }
            })
    } else {
        alert("upload Image only");
    }
}

// Handle upload image button for blog body
const addImage = (imagepath, alt) => {
    // add image text at current position of cursor inside write blog area.
    let imagepathWithOrigin = `${location.origin}/${imagepath}`;
    let curPos = articleFeild.selectionStart;
    let textToInsert = `\r![${alt}](${imagepathWithOrigin})\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
}

let months = ['Jan', 'Feb', 'Mar', 'Apr', ' May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];






// TESTING HERE //
// Test outputs
// console.log(`> location.origin => ${location.origin}`); // Returns http://127.0.0.1:5500
// setDoc(doc(db, "blogs", "test"), {
//     title:"test",
//     article: "test",
//     bannerImage: "test",
//     publishedAt: `${new Date().toLocaleString()}`,
//     // author: test.auth.currentUser.email.split("@")[0]
// });

// var colorCode = {
//     black: "#000",
//     white: "#fff"
// };

// const db2 = test.db;

// console.log("> Publishing inside test editor.js...");
// setDoc(doc(db2, "blogs", 'x32'), {
//                 title: 'test',
//                 article: 'test',
//                 bannerImage: 'test',
//                 publishedAt: `${new Date().toLocaleString()}`
//             });

// TESTING OVER //


if (bannerImage != null) {


    bannerImage.addEventListener('change', () => {
        console.log(`> Uploading banner image on server...`);
        uploadImage(bannerImage, "banner");
    });



    uploadInput.addEventListener('change', () => {
        uploadImage(uploadInput, "image");
        console.log("Anonymous Functions can have multiple statements in javascript.");
    });


    publishBtn.addEventListener('click', async () => {
        if (articleFeild.value.length && blogTitleField.value.length) {
            // generating id
            let docName;

            let currentURL = location.pathname.split("/");
            console.log(`> MONITOR THIS => ${currentURL}`);
            if (currentURL[1] != "editor.html") {
                //existing blog
                docName = decodeURIComponent(currentURL[1]);
                console.log(docName)
            } else {

                let letters = 'abcdefghijklmnopqrstuvwxyz';
                let blogTitle = blogTitleField.value.split(" ").join("-");
                let id = '';
                for (let i = 0; i < 4; i++) {
                    id += letters[Math.floor(Math.random() * letters.length)];
                }

                // setting up docName
                docName = `${blogTitle}-${id}`;
            }




            // Handle empty banner path
            if (typeof bannerPath == undefined) {
                bannerPath = null
            }

            // console.log("> Look here!");
            //access firstore with db variable;
            try {
                // Add a new document in collection blogs
                console.log(`> Banner path at the time of hitting publish: ${bannerPath}`);
                console.log(`> Publishing time: ${new Date().toLocaleString()}`);
                console.log("> Got here!");
                await setDoc(doc(db, "blogs", docName), {
                    title: blogTitleField.value,
                    article: articleFeild.value,
                    bannerImage: bannerPath,
                    publishedAt: `${new Date().toLocaleString()}`,
                    author: test.auth.currentUser.email.split("@")[0]
                });

                location.href = `/${docName}`;
            }
            catch (e) {
                console.error(`Error occured whlie uploading to firebase: ${e}`)
            }
            console.log("Successfully pushed to firestore.")
        }
    })

};

// Add author name to the blogs
test.auth.onAuthStateChanged((user) => {
    if (!user) {
        location.replace("/admin");
    }
    else {

    }
})

// Re-populate the blog, in-case someone comes here from the edit-blog-btn
let currentPageURL = location.pathname.split("/");

if (currentPageURL[1] != 'editor.html') {
    const blogId = currentPageURL[1];

    const docRef = doc(db, "blogs", blogId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let data = docSnap.data();
        bannerPath = data.bannerImage;
        banner.style.backgroundImage = `url(${bannerPath})`;
        blogTitleField.value = data.title;
        articleFeild.value = data.article;
    }
    else {
        console.log("> Error fetching the blog.")
        location.replace("/");
    }

}

console.log(currentPageURL);
// console.log(location.pathname);

// console.log(`Color code before export: ${colorCode.black};`);
export { db };