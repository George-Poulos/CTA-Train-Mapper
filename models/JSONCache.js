/**
 * Created by George on 7/12/19.
 */

/**
 * Cache for JSON responses
 */
class JSONCache{
   constructor(){
   }

   resetCache(timestamp, json){
       this.timeStamp = timeStamp;
       this.json = json;
   }
}

module.exports = JSONCache;