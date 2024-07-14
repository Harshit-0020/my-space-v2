const blogSection = document.querySelector(".blogs-section");

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
    </div>
    `;

};