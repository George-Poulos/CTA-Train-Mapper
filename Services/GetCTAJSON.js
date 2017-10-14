/**
 * Created by George on 10/11/17.
 */

const request = require('request');



let GetCTAJSON = function (response, trainLine){
    console.log("API " + global.s3.apiKey);
    let URL = global.s3.URL + "?key=" + global.s3.apiKey + "&rt=" + trainLine + "&outputType=" + "JSON";
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