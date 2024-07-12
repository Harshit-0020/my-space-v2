import { colorCode, db } from "./editor.js";

window.onload = () => {
    try {
        console.log(`> Color code after export ${colorCode.black}`);
        console.log(`> DB object: ${db}`)
        console.log("> Successfully accessed db variable!");
    }
    catch (e) {
        console.log("> Unable to access db from inside window onload.");
        throw e;
    }
    // or execute some function that use the variable
}


