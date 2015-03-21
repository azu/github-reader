/**
 * Created by azu on 2014/04/29.
 * LICENSE : MIT
 */
"use strict";


var notifier = require('node-notifier');
var growl = new notifier.Growl({
    name: 'github-reader'
});
var EventEmitter = require('events').EventEmitter;
var request = require('request');
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
    request.get({url: options.icon, encoding: null}, function (err, res, data) {
        if (err) {
            return callback(err);
        }
        growl.notify({
            id: options.id,
            title: options.title,
            message: options.text,
            icon: data,
            html_url: options.url,
            sound: true, // Only Notification Center or Windows Toasters
            wait: true // wait with callback until user action is taken on notification
        }, function (err, response) {
            if (err) {
                return callback(err);
            }
        });
    });
}
module.exports = {
    addClickCallback: addClickCallback,
    sendNotification: sendNotification
};