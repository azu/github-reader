/**
 * Created by azu on 2014/04/24.
 * LICENSE : MIT
 */
"use strict";
/**
 *
 * @returns {{name: string, token: string}}
 */
function getUserData() {
    var saved = window.localStorage.getItem("user-data");
    if(saved) {
        return JSON.parse(saved);
    }
    return {};
}

function setUserData(userData) {
    window.localStorage.setItem("user-data", JSON.stringify(userData));
}
function hasUserData() {
    var user = getUserData();
    return user.name && user.token;
}
module.exports.hasUserData = hasUserData;
module.exports.getUserData = getUserData;
module.exports.setUserData = setUserData;