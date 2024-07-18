import path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

export default (req, res) => {
    
    const initial_path = process.cwd();
    const filePath = path.join(initial_path, "static","dashboard.html");

    // console.log(initial_path);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).end('Error reading dashboard.html');
            return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(data);
    });
}
