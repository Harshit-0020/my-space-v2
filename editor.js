const blogTitleField = document.querySelector(".title");
const articleFeild = document.querySelector('.article');

//banner
const bannerImage = document.querySelector("#banner-upload");
const banner = document.querySelector(".banner");
let bannerPath;

// Select elements by ID using #
const publishBtn = document.querySelector(".publish-btn");
const uploadInput = document.querySelector("#image-upload");


// Test outputs
console.log(location.origin); // Returns http://127.0.0.1:5500


bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
    console.log("Anonymous Functions can have multiple statements in javascript.");
})

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
                    bannerPath = `${location.origin}/${data}`;
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
    let curPos = articleFeild.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
}

let months = ['Jan','Feb','Mar', 'Apr',' May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
publishBtn.addEventListener('click', () => {
       if(articleFeild.value.length && blogTitleField.value.length){
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for(let  i= 0;  i< 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${blogTitle}-${id}`;
        let date = new Date(); // for published at info


        //access firstore with db variable;
        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        .then(() => {
            location.href = `/${docName}`;
        })
        .catch((err) => {
            console.error(err);
        })
    }
})