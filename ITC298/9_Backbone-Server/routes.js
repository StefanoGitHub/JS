/**
 * Created by Stefano on 11/2/15.
 */
//routes.js

module.exports = [
    { method: "GET", path: "/", handler: require("./handlers/home") }
    //all other routs go in this array
];
