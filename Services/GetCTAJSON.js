/**
 * Created by George on 10/11/17.
 *
 * @TODO - switch to pull all trains at once, then parse all trains by color.
 */

const request = require('request');



let GetCTAJSON = function (response, trainLine){
    let URL = global.URL + "?key=" + global.apiKey + "&rt=" + trainLine + "&outputType=" + "JSON";
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