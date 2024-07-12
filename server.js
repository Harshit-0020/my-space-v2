const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload')
const port = process.env.PORT || 3000;

// dirname : /home/ares/Programs/My-space-v2
let initial_path = path.join(__dirname)

console.log(initial_path)

const app = express();
app.use(express.static(initial_path))
app.use(fileupload());

app.get('/',(req, res) => {
    res.sendFile(path.join(initial_path,"index.html"));
    console.log(initial_path)
})

app.listen(port, () =>{
    console.log('listening......');
})

app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'uploads/' + imagename;

    // create upload
    file.mv(path, (err,result) => {
        if (err){
            throw err;
        } else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.get("/:canBeAnything", (req, res) => {      // GET call Triggers on redirecting to any webpage.
    res.sendFile((path.join(initial_path, "blog.html")));
})

app.use((req, res) => {
    res.json("404");
})