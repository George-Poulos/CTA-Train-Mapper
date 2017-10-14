/**
 * Created by George on 10/11/17.
 */

const request = require('request');
const aws = require('aws-sdk');

let s3 = new aws.S3({
    apiKey: process.env.apiKey,
    URL: process.env.URL
});

let GetCTAJSON = function (response, trainLine){
    console.log("API " + s3.apiKey);
    let URL = s3.URL + "?key=" + s3.apiKey + "&rt=" + trainLine + "&outputType=" + "JSON";
    request(URL, { json: true }, (err, res, body) => {
        if (err) {
            console.log("Request for Json Failed!");
            return console.log(err);
        }
        else{
            let ret = body.ctatt.route[0].train;
            response.json(ret);
        }
    });
};

module.exports = GetCTAJSON;