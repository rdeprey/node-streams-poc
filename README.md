# Node.js Streams Proof-of-Concept

This proof of concept project shows that Node.js streams can be used to handle file uploads and pass the uploaded file as a stream to multiple services, essentially using one service as a pass through. By using streams, the intermediate service doesn't need to store files in memory or on disk if it's not actually using the files.

## Libraries Used
* Busboy.js for accessing uploaded files as streams
* Bluebird for promisifying callbacks
* Request.js for handling post requests between services

## To Run This Project:
1. Run `npm install` in each of the three project directories.
2. The `uploader` directory has the simple front-end for uploading files. It runs on Port 3000. Run `npm start` in this directory.
3. The `upload-service` directory is an intermediate service that is used to pass the files to the `destination`. It doesn't actually use the files. It runs on Port 3001. Run `npm start` in this directory.
4. The `destination` directory simulates the final destination where the file would be "uploaded". It runs on Port 3002. Run `npm start` in this directory.
5. Upload a file.
6. In the `destination` directory, there should be a file called `test1.jpg` that should match the file you uploaded.

