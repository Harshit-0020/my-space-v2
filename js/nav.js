import { test } from "./firebase.js";

let ul = document.querySelector(".links-container");
// console.log(ul);

const auth = test.auth;
auth.onAuthStateChanged((user) => {
  if (user) {
    // if user is logged in
    // console.log("hello");
    ul.innerHTML += `
            <li class="link-item"><a href="/admin" class="link">Dashboard</a></li>
            <li class="link-item"><a href="/editor.html" class="link" onclick="
            import('./js/firebase.js').then(
            (module) => {
                console.log('> Triggered outer function!');
                module.logoutUser();
                });
                "
            >Logout</a></li>
        `; // # means scroll to the top of that page, if you give some element-id instead it'll scroll to that position
  } else {
    // no one is logged in
    ul.innerHTML += `<li class="link-item"><a href="/admin" class="link">Login</a></li>
            `;
  }
});
