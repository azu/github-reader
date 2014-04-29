/**
 * Created by azu on 2014/04/27.
 * LICENSE : MIT
 */
"use strict";
function getAutoReloadTime() {
    return window.localStorage.getItem("auto-reload-interval") || 60 * 1000;
}
function setAutoReloadTime(timeInterval) {
    return window.localStorage.setItem("auto-reload-interval", timeInterval);
}
function setLastUpdated(date) {
    window.localStorage.setItem("last-updated", date.toISOString());
}
function getLastUpdated() {
    return window.localStorage.getItem("last-updated");
}

module.exports.getAutoReloadTime = getAutoReloadTime;
module.exports.setAutoReloadTime = setAutoReloadTime;
module.exports.getLastUpdated = getLastUpdated;
module.exports.setLastUpdated = setLastUpdated;