const request = require('request');
var Promise = require('bluebird');

module.exports = {
    uploadToDestination(file, contentLength) {
        return Promise.promisify(request.post)('http://localhost:3002/', {
            formData: {
              file: {
                value: file, // The Busboy file stream
                options: {
                  knownLength: contentLength,
                }
              }
            }
        }).then(res => {
            if (res.statusCode >= 300) {
                return Promise.reject(new Error(`There was an error uploading the file to the destination: ${res.statusCode}`));
            }
      
            console.log(`The file was uploaded to the destination: ${res.body}`);
            return Promise.resolve(res.body);
        });
    },
};