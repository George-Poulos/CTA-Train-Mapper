/**
 * Created by George on 10/11/17.
 *
 * @TODO - switch to pull all trains at once, then parse all trains by color.
 */

const request = require('request');
let JSONCache = require('../models/JSONCache.js');

const trainLines = 'red,blue,brn,g,org,p,pink,y';
const cacheLife = 5000;

let cachedResult = new JSONCache();

class CTAService {
    constructor(name){
    }

    /**
     * Proxy to the CTA API. Caching some of the responses.
     *
     * TODO need to add DB here in case there will be more than one instance of the app. Multiple requests can be going out
     *
     * @param response JSON response
     */
    getLines (response){
        let URL = global.URL + "?key=" + global.apiKey + "&outputType=" + "JSON";

        URL += "&rt=" + trainLines;

        if(cachedResult !== undefined && Date.now() - cachedResult.timeStamp <= cacheLife) {
            response.json(cachedResult.json);
            return;
        }

        request(URL, { json: true }, (err, res, body) => {
            if (err) {
                console.log("Request for Json Failed!");
                return console.log(err);
            }
            else {
                cachedResult.timeStamp = Date.now();
                cachedResult.json = res.body;
                response.json(cachedResult.json);
            }
        });
    };
}

module.exports = CTAService;