import {
    doc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { test } from "./firebase.js";

const db = test.db;
// let blogId = decodeURI(location.pathname.split("/").pop());
const blogSection = document.querySelector(".blogs-section");

export const deleteBlog = async (blogId) => {
    await deleteDoc(doc(db, "blogs", blogId));
    location.reload();
}

export const createBlog = (blog) => {
    console.log("> Called create blog from function.js");
    console.log(blogSection.innerHTML2)
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + "..."}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + "..."}</p>
        <a href="/${blog.id}" class="btn dark pixel-font link">read</a>
        <a href="/${blog.id}" class="btn grey pixel-font link">edit</a>
        <a href="#" class="btn danger pixel-font link" onclick="
        import('./js/functions.js').then((module) => {
        module.deleteBlog('${blog.id}');
            })
        ">delete</a>
    </div>
    `;

};