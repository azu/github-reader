/**
 * Created by azu on 2014/04/29.
 * LICENSE : MIT
 */
"use strict";

var growler = require('growler');
var myApp = new growler.GrowlApplication('GithubReader');
myApp.setNotifications({
    'Server Status': {}
});
myApp.register();

function sendNotification(name, options, callback) {
    myApp.sendNotification(name, options, callback);
}
module.exports.sendNotification = sendNotification;