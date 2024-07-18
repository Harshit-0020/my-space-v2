import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

export default (req, res) => {
    // const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // const initial_path = __dirname;
    const filePath = "static/index.html";

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading index.html: ' + filePath);
            return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(data);
    });

    console.log(initial_path)
}