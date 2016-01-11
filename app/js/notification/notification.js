/**
 * Created by azu on 2014/04/29.
 * LICENSE : MIT
 */
"use strict";

var growl = require('node-notifier');
var EventEmitter = require('events').EventEmitter;
var download = require('download-cache');
var notificationEvent = new EventEmitter();
var __CLICK_EVENT = "GROWL__CLICK_EVENT";
function addClickCallback(callback) {
    notificationEvent.on(__CLICK_EVENT, function (event, options) {
        callback(options);
    });
}
growl.on('click', function (notifierObject, options) {
    notificationEvent.emit(__CLICK_EVENT, notifierObject, options)
});

function sendNotification(options, callback) {
    download(options.icon).then(function (filePath) {
        growl.notify({
            appIcon: __dirname + "/icon.png",
            id: options.id,
            title: options.title,
            message: options.text,
            icon: filePath,
            html_url: options.url,
            sound: true, // Only Notification Center or Windows Toasters
            wait: true // wait with callback until user action is taken on notification
        }, function (err, response) {
            if (err) {
                return callback(err);
            }
        });
    }).catch(function (error) {
        callback(error);
    });
}
module.exports = {
    addClickCallback: addClickCallback,
    sendNotification: sendNotification
};