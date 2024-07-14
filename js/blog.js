import { db } from "./editor.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

let blogId = decodeURI(location.pathname.split("/").pop());


console.log(`> Fetching blog -> ${blogId}`);
const docRef = doc(db, "blogs", blogId);
const docSnap = await getDoc(docRef);

const addArticle = (ele, data) => {
  data = data.split("\n").filter((item) => item.length);
  console.log(data.length);
  console.log(data);

  data.forEach((item) => {
    // check for heading
    if (item[0] == "#") {
      let hCount = 0;
      let i = 0;
      while (item[i] == "#") {
        hCount++;
        i++;
      }
      let tag = `h${hCount}`;
      ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}`;
    }

    // check for image format
    else if (item[0] == "!" && item[1] == "[") {
      console.log("> Image detected")
      let separator;

      for (let i = 0; i <= item.length; i++) {
        if (
          item[i] == "]" &&
          item[i + 1] == "(" &&
          item[item.length - 1] == ")"
        ) {
          separator = i;
        }
      }

      let alt = item.slice(2, separator);
      let src = item.slice(separator + 2, item.length - 1);
      src = encodeURI(src);
      
      ele.innerHTML += `<img src="${src}" alt="${alt}" class="article-image">`;
      console.log(src);
    } else {
      ele.innerHTML += `<p>${item}</p>`;
    }
  });
};



const setupBlog = (data) => {
  const banner = document.querySelector(".banner");
  const blogTitle = document.querySelector(".title");
  const titleTag = document.querySelector("title");
  const publish = document.querySelector(".published");

  console.log(`Blog Title class (.title) => ${blogTitle}`);
  console.log(`Blog Title tag (title) => ${titleTag}`);

  console.log(`> Banner Image location: ${data.bannerImage}`);
  banner.style.backgroundImage = `url(${data.bannerImage})`;

  titleTag.innerHTML += blogTitle.innerHTML = data.title;
  publish.innerHTML += data.publishedAt;
  publish.innerHTML += `<br> <strong>Written by - </strong> ${data.author}`;

  const article = document.querySelector(".article");
  addArticle(article, data.article);
};

if (docSnap.exists()) {
  setupBlog(docSnap.data());
} else {
  console.log("No Such blog exists!");
  location.replace("/");
}


// 