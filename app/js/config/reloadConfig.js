/**
 * Created by azu on 2014/04/27.
 * LICENSE : MIT
 */
"use strict";
function getAutoReloadTime() {
    return 60 * 1000;
}
function setLastUpdated(date){
    window.localStorage.setItem("last-updated", date.toISOString());
}
function getLastUpdated(){
    return window.localStorage.getItem("last-updated");
}

module.exports.getAutoReloadTime = getAutoReloadTime;
module.exports.getLastUpdated = getLastUpdated;
module.exports.setLastUpdated = setLastUpdated;