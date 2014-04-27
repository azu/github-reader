/**
 * Created by azu on 2014/04/27.
 * LICENSE : MIT
 */
"use strict";
function loadURL(URL) {
    var frame = document.getElementById("github-iframe");
    frame.src = URL;
}
module.exports.loadURL = loadURL;