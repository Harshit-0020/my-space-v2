import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

export default (req, res) => {
    const initial_path = location.origin;
    const filePath = path.join(initial_path, "static", "index.html");
    console.log(__dirname)

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