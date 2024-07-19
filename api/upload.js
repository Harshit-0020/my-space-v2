import * as fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';
import {
    BucketManager,
    ObjectManager,
} from '@filebase/sdk';

export default async (req, res) => {
    const form = new IncomingForm();
    const date = new Date();
    const initial_path = process.cwd();

    // FILEBASE BUCKET HANDLING
    const S3_KEY = 'C34D3AC6D8855FB8EF7D';
    const S3_SECRET = 'uKSY1LD4gTMS4D4fmJaXrdW1AQsyuTjHXZP7JUJY';
    const bucketManager = new BucketManager(S3_KEY, S3_SECRET);
    const bucketName = `test-bucket-4852367`;

    try {
        await bucketManager.create(bucketName);
    } catch (error) {
        console.error("Error creating bucket:", error);
        res.status(500).send('Error creating bucket.');
        return;
    }

    const objectManager = new ObjectManager(S3_KEY, S3_SECRET, {
        bucket: bucketName,
    });

    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error parsing the files:", err);
            res.status(500).send('Error parsing the files.');
            return;
        }

        if (!files.image) {
            console.error("No file uploaded.");
            res.status(400).send('No file uploaded.');
            return;
        }

        const file = files.image[0]; // Assuming a single file upload
        const origFileName = file.originalFilename;
        const sanitizedFileName = origFileName.replace(/[^a-zA-Z0-9.-]/g, '_');
        const imageName = `${date.getDate()}${date.getTime()}${sanitizedFileName}`;

        try {
            const fileStream = fs.createReadStream(file.filepath);
            console.log("Uploading file to Filebase:", imageName);

            const uploadedObject = await objectManager.upload(imageName, fileStream);
            const uploadCID = uploadedObject.cid;
            console.log("File uploaded to Filebase:", uploadedObject);

            res.status(200).json({uploadCID});
        } catch (uploadError) {
            console.error("Error uploading file:", uploadError);
            res.status(500).send('Error uploading file.');
        } finally {
            fs.unlink(file.filepath, (unlinkError) => {
                if (unlinkError) {
                    console.error("Error deleting temporary file:", unlinkError);
                }
            });
        }
    });
};
