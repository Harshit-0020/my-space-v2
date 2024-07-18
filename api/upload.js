import * as fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

const renameFile = async (originalFilename, newFilename) => {
    fs.rename(originalFilename, newFilename, (err) => {
        if (err) {
            console.error("Error renaming file:", err);
            // res.status(500).send('Error renaming the file.');
            return 1;
        }
        else return 0;
    });

}

const saveAndRename = async (originalFilename, newFilename) => {
    return await renameFile(originalFilename, newFilename);
}

export default (req, res) => {
    const form = new IncomingForm();
    let date = new Date();
    
    const initial_path = process.cwd();

    let uploadDir = path.join(initial_path, "uploads");

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error("Error parsing the files:", err);
            res.status(500).send('Error parsing the files.');
            return;
        } else if (!files.image) {
            console.error("No file uploaded.");
            res.status(400).send('No file uploaded.');
            return;
        } else {
            const results = [];
            files.image.forEach((file) => {
                const origFileName = file.originalFilename;
                const sanitizedFileName = origFileName.replace(/[^a-zA-Z0-9.-]/g, '_');
                const imageName = `${date.getDate()}${date.getTime()}${sanitizedFileName}`;
                // const imageName = file.originalFilename;
                const newFilepath = `${uploadDir}${imageName}`;

                console.log("> Original file path ->" + file.filepath);
                console.log("> New File Path: " + newFilepath)

                const stat = saveAndRename(file.filepath, newFilepath);
                results.push(newFilepath);
                results.push(stat);
            });
            console.log(`> File written: ${results[0]}`);
            const upload_status = results[1];
            if (upload_status == 1) {
                res.status(500).send('Error renaming the file.');
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
};
